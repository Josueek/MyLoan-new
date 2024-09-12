<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/cursofecha_data.php');

if (isset($_GET['action'])) {
    session_start();
    $curso = new CursoFechaData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

    switch ($_GET['action']) {
        case 'obtenerFechasCurso':
            if ($result['dataset'] = $curso->obtenerFechasCurso()) {
                $result['status'] = 1;
            } else {
                // Manejar el error y enviar un mensaje adecuado // Código de estado HTTP 500 para errores del servidor
                $result['error'] = 'Hubo un problema al obtener las fechas del curso: ';
            }
            break;
       
            
                       
        default:
            $result['error'] = 'Acción no disponible';
    }
   
}
?>