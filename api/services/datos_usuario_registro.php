<?php
session_start();
require_once('UsuarioHandler.php'); // Ajusta la ruta según tu estructura de carpetas

header('Content-type: application/json; charset=utf-8');

if (isset($_SESSION['id_usuario'])) {
    $usuario = new UsuarioHandler();
    $usuario->setId($_SESSION['id_usuario']);
    $userData = $usuario->readOne();

    if ($userData) {
        echo json_encode(array('status' => 1, 'user' => $userData));
    } else {
        echo json_encode(array('status' => 0, 'message' => 'Usuario no encontrado'));
    }
} else {
    echo json_encode(array('status' => 0, 'message' => 'No hay sesión activa'));
}
?>
