<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/observacion_data.php');

if (isset($_GET['action'])) {
    session_start();
    $observacion = new ObservacionData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllObservaciones':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $result = $observacion->getAllObservaciones($buscar);
            break;

        case 'getObservacion':
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($result['dataset'] = $observacion->getObservacionById($_GET['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos de la observación';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'addObservacion':
            $_POST = Validator::validateForm($_POST);
            if (isset($_POST['fechaObservacion']) &&
                isset($_POST['observacion']) &&
                isset($_POST['tipoObservacion']) &&
                isset($_POST['tipoPrestamo']) &&
                isset($_POST['idEspacio']) &&
                isset($_POST['idUsuario']) &&
                isset($_POST['idPrestamo'])) {

                if ($observacion->setFechaObservacion($_POST['fechaObservacion']) &&
                    $observacion->setObservacion($_POST['observacion']) &&
                    $observacion->setTipoObservacion($_POST['tipoObservacion']) &&
                    $observacion->setTipoPrestamo($_POST['tipoPrestamo']) &&
                    $observacion->setIdEspacio($_POST['idEspacio']) &&
                    $observacion->setIdUsuario($_POST['idUsuario']) &&
                    $observacion->setIdPrestamo($_POST['idPrestamo'])) {

                    if ($observacion->create()) {
                        $result['status'] = 1;
                        $result['message'] = 'Observación agregada correctamente';
                    } else {
                        $result['message'] = 'No se pudo agregar la observación';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos incompletos';
            }
            break;

        case 'updateObservacion':
            $_POST = Validator::validateForm($_POST);
            if (isset($_POST['idObservacion']) &&
                isset($_POST['fechaObservacion']) &&
                isset($_POST['observacion']) &&
                isset($_POST['tipoObservacion']) &&
                isset($_POST['tipoPrestamo']) &&
                isset($_POST['idEspacio']) &&
                isset($_POST['idUsuario']) &&
                isset($_POST['idPrestamo'])) {

                if ($observacion->setIdObservacion($_POST['idObservacion']) &&
                    $observacion->setFechaObservacion($_POST['fechaObservacion']) &&
                    $observacion->setObservacion($_POST['observacion']) &&
                    $observacion->setTipoObservacion($_POST['tipoObservacion']) &&
                    $observacion->setTipoPrestamo($_POST['tipoPrestamo']) &&
                    $observacion->setIdEspacio($_POST['idEspacio']) &&
                    $observacion->setIdUsuario($_POST['idUsuario']) &&
                    $observacion->setIdPrestamo($_POST['idPrestamo'])) {

                    if ($observacion->update()) {
                        $result['status'] = 1;
                        $result['message'] = 'Observación actualizada correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar la observación';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos incompletos';
            }
            break;

        case 'deleteObservacion':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['idObservacion']) && Validator::validateNaturalNumber($data['idObservacion'])) {
                if ($observacion->delete($data['idObservacion'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Observación eliminada correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar la observación';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>
