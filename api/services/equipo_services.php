<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/equipo_handler.php');
require_once('../models/data/equipo_data.php');

if (isset($_GET['action'])) {
    session_start();
    $equipo = new EquipoData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllEquipos':
             // Obtiene todos los equipos, con opción de búsqueda y filtrado
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';
            $result = $equipo->getAllEquipos($buscar, $filtrar);
            break;

        case 'getAllInstituciones':
            // Obtiene todas las instituciones disponibles
            $result = array('status' => 1, 'dataset' => $equipo->getAllInstituciones());
            break;

        case 'getAllEspacios':
            // Obtiene todos los espacios disponibles
            $result = array('status' => 1, 'dataset' => $equipo->getAllEspacios());
            break;

        case 'addEquipo':
            // Añade un nuevo equipo
            $_POST = Validator::validateForm($_POST);
            if ($equipo->setNombre($_POST['nombre']) &&
                $equipo->setDescripcion($_POST['descripcion']) &&
                $equipo->setCantidad($_POST['cantidad']) &&
                $equipo->setEspacio($_POST['espacio']) &&
                $equipo->setInstitucion($_POST['institucion'])) {
                if ($equipo->create()) {
                    $result['status'] = 1;
                    $result['message'] = 'Equipo agregado correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar el equipo';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getEquipo':
            // Obtiene los datos de un equipo por su ID
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($result['dataset'] = $equipo->getEquipoById($_GET['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos del equipo';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateEquipo':
            // Actualiza los datos de un equipo
            $_POST = Validator::validateForm($_POST);
            if ($equipo->setId($_POST['id']) &&
                $equipo->setNombre($_POST['nombre']) &&
                $equipo->setDescripcion($_POST['descripcion']) &&
                $equipo->setCantidad($_POST['cantidad']) &&
                $equipo->setEspacio($_POST['espacio']) &&
                $equipo->setInstitucion($_POST['institucion'])) {
                if ($equipo->update()) {
                    $result['status'] = 1;
                    $result['message'] = 'Equipo actualizado correctamente';
                } else {
                    $result['message'] = 'No se pudo actualizar el equipo';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteEquipo':
            // Elimina un equipo por su ID
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($equipo->delete($data['id'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Equipo eliminado correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar el equipo';
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
