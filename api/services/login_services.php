<?php
require_once ('../models/data/usuario_data.php');
require_once ('../models/data/empleado_data.php');

session_start(); // Iniciar la sesión o recuperar la existente

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

// Verificar si ya hay una sesión activa
if (isset($_SESSION['id_usuario'])) {
    // Si ya hay una sesión, retornar un estado indicando que ya está logueado
    $result['status'] = 2; // Indica que hay sesión activa
    $result['message'] = 'Sesión activa, redirigir a inicio';
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
    exit();
}

if (isset($_GET['action'])) {
    $usuario = new UsuarioData;
    $empleado = new EmpleadoData;

    switch ($_GET['action']) {
        case 'login':
            $_POST = Validator::validateForm($_POST);

            $correo = $_POST['correo_electronico'];
            $clave = $_POST['contrasena'];

            // Verificar si el usuario está bloqueado
            $checkBlockSql = 'SELECT intentos_fallidos, bloqueo_hasta FROM tb_usuarios WHERE correo_electronico = ?';
            $checkBlockParams = array($correo);
            $blockData = Database::getRow($checkBlockSql, $checkBlockParams);

            if ($blockData) {
                // Verificar si la cuenta está bloqueada
                if ($blockData['bloqueo_hasta'] && new DateTime() < new DateTime($blockData['bloqueo_hasta'])) {
                    $result['error'] = 'Cuenta bloqueada. Intenta de nuevo después de ' . (new DateTime($blockData['bloqueo_hasta']))->diff(new DateTime())->format('%H:%I:%S') . ' horas.';
                    break;
                }

                // Verificar las credenciales del usuario
                if (!$usuario->setCorreo($correo) || !$usuario->setContrasena($clave)) {
                    $result['error'] = $usuario->getDataError();
                } else {
                    if ($data = $usuario->checkCredentials()) {
                        if ($data['status']) {
                            // Verifica el estado del usuario
                            if ($empleado->checkStatus($data['id_usuario'])) {
                                // Iniciar sesión
                                $_SESSION['id_usuario'] = $data['id_usuario'];
                                $_SESSION['correo_electronico'] = $data['correo_electronico'];
                                
                                // Establecer el tiempo de sesión
                                $_SESSION['tiempo'] = time();

                                // Llamada a la función de validación de tiempo de sesión
                                Validator::validateSessionTime();
                                
                                $result['status'] = 1;
                                $result['message'] = 'Inicio de sesión correcto';
                                $result['id_usuario'] = $data['id_usuario'];;
                                $result['nombre'] = $empleado->getNombreEmpleado($data['id_usuario']);
                                $result['institucion'] = $empleado->getInstitucion($data['id_usuario']);
                                $result['cargo'] = $empleado->getCargo($data['id_usuario']);
                                $result['especialidad'] = $empleado->getEspecialidad($data['id_usuario']);

                                // Resetear intentos fallidos
                                $updateSql = 'UPDATE tb_usuarios SET intentos_fallidos = 0, bloqueo_hasta = NULL WHERE correo_electronico = ?';
                                Database::executeRow($updateSql, array($correo));
                            } else {
                                $result['error'] = 'Usuario inactivo';
                            }
                        } else {
                            // Si las credenciales son incorrectas o la contraseña ha expirado
                            $result['error'] = $data['message'];
                            
                            // Manejo del error de contraseña incorrecta
                            $newAttempts = $blockData['intentos_fallidos'] + 1;

                            if ($newAttempts >= 3) {
                                $bloqueoHasta = (new DateTime())->modify('+1 hours')->format('Y-m-d H:i:s');
                                $updateSql = 'UPDATE tb_usuarios SET intentos_fallidos = ?, bloqueo_hasta = ? WHERE correo_electronico = ?';
                                Database::executeRow($updateSql, array($newAttempts, $bloqueoHasta, $correo));
                                $result['error'] = 'Cuenta bloqueada por una hora debido a múltiples intentos fallidos. Intenta de nuevo despues.';
                            } else {
                                $updateSql = 'UPDATE tb_usuarios SET intentos_fallidos = ? WHERE correo_electronico = ?';
                                Database::executeRow($updateSql, array($newAttempts, $correo));
                                $result['error'] .= ' Intentos fallidos: ' . $newAttempts . '/3';
                            }
                        }
                    } else {
                        $result['error'] = 'Ocurrió un error, verifica las credenciales.';
                    }
                }
            } else {
                $result['error'] = 'Ocurrió un error, verifica las credenciales.';
            }
            break;
        default:
            $result['error'] = 'Acción no disponible';
    }
    $result['exception'] = Database::getException();
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
