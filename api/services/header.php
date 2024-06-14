<?php
session_start();
require_once('UsuarioHandler.php'); // Ajusta la ruta según tu estructura de carpetas

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

if (isset($_SESSION['id_usuario'])) {
    $usuario = new UsuarioHandler();
    $usuario->setId($_SESSION['id_usuario']);
    $userData = $usuario->readOne();
    if ($userData) {
        $result['status'] = 1;
        $result['id_usuario'] = $_SESSION['id_usuario'];
        $result['dataset'] = $userData;
        $result['message'] = 'Sesión activa';
    } else {
        $result['message'] = 'Usuario no encontrado';
    }
} else {
    $result['status'] = 0;
    $result['message'] = 'No hay sesión activa';
}
?>
