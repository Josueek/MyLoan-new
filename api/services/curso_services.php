<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/curso_data.php');

if (isset($_GET['action'])) {
    session_start();
    $curso = new CursoData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllCursos':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $result = $curso->getAllCursos($buscar);
            break;

        case 'getAllEmpleados':
            $result = array('status' => 1, 'dataset' => $curso->getAllEmpleados());
            break;

        case 'addCurso':
            $_POST = Validator::validateForm($_POST);
            if (isset($_POST['nombre']) &&
                isset($_POST['fechaInicio']) &&
                isset($_POST['fechaFin']) &&
                isset($_POST['cantidadPersonas']) &&
                isset($_POST['grupo']) &&
                isset($_POST['programaFormacion']) &&
                isset($_POST['codigoCurso']) &&
                isset($_POST['empleado'])) {

                if ($curso->setNombre($_POST['nombre']) &&
                    $curso->setFechaInicio($_POST['fechaInicio']) &&
                    $curso->setFechaFin($_POST['fechaFin']) &&
                    $curso->setCantidadPersonas($_POST['cantidadPersonas']) &&
                    $curso->setGrupo($_POST['grupo']) &&
                    $curso->setProgramaFormacion($_POST['programaFormacion']) &&
                    $curso->setCodigo($_POST['codigoCurso']) &&
                    $curso->setEmpleado($_POST['empleado']) &&
                    $curso->setEstado('pendiente')) {

                    if ($curso->create()) {
                        $result['status'] = 1;
                        $result['message'] = 'Curso agregado correctamente';
                    } else {
                        $result['message'] = 'No se pudo agregar el curso';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos incompletos';
            }
            break;

        case 'getCurso':
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($result['dataset'] = $curso->getCursoById($_GET['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos del curso';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateCurso':
            $_POST = Validator::validateForm($_POST);
            if (isset($_POST['id']) &&
                isset($_POST['nombre']) &&
                isset($_POST['fechaInicio']) &&
                isset($_POST['fechaFin']) &&
                isset($_POST['cantidadPersonas']) &&
                isset($_POST['grupo']) &&
                isset($_POST['programaFormacion']) &&
                isset($_POST['codigoCurso']) &&
                isset($_POST['empleado']) &&
                isset($_POST['estado'])) {

                if ($curso->setId($_POST['id']) &&
                    $curso->setNombre($_POST['nombre']) &&
                    $curso->setFechaInicio($_POST['fechaInicio']) &&
                    $curso->setFechaFin($_POST['fechaFin']) &&
                    $curso->setCantidadPersonas($_POST['cantidadPersonas']) &&
                    $curso->setGrupo($_POST['grupo']) &&
                    $curso->setProgramaFormacion($_POST['programaFormacion']) &&
                    $curso->setCodigo($_POST['codigoCurso']) &&
                    $curso->setEmpleado($_POST['empleado']) &&
                    $curso->setEstado($_POST['estado'])) {

                    if ($curso->update()) {
                        $result['status'] = 1;
                        $result['message'] = 'Curso actualizado correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar el curso';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos incompletos';
            }
            break;

        case 'deleteCurso':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($curso->delete($data['id'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Curso eliminado correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar el curso';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;
            
        case 'obtenerFechasCurso':
            try {
                $result = $curso->obtenerFechasCurso();
            } catch (Exception $e) {
                http_response_code(500);
                $result = array('error' => 'Hubo un problema al obtener las fechas del curso: ' . $e->getMessage());
            }
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>
