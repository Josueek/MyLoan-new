<?php
require_once('../models/data/usuario_data.php');
require_once('../models/data/empleado_data.php');
require_once('../helpers/database.php');
require_once('../helpers/validator.php');

// Verifica si hay una acción definida en la solicitud.
if (isset($_GET['action'])) {
    session_start();
    $usuario = new UsuarioData;
    $empleado = new EmpleadoData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

    // Define las acciones disponibles.
    switch ($_GET['action']) {
        case 'login':
            // Valida y sanea los datos recibidos en POST.
            $_POST = Validator::validateForm($_POST);

            // Verifica y establece el correo electrónico y la contraseña.
            if (!$usuario->setCorreo($_POST['correo_electronico']) || !$usuario->setContrasena($_POST['contrasena'])) {
                $result['error'] = $usuario->getDataError();
                break;
            }

            // Verifica las credenciales del usuario.
            $data = $usuario->checkCredentials();
            if ($data) {
                // Verifica el estado del empleado.
                if ($empleado->checkStatus($data['id_usuario'])) {
                    $_SESSION['id_usuario'] = $data['id_usuario'];
                    $_SESSION['correo_electronico'] = $data['correo_electronico'];
                    $result['status'] = 1;
                    $result['message'] = 'Inicio de sesión correcto';
                    $result['nombre'] = $empleado->getNombreEmpleado($data['id_usuario']);
                } else {
                    $result['error'] = 'El usuario no está activo';
                }
            } else { 
                $result['error'] = 'Correo o contraseña incorrectos';
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
