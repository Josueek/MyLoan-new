<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/cargar_curso_handler.php');

if (isset($_GET['action'])) {
    session_start();
    $cursosHandler = new CursosHandler();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllCursos':
            $result = array('status' => 1, 'dataset' => $cursosHandler->getAllCursos());
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>
 