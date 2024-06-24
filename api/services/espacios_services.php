<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/espacio_handler.php');
require_once('../models/data/espacio_data.php');

if (isset($_GET['action'])) {
    session_start();
    $espacio = new EspacioData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllEspacios':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';
        
            $result = $espacio->getAllEspacios($buscar, $filtrar);
            break;
        
        case 'getAllEmpleados':
            $result = array('status' => 1, 'dataset' => $espacio->getAllEmpleados());
            break;
        case 'getAllEspecialidades':
            $result = array('status' => 1, 'dataset' => $espacio->getAllEspecialidades());
            break;
        case 'getAllInstituciones':
            $result = array('status' => 1, 'dataset' => $espacio->getAllInstituciones());
            break;
        case 'addEspacio':
            $_POST = Validator::validateForm($_POST);
            $nombre = $_POST['nombreEspacio'];
            $capacidad = $_POST['capacidadPersonas'];
            $tipo = $_POST['tipoEspacio'];
            $encargado = $_POST['encargadoEspacio'];
            $especialidad = $_POST['especialidadEspacio'];
            $institucion = $_POST['institucionEspacio'];

            if (Validator::validateString($nombre) &&
                Validator::validateNaturalNumber($capacidad) &&
                Validator::validateString($tipo) &&
                Validator::validateNaturalNumber($encargado) &&
                Validator::validateNaturalNumber($especialidad) &&
                Validator::validateNaturalNumber($institucion)) {

                $imagenEspacio = null;
                $inventarioEspacio = null;

                if (isset($_FILES['imagenEspacio']) && $_FILES['imagenEspacio']['error'] == UPLOAD_ERR_OK) {
                    $imagenEspacio = uniqid() . '.' . pathinfo($_FILES['imagenEspacio']['name'], PATHINFO_EXTENSION);
                    if (!move_uploaded_file($_FILES['imagenEspacio']['tmp_name'], '../../api/images/espacios/' . $imagenEspacio)) {
                        $result['message'] = 'Error al subir la imagen';
                        echo json_encode($result);
                        return;
                    }
                }

                if (isset($_FILES['inventarioEspacio']) && $_FILES['inventarioEspacio']['error'] == UPLOAD_ERR_OK) {
                    $inventarioEspacio = uniqid() . '.' . pathinfo($_FILES['inventarioEspacio']['name'], PATHINFO_EXTENSION);
                    if (!move_uploaded_file($_FILES['inventarioEspacio']['tmp_name'], '../../api/inventario/' . $inventarioEspacio)) {
                        $result['message'] = 'Error al subir el inventario';
                        echo json_encode($result);
                        return;
                    }
                }

                $params = array($nombre, $capacidad, $tipo, $encargado, $especialidad, $institucion, $inventarioEspacio, $imagenEspacio);

                if ($espacio->addEspacio($params)) {
                    $result['status'] = 1;
                    $result['message'] = 'Espacio agregado correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar el espacio';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;
        case 'getEspacioById':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['idEspacio']) && Validator::validateNaturalNumber($data['idEspacio'])) {
                if ($result['dataset'] = $espacio->getEspacioById($data['idEspacio'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudo obtener el espacio';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;
            case 'updateEspacio':
                $_POST = Validator::validateForm($_POST);
                $idEspacio = $_POST['idEspacio'];
                $nombre = $_POST['nombreEspacio'];
                $capacidad = $_POST['capacidadPersonas'];
                $tipo = $_POST['tipoEspacio'];
                $encargado = $_POST['encargadoEspacio'];
                $especialidad = $_POST['especialidadEspacio'];
                $institucion = $_POST['institucionEspacio'];
            
                if (Validator::validateNaturalNumber($idEspacio) &&
                    Validator::validateString($nombre) &&
                    Validator::validateNaturalNumber($capacidad) &&
                    Validator::validateString($tipo) &&
                    Validator::validateNaturalNumber($encargado) &&
                    Validator::validateNaturalNumber($especialidad) &&
                    Validator::validateNaturalNumber($institucion)) {
            
                    $imagenEspacio = $_POST['imagenEspacio'] ?? null;
                    $inventarioEspacio = $_POST['inventarioEspacio'] ?? null;
            
                    if (isset($_FILES['imagenEspacio']) && $_FILES['imagenEspacio']['error'] == UPLOAD_ERR_OK) {
                        $imagenEspacio = uniqid() . '.' . pathinfo($_FILES['imagenEspacio']['name'], PATHINFO_EXTENSION);
                        move_uploaded_file($_FILES['imagenEspacio']['tmp_name'], '../../api/images/espacios/' . $imagenEspacio);
                    }
            
                    if (isset($_FILES['inventarioEspacio']) && $_FILES['inventarioEspacio']['error'] == UPLOAD_ERR_OK) {
                        $inventarioEspacio = uniqid() . '.' . pathinfo($_FILES['inventarioEspacio']['name'], PATHINFO_EXTENSION);
                        move_uploaded_file($_FILES['inventarioEspacio']['tmp_name'], '../../api/inventario/' . $inventarioEspacio);
                    }
            
                    $params = array($nombre, $capacidad, $tipo, $encargado, $especialidad, $institucion, $inventarioEspacio, $imagenEspacio, $idEspacio);
            
                    if ($espacio->updateEspacio($params)) {
                        $result['status'] = 1;
                        $result['message'] = 'Espacio actualizado correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar el espacio';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
                break;
            
        case 'deleteEspacio':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['idEspacio']) && Validator::validateNaturalNumber($data['idEspacio'])) {
                if ($espacio->deleteEspacio($data['idEspacio'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Espacio eliminado correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar el espacio';
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
