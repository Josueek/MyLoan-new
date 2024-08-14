<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/espacios_handler.php');

if (isset($_GET['action'])) {
    session_start();
    $espaciosHandler = new EspaciosHandler();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllEspacios':
            $result = array('status' => 1, 'dataset' => $espaciosHandler->getAllEspacios());
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>
