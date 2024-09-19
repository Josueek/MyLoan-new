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
            ) 
            {
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
            // Depuración: Imprimir los datos recibidos
            //error_log('Datos recibidos: ' . print_r($_POST, true));
            // Verificar si el parámetro 'tipo' está presente y es válido
            if (isset($_GET['tipo']) && !empty($_GET['tipo'])) {
                $tipo = $_GET['tipo'];
                // Depuración: Imprimir el tipo de inventario recibido
                //('Tipo de inventario recibido: ' . $tipo);
                // Establecer el tipo de inventario
                if (!$material->setTipoInventario($tipo)) {
                    // Depuración: Imprimir el error al establecer el tipo de inventario
                    //error_log('Error al establecer el tipo de inventario: ' . $material->getDataError());
                    $result['error'] = $material->getDataError();
                } elseif ($result['dataset'] = $material->getInventarioPorTipoInventario()) {
                    // Depuración: Imprimir los datos del inventario obtenidos
                    //error_log('Datos del inventario obtenidos: ' . print_r($result['dataset'], true));
                    $result['status'] = 1;
                } else {
                    // Depuración: Mensaje cuando no se pueden obtener los datos del inventario
                    //error_log('No se pudieron obtener los datos del inventario');
                    $result['message'] = 'No se pudieron obtener los datos del inventario';
                }
            } else {
                // Depuración: Mensaje cuando los datos son inválidos
                //error_log('Datos inválidos.');
                $result['message'] = 'Datos inválidos.';
            }
            // Enviar la respuesta en formato JSON
            header('Content-Type: application/json');
            //echo json_encode($result);
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
