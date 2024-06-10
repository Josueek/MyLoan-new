<?php
require_once('../models/data/usuario_data.php');
require_once('../models/data/empleado_data.php');

if (isset($_GET['action'])) {
    session_start();
    $usuario = new UsuarioData;
    $empleado = new EmpleadoData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

    switch ($_GET['action']) {
        case 'login':
            $_POST = Validator::validateForm($_POST);
            if (!$usuario->setCorreo($_POST['correo_electronico']) || !$usuario->setContrasena($_POST['contrasena'])) {
                $result['error'] = $usuario->getDataError();
            } else {
                if ($data = $usuario->checkCredentials()) {
                    if ($empleado->checkStatus($data['id_usuario'])) {
                        $_SESSION['id_usuario'] = $data['id_usuario'];
                        $_SESSION['correo_electronico'] = $data['correo_electronico'];
                        $result['status'] = 1;
                        $result['message'] = 'Inicio de sesión correcto';
                        $result['nombre'] = $empleado->getNombreEmpleado($data['id_usuario']); // Asegúrate de que esta función exista y devuelva el nombre
                    } else {
                        $result['error'] = 'Correo o contraseña incorrectos';
                    }
                } else {
                    $result['error'] = 'Correo o contraseña incorrectos';
                }
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
?>
