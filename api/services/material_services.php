<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/material_data.php');

if (isset($_GET['action'])) {
    session_start();
    $material = new MaterialData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllMateriales':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';
            $result = $material->getAllMateriales($buscar, $filtrar);
            break;

        case 'addMaterial':
            $_POST = Validator::validateForm($_POST);
            if (
                $material->setNombre($_POST['nombre']) &&
                $material->setDescripcion($_POST['descripcion']) &&
                $material->setCantidad($_POST['cantidad'])
            ) {
                if ($material->create()) {
                    $result['status'] = 1;
                    $result['message'] = 'Material agregado correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar el material';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getMaterial':
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($result['dataset'] = $material->getMaterialById($_GET['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos del material';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;
            case 'getInventarioPorTipoInventario':
                // Verificar si el parámetro 'tipo' está presente y es válido
                if (isset($_POST['tipo']) && !empty($_POST['tipo'])) {
                    $tipo = $_POST['tipo'];
            
                    // Establecer el tipo de inventario
                    if (!$material->setTipoInventario($tipo)) {
                        $result['error'] = $material->getDataError();
                    } elseif ($result['dataset'] = $material->getInventarioPorTipoInventario()) {
                        $result['status'] = 1;
                    } else {
                        $result['message'] = 'No se pudieron obtener los datos del inventario';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
                break;
        case 'updateMaterial':
            $_POST = Validator::validateForm($_POST);
            if (
                $material->setId($_POST['id']) &&
                $material->setNombre($_POST['nombre']) &&
                $material->setDescripcion($_POST['descripcion']) &&
                $material->setCantidad($_POST['cantidad'])
            ) {
                if ($material->update()) {
                    $result['status'] = 1;
                    $result['message'] = 'Material actualizado correctamente';
                } else {
                    $result['message'] = 'No se pudo actualizar el material';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteMaterial':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($material->delete($data['id'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Material eliminado correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar el material';
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
