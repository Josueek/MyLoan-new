<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/prestamos_handler.php');

if (isset($_GET['action'])) {
    session_start();
    $curso = new prestamos_handler();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllCursos':
            $result = array('status' => 1, 'dataset' => $curso->readAll());
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>
