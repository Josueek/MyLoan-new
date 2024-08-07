<?php
// Incluye las dependencias necesarias.
require_once('../models/data/empleado_data.php');
require_once('../models/data/usuario_data.php');
require_once('../helpers/database.php');
require_once('../helpers/validator.php');

// Inicia la sesión.
session_start();

// Verifica si hay una acción definida en la solicitud.
if (isset($_GET['action'])) {
    // Instancia los objetos necesarios.
    $empleado = new EmpleadoData();
    $usuario = new UsuarioData();
    // Prepara la estructura del resultado.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

    // Define las acciones disponibles.
    switch ($_GET['action']) {
        case 'logOut':
            if (session_destroy()) {
                $result['status'] = 1;
                $result['message'] = 'Sesión eliminada correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al cerrar la sesión';
            }
            break;
        case 'getProfile':
            // Obtiene el perfil del usuario.
            if ($empleado->setIdUsuario($_SESSION['id_usuario'])) {
                $result['dataset'] = $empleado->getProfile();
                if ($result['dataset']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se pudo obtener la información del perfil';
                }
            } else {
                $result['error'] = 'ID de usuario inválido';
            }
            break;

        case 'updateProfile':
            // Valida y sanea los datos recibidos en POST.
            $_POST = Validator::validateForm($_POST);
            if (!$empleado->setIdUsuario($_SESSION['id_usuario'])) {
                $result['error'] = 'ID de usuario inválido';
                break;
            }
            if (!$usuario->setId($_SESSION['id_usuario'])) {
                $result['error'] = 'ID de usuario inválido';
                break;
            }

            // Depuración: verifica que los datos se están recibiendo.
            error_log('Datos recibidos en POST: ' . print_r($_POST, true));
            error_log('Archivos recibidos en FILES: ' . print_r($_FILES, true));

            // Validar y establecer el correo electrónico.
            if (isset($_POST['inputEmail']) && !empty($_POST['inputEmail'])) {
                if (!$usuario->setCorreo($_POST['inputEmail'])) {
                    $result['error'] = 'Correo electrónico inválido';
                    break;
                }
                $empleado->setCorreo($_POST['inputEmail']);
            } else {
                $result['error'] = 'Correo electrónico no proporcionado';
                break;
            }

            // Validar y establecer el teléfono.
            if (isset($_POST['inputTelefono']) && !empty($_POST['inputTelefono'])) {
                if (!$empleado->setTelefono($_POST['inputTelefono'])) {
                    $result['error'] = 'Teléfono inválido';
                    break;
                }
            } else {
                $result['error'] = 'Teléfono no proporcionado';
                break;
            }

            // Validar y establecer la imagen.
            $filename = null;
            if (isset($_FILES['inputImage']) && $_FILES['inputImage']['size'] > 0) {
                $file = $_FILES['inputImage'];
                if (Validator::validateImageFile($file, 1000)) {
                    $filename = Validator::getFilename();
                    $empleado->setImagen($filename);
                    if (!Validator::saveFile($file, '../../api/images/perfil/')) {
                        $result['error'] = 'No se pudo guardar la imagen';
                        break;
                    }
                } else {
                    $result['error'] = Validator::getFileError();
                    break;
                }
            }

            // Validar y establecer la contraseña si se proporciona una nueva.
            $inputClave = $_POST['inputClave'];
            if ($inputClave !== '' && strlen($inputClave) >= 8) {
                if (!$usuario->setContrasena($inputClave)) {
                    $result['error'] = 'Contraseña inválida';
                    break;
                }
                $empleado->setContrasena($inputClave);
            }

            // Actualizar el perfil.
            if ($inputClave !== '' && strlen($inputClave) >= 8) {
                if ($empleado->updateProfileWithPassword($filename)) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil actualizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el perfil';
                }
            } else {
                if ($empleado->updateProfile($filename)) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil actualizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el perfil';
                }
            }
            break;

        default:
            $result['error'] = 'Acción no disponible';
    }

    // Captura cualquier excepción de la base de datos.
    $result['exception'] = Database::getException();
    // Envía la respuesta en formato JSON.
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    // Si no hay acción definida, se envía un mensaje de recurso no disponible.
    print(json_encode('Recurso no disponible'));
}
?>
