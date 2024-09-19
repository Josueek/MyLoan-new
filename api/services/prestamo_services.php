<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/prestamo_handler.php');

if (isset($_GET['action'])) {
    session_start();
    $curso = new CursoHandler();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllCursos':
            $result = array('status' => 1, 'dataset' => $curso->getAllCursos());
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    case 'addPrestamo':
        $_Post = Validator::validateForm($_Post);
        if(
            $prestamo setfecha_solicitud($_Post['fecha_solicitud'])&&
            $prestamo setprograma_formacion($_Post['programa_formacion'])&&
            $prestamo setestado_prestamo($_Post['estado_prestamo'])&&
            $prestamo setobservacion($_Post['observacion'])&&
            $prestamo setid_curso($_Post['id_curso'])&&
            $prestamo setid_usario($_Post['id_usario'])
        )
        {
            if($prestamo create()){
                $result['status'] = 1;
                $result['message'] = 'Prestamo agregado correctamente';
            }
            else{
                $result['message'] = 'No se pudo agregar el prestamo'
            }
        } else{
            $result['message'] = 'Datos inválidos';
        }
        break;
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>