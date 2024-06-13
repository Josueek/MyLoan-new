<?php
session_start();

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

if (isset($_SESSION['id_usuario'])) {
    $result['status'] = 1;
    $result['id_usuario'] = $_SESSION['id_usuario'];
    $result['message'] = 'Sesión activa';
} else {
    $result['status'] = 0;
    $result['message'] = 'No hay sesión activa';
}

header('Content-type: application/json; charset=utf-8');
print(json_encode($result));
?>
