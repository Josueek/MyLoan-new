<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/mis_observaciones_data.php');

if (isset($_GET['action'])) {
    session_start();
    $observacion = new MisObservacionesData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    // Se realiza la acción correspondiente según el valor de 'action'
    switch ($_GET['action']) {
        case 'getAllObservaciones':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';
            $result = $observacion->getAllObservaciones($buscar, $tipo);
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
            $fotoObservacion = '';
            if (isset($_FILES['foto_observacion'])) {
                if ($observacion->saveImage($_FILES['foto_observacion'])) {
                    $fotoObservacion = Validator::getFilename();
                } else {
                    $result['message'] = Validator::getFileError();
                    break;
                }
            }
            if (isset($_POST['fecha_observacion']) &&
                isset($_POST['observacion']) &&
                isset($_POST['tipo_observacion']) &&
                isset($_POST['tipo_prestamo']) &&
                isset($_POST['id_espacio']) &&
                isset($_POST['id_usuario'])) {

                if ($observacion->setFechaObservacion($_POST['fecha_observacion']) &&
                    $observacion->setObservacion($_POST['observacion']) &&
                    $observacion->setFotoObservacion($fotoObservacion) &&
                    $observacion->setTipoObservacion($_POST['tipo_observacion']) &&
                    $observacion->setTipoPrestamo($_POST['tipo_prestamo']) &&
                    $observacion->setIdEspacio($_POST['id_espacio']) &&
                    $observacion->setIdUsuario($_POST['id_usuario'])) {

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
            $fotoObservacion = $_POST['current_image'] ?? '';
            if (isset($_FILES['foto_observacion'])) {
                if ($observacion->saveImage($_FILES['foto_observacion'])) {
                    $fotoObservacion = Validator::getFilename();
                } else {
                    $result['message'] = Validator::getFileError();
                    break;
                }
            }
            if (isset($_POST['id']) &&
                isset($_POST['fecha_observacion']) &&
                isset($_POST['observacion']) &&
                isset($_POST['tipo_observacion']) &&
                isset($_POST['tipo_prestamo']) &&
                isset($_POST['id_espacio']) &&
                isset($_POST['id_usuario'])) {

                if ($observacion->setId($_POST['id']) &&
                    $observacion->setFechaObservacion($_POST['fecha_observacion']) &&
                    $observacion->setObservacion($_POST['observacion']) &&
                    $observacion->setFotoObservacion($fotoObservacion) &&
                    $observacion->setTipoObservacion($_POST['tipo_observacion']) &&
                    $observacion->setTipoPrestamo($_POST['tipo_prestamo']) &&
                    $observacion->setIdEspacio($_POST['id_espacio']) &&
                    $observacion->setIdUsuario($_POST['id_usuario'])) {

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
            // Obtén los datos enviados en el cuerpo de la petición
            $data = json_decode(file_get_contents("php://input"), true);

            // Imprime los datos recibidos en los logs para depurar
            error_log("Datos recibidos para eliminar: " . json_encode($data));

            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($observacion->deleteObservacion($data['id'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Observación eliminada correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar la observación';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getOpciones':
            $result = $observacion->getOpciones();
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>
