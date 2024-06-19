<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/espacio_handler.php');

if (isset($_GET['action'])) {
    session_start();
    $espacio = new EspacioHandler();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllEspacios':
            $result = $espacio->getAllEspacios();
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
                    $imagenEspacio = Validator::getFilename();
                    move_uploaded_file($_FILES['imagenEspacio']['tmp_name'], '../../api/images/espacios/' . $imagenEspacio);
                }

                if (isset($_FILES['inventarioEspacio']) && $_FILES['inventarioEspacio']['error'] == UPLOAD_ERR_OK) {
                    $inventarioEspacio = uniqid() . '.' . pathinfo($_FILES['inventarioEspacio']['name'], PATHINFO_EXTENSION);
                    move_uploaded_file($_FILES['inventarioEspacio']['tmp_name'], '../../api/inventario/' . $inventarioEspacio);
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
