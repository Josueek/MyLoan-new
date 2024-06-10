<?php
session_start(); // Inicia la sesión al principio del archivo

require_once('../models/data/usuario_data.php');

if (isset($_GET['action'])) {
    $usuario = new UsuarioData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);
    switch ($_GET['action']) {
        case 'signUp':
            $_POST = Validator::validateForm($_POST);
            if (
                !$usuario->setCorreo($_POST['correo_electronico']) ||
                !$usuario->setContrasena($_POST['contrasena']) ||
                !$usuario->setCargo($_POST['cargo']) ||
                !$usuario->setInstitucion($_POST['institucion'])
            ) {
                $result['error'] = $usuario->getDataError();
            } else {
                if ($usuario->createRow()) {
                    $idUsuario = $usuario->getLastId();
                    $_SESSION['id_usuario'] = $idUsuario; // Almacena el ID del usuario en la sesión
                    $result['status'] = 1;
                    $result['message'] = 'Registro completado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el usuario';
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
