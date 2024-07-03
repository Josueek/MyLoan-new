<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/mis_observaciones_data.php');

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Inicializar objeto ObservacionData
$observacion = new ObservacionData();

// Array para el resultado de la operación
$result = array('status' => 0, 'message' => null, 'dataset' => null);

// Verificar si se ha enviado una acción
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'getAllObservaciones':
            // Obtener el parámetro de búsqueda opcional
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            // Obtener todas las observaciones
            $result = $observacion->getAllObservaciones($buscar);
            break;

        case 'getTiposObservacion':
            $tiposObservacion = $observacion->getTiposObservacion();
            if ($tiposObservacion) {
                $result['status'] = 1;
                $result['dataset'] = $tiposObservacion;
            } else {
                $result['message'] = 'No se pudieron obtener los tipos de observación';
            }
            break;

        case 'getTiposPrestamo':
            $tiposPrestamo = $observacion->getTiposPrestamo();
            if ($tiposPrestamo) {
                $result['status'] = 1;
                $result['dataset'] = $tiposPrestamo;
            } else {
                $result['message'] = 'No se pudieron obtener los tipos de préstamo';
            }
            break;

        case 'getEspacios':
            $espacios = $observacion->getEspacios();
            if ($espacios) {
                $result['status'] = 1;
                $result['dataset'] = $espacios;
            } else {
                $result['message'] = 'No se pudieron obtener los espacios';
            }
            break;

        case 'getPrestamos':
            $prestamos = $observacion->getPrestamos();
            if ($prestamos) {
                $result['status'] = 1;
                $result['dataset'] = $prestamos;
            } else {
                $result['message'] = 'No se pudieron obtener los préstamos';
            }
            break;

        case 'getObservacion':
            // Verificar si se ha enviado un ID válido
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                // Obtener la observación por ID
                $observacionData = $observacion->getObservacionById($_GET['id']);
                
                if ($observacionData) {
                    $result['status'] = 1;
                    $result['dataset'] = $observacionData;
                } else {
                    $result['message'] = 'No se encontró ninguna observación con ese ID';
                }
            } else {
                $result['message'] = 'ID de observación inválido';
            }
            break;

        case 'addObservacion':
            // Validar y procesar los datos para agregar una observación nueva
            $validData = validateObservacionData($_POST);
            
            if ($validData['status']) {
                $observacion->setFechaObservacion($validData['data']['fechaObservacion']);
                $observacion->setObservacion($validData['data']['observacion']);
                $observacion->setTipoObservacion($validData['data']['tipoObservacion']);
                $observacion->setTipoPrestamo($validData['data']['tipoPrestamo']);
                $observacion->setIdEspacio($validData['data']['idEspacio']);
                $observacion->setIdUsuario($validData['data']['idUsuario']);
                $observacion->setIdPrestamo($validData['data']['idPrestamo']);

                if ($observacion->create()) {
                    $result['status'] = 1;
                    $result['message'] = 'Observación agregada correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar la observación';
                }
            } else {
                $result['message'] = $validData['message'];
            }
            break;

        case 'updateObservacion':
            // Validar y procesar los datos para actualizar una observación existente
            $validData = validateObservacionData($_POST);
            
            if ($validData['status'] && isset($_POST['idObservacion']) && Validator::validateNaturalNumber($_POST['idObservacion'])) {
                $observacion->setIdObservacion($_POST['idObservacion']);
                $observacion->setFechaObservacion($validData['data']['fechaObservacion']);
                $observacion->setObservacion($validData['data']['observacion']);
                $observacion->setTipoObservacion($validData['data']['tipoObservacion']);
                $observacion->setTipoPrestamo($validData['data']['tipoPrestamo']);
                $observacion->setIdEspacio($validData['data']['idEspacio']);
                $observacion->setIdUsuario($validData['data']['idUsuario']);
                $observacion->setIdPrestamo($validData['data']['idPrestamo']);

                if ($observacion->update()) {
                    $result['status'] = 1;
                    $result['message'] = 'Observación actualizada correctamente';
                } else {
                    $result['message'] = 'No se pudo actualizar la observación';
                }
            } else {
                $result['message'] = 'Datos inválidos para la actualización de la observación';
            }
            break;

        case 'deleteObservacion':
            // Eliminar una observación por ID
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (isset($data['idObservacion']) && Validator::validateNaturalNumber($data['idObservacion'])) {
                if ($observacion->delete($data['idObservacion'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Observación eliminada correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar la observación';
                }
            } else {
                $result['message'] = 'Datos inválidos para eliminar la observación';
            }
            break;

        default:
            $result['message'] = 'Acción no válida';
    }
} else {
    $result['message'] = 'No se especificó ninguna acción';
}

// Devolver resultado como JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);

// Función para validar los datos de la observación antes de crear o actualizar
function validateObservacionData($postData)
{
    $validatedData = array('status' => false, 'message' => '', 'data' => array());

    // Validar los campos necesarios
    if (isset($postData['fechaObservacion'], $postData['observacion'], $postData['tipoObservacion'], $postData['tipoPrestamo'], $postData['idEspacio'], $postData['idUsuario'], $postData['idPrestamo'])) {
        // Ejemplo de validación: asegúrate de que cada campo tenga un valor válido
        $fechaObservacion = trim($postData['fechaObservacion']);
        $observacion = trim($postData['observacion']);
        $tipoObservacion = trim($postData['tipoObservacion']);
        $tipoPrestamo = trim($postData['tipoPrestamo']);
        $idEspacio = trim($postData['idEspacio']);
        $idUsuario = trim($postData['idUsuario']);
        $idPrestamo = trim($postData['idPrestamo']);

        // Ejemplo de validación: verificar que la fecha sea válida, etc.
        if (!empty($fechaObservacion) && !empty($observacion) && !empty($tipoObservacion) && !empty($tipoPrestamo) && !empty($idEspacio) && !empty($idUsuario) && !empty($idPrestamo)) {
            $validatedData['status'] = true;
            $validatedData['data'] = array(
                'fechaObservacion' => $fechaObservacion,
                'observacion' => $observacion,
                'tipoObservacion' => $tipoObservacion,
                'tipoPrestamo' => $tipoPrestamo,
                'idEspacio' => $idEspacio,
                'idUsuario' => $idUsuario,
                'idPrestamo' => $idPrestamo
            );
        } else {
            $validatedData['message'] = 'Datos incompletos para la observación';
        }
    } else {
        $validatedData['message'] = 'Datos de la observación no proporcionados correctamente';
    }

    return $validatedData;
}
?>
