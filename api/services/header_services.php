<?php
require_once('../helpers/database.php');
require_once('../models/data/empleado_data.php');

session_start();

if (isset($_SESSION['id_usuario'])) {
    $empleadoData = new EmpleadoData();

    if ($empleadoData->setIdUsuario($_SESSION['id_usuario'])) {
        $empleadoInfo = $empleadoData->getProfile();

        if ($empleadoInfo) {
            $result = array(
                'status' => 1,
                'user' => array(
                    'nombre' => $empleadoInfo['nombre'],
                    'cargo' => $empleadoInfo['cargo'],
                    'imagen' => $empleadoInfo['imagen']
                )
            );
        } else {
            $result = array('status' => 0, 'error' => 'No se pudo obtener la información del usuario');
        }
    } else {
        $result = array('status' => 0, 'error' => 'ID de usuario inválido');
    }
} else {
    $result = array('status' => 0, 'error' => 'Usuario no autenticado');
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($result);
?>
