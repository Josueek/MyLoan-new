<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/solicitud_data.php');

if (isset($_GET['action'])) {
    session_start();
    $solicitud = new SolicitudData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    // Se realiza la acción correspondiente según el valor de 'action'
    switch ($_GET['action']) {
        case 'getAllSolicitudes':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $curso = isset($_GET['curso']) ? $_GET['curso'] : '';
            $programa = isset($_GET['programa']) ? $_GET['programa'] : '';
            $result = $solicitud->getAllSolicitudes($buscar, $curso, $programa);
            break;
        /**
         * Solicitudes de ITR
         */
        case 'getAllSolicitudITR':
            $result = $solicitud->getAllSolicitudITR();
            break;
        /**
         * Solicitudes de CFP
         */
        case 'getAllSolicitudCFP':
            $result = $solicitud->getAllSolicitudCFP();
            break;

        case 'addSolicitud':
            $_POST = Validator::validateForm($_POST);
            if (
                isset($_POST['fechaSolicitud']) &&
                isset($_POST['programaFormacion']) &&
                isset($_POST['estadoPrestamo']) &&
                isset($_POST['observacion']) &&
                isset($_POST['idCurso']) &&
                isset($_POST['idUsuario'])
            ) {

                if (
                    $solicitud->setFechaSolicitud($_POST['fechaSolicitud']) &&
                    $solicitud->setProgramaFormacion($_POST['programaFormacion']) &&
                    $solicitud->setEstadoPrestamo($_POST['estadoPrestamo']) &&
                    $solicitud->setObservacion($_POST['observacion']) &&
                    $solicitud->setIdCurso($_POST['idCurso']) &&
                    $solicitud->setIdUsuario($_POST['idUsuario'])
                ) {

                    if ($solicitud->create()) {
                        $result['status'] = 1;
                        $result['message'] = 'Solicitud agregada correctamente';
                    } else {
                        $result['message'] = 'No se pudo agregar la solicitud';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos incompletos';
            }
            break;

        case 'getSolicitud':
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($result['dataset'] = $solicitud->getSolicitudById($_GET['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos de la solicitud';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateSolicitud':
            $_POST = Validator::validateForm($_POST);
            if (
                isset($_POST['id']) &&
                isset($_POST['fechaSolicitud']) &&
                isset($_POST['programaFormacion']) &&
                isset($_POST['estadoPrestamo']) &&
                isset($_POST['observacion']) &&
                isset($_POST['idCurso']) &&
                isset($_POST['idUsuario'])
            ) {

                if (
                    $solicitud->setId($_POST['id']) &&
                    $solicitud->setFechaSolicitud($_POST['fechaSolicitud']) &&
                    $solicitud->setProgramaFormacion($_POST['programaFormacion']) &&
                    $solicitud->setEstadoPrestamo($_POST['estadoPrestamo']) &&
                    $solicitud->setObservacion($_POST['observacion']) &&
                    $solicitud->setIdCurso($_POST['idCurso']) &&
                    $solicitud->setIdUsuario($_POST['idUsuario'])
                ) {

                    if ($solicitud->update()) {
                        $result['status'] = 1;
                        $result['message'] = 'Solicitud actualizada correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar la solicitud';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos incompletos';
            }
            break;

        case 'deleteSolicitud':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($solicitud->delete($data['id'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Solicitud eliminada correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar la solicitud';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getAllCursos':
            $sql = 'SELECT id_curso, nombre_curso FROM tb_cursos';
            $result['dataset'] = Database::getRows($sql);
            if ($result['dataset']) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se encontraron cursos';
            }
            break;

        case 'getDetallePrestamo':
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                $result = $solicitud->getDetallePrestamo($_GET['id']);
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'denegarSolicitud':
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? null;
            if ($solicitud->setId($id)) {
                $prestamoInfo = $solicitud->getSolicitudById($id);
                if ($prestamoInfo['estado_prestamo'] == 'Aceptado') {
                    $result['status'] = 0;
                    $result['message'] = 'El préstamo ya ha sido aceptado y no puede ser denegado.';
                } elseif ($prestamoInfo['estado_prestamo'] == 'Denegado') {
                    $result['status'] = 0;
                    $result['message'] = 'El préstamo ya ha sido denegado.';
                } else {
                    if ($solicitud->denegarSolicitud($id)) {
                        $result['status'] = 1;
                        $result['message'] = 'Préstamo denegado correctamente.';
                    } else {
                        $result['status'] = 0;
                        $result['message'] = 'No se pudo denegar el préstamo.';
                    }
                }
            } else {
                $result['status'] = 0;
                $result['message'] = 'ID de préstamo inválido.';
            }
            break;

        case 'aceptarSolicitud':
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? null;
            $fecha_inicio = $data['fecha_inicio'] ?? null;
            $persona_recibe = $data['persona_recibe'] ?? null;

            if ($solicitud->setId($id) && $fecha_inicio && $persona_recibe) {
                $sql = 'INSERT INTO tb_periodo_prestamos (fecha_inicio, persona_recibe, id_detalle_prestamo) 
                        VALUES (?, ?, ?)';
                $params = [$fecha_inicio, $persona_recibe, $id];
                if (Database::executeRow($sql, $params)) {
                    $update_sql = 'UPDATE tb_prestamos SET estado_prestamo = "Aceptado" WHERE id_prestamo = ?';
                    Database::executeRow($update_sql, [$id]);
                    $result['status'] = 1;
                    $result['message'] = 'Periodo de préstamo asignado correctamente.';
                } else {
                    $result['status'] = 0;
                    $result['message'] = 'No se pudo asignar el periodo de préstamo.';
                }
            } else {
                $result['status'] = 0;
                $result['message'] = 'Datos inválidos.';
            }
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}

?>