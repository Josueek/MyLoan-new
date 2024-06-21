<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/inventario_herramienta_handler.php');
require_once('../models/data/inventario_herramienta_data.php');

if (isset($_GET['action'])) {
    session_start();
    $herramienta = new InventarioHerramientaData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllHerramientas':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';
            $result = $herramienta->getAllHerramientas($buscar, $filtrar);
            break;

        case 'getAllInstituciones':
            $result = array('status' => 1, 'dataset' => $herramienta->getAllInstituciones());
            break;

        case 'addHerramienta':
            $_POST = Validator::validateForm($_POST);
            if ($herramienta->setCodigo($_POST['codigo']) &&
                $herramienta->setNombre($_POST['nombre']) &&
                $herramienta->setStock($_POST['stock']) &&
                $herramienta->setInstitucion($_POST['institucion']) &&
                $herramienta->setDescripcion($_POST['descripcion'])) {
                if ($herramienta->create()) {
                    $result['status'] = 1;
                    $result['message'] = 'Herramienta agregada correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getHerramienta':
            if (isset($_GET['codigo']) && Validator::validateString($_GET['codigo'])) {
                if ($result['dataset'] = $herramienta->getHerramientaByCodigo($_GET['codigo'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos de la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateHerramienta':
            $_POST = Validator::validateForm($_POST);
            if ($herramienta->setCodigo($_POST['codigo']) &&
                $herramienta->setNombre($_POST['nombre']) &&
                $herramienta->setStock($_POST['stock']) &&
                $herramienta->setInstitucion($_POST['institucion']) &&
                $herramienta->setDescripcion($_POST['descripcion'])) {
                if ($herramienta->update()) {
                    $result['status'] = 1;
                    $result['message'] = 'Herramienta actualizada correctamente';
                } else {
                    $result['message'] = 'No se pudo actualizar la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteHerramienta':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['codigoHerramienta']) && Validator::validateString($data['codigoHerramienta'])) {
                if ($herramienta->delete($data['codigoHerramienta'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Herramienta eliminada correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar la herramienta';
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
