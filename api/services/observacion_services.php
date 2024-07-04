<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/mis_observaciones_data.php');

if (isset($_GET['action'])) {
    session_start();
    $observacion = new ObservacionData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllObservaciones':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $result = $observacion->getAllObservaciones($buscar);
            break;

        case 'addObservacion':
            $_POST = Validator::validateForm($_POST);
            if (isset($_POST['fecha']) &&
                isset($_POST['observacion']) &&
                isset($_POST['tipoObservacion']) &&
                isset($_POST['tipoPrestamo']) &&
                isset($_POST['idUsuario'])) {

                if ($observacion->setFecha($_POST['fecha']) &&
                    $observacion->setObservacion($_POST['observacion']) &&
                    $observacion->setTipoObservacion($_POST['tipoObservacion']) &&
                    $observacion->setTipoPrestamo($_POST['tipoPrestamo']) &&
                    $observacion->setIdUsuario($_POST['idUsuario'])) {

                    // Optional fields
                    $observacion->setFoto($_POST['foto'] ?? null);
                    $observacion->setIdEspacio($_POST['idEspacio'] ?? null);
                    $observacion->setIdPrestamo($_POST['idPrestamo'] ?? null);

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

        case 'updateObservacion':
            $_POST = Validator::validateForm($_POST);
            if (isset($_POST['id']) &&
                isset($_POST['fecha']) &&
                isset($_POST['observacion']) &&
                isset($_POST['tipoObservacion']) &&
                isset($_POST['tipoPrestamo']) &&
                isset($_POST['idUsuario'])) {

                if ($observacion->setId($_POST['id']) &&
                    $observacion->setFecha($_POST['fecha']) &&
                    $observacion->setObservacion($_POST['observacion']) &&
                    $observacion->setTipoObservacion($_POST['tipoObservacion']) &&
                    $observacion->setTipoPrestamo($_POST['tipoPrestamo']) &&
                    $observacion->setIdUsuario($_POST['idUsuario'])) {

                    // Optional fields
                    $observacion->setFoto($_POST['foto'] ?? null);
                    $observacion->setIdEspacio($_POST['idEspacio'] ?? null);
                    $observacion->setIdPrestamo($_POST['idPrestamo'] ?? null);

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
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($observacion->delete($_GET['id'])) {
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
            $result['message'] = 'Acción no válida';
            break;
    }

    echo json_encode($result);
} else {
    echo json_encode(array('status' => 0, 'message' => 'No se especificó ninguna acción'));
}
?>
