<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/espacio_data.php');

if (isset($_GET['action'])) {
    session_start();
    $espacio = new EspacioData(); // Inicializa un objeto EspacioData para manejar operaciones de datos
    $result = array('status' => 0, 'message' => null, 'dataset' => null); // Inicializa un array para almacenar el resultado de las operaciones

    switch ($_GET['action']) {
        case 'getAllEspacios':
            // Obtiene todos los espacios, con opción de búsqueda y filtrado
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';

            $result = $espacio->getAllEspacios($buscar, $filtrar);
            break;

            // Obtiene todos los espacios correspondiente al id del usuario
            case 'getAllEspaciosByIdUsuario':
                // Obtiene un espacio por su ID     
                $data = json_decode(file_get_contents("php://input"), true);
                
                // Verifica que el idempleado esté presente y sea un número natural válido
                if (isset($data['idempleado']) && Validator::validateNaturalNumber($data['idempleado'])) {
                    // Obtiene los espacios asignados para el empleado
                    $espacios = $espacio->getAllEspaciosByIdUsuario($data['idempleado']);
                    
                    // Agrega un log para verificar la respuesta de la función
                    error_log("Respuesta de getAllEspaciosByIdUsuario: " . print_r($espacios, true));
                    
                    // Verifica si se obtuvieron datos
                    if ($espacios !== false) {
                        // Si hay datos, devuelve el estado 1 y el dataset
                        if (!empty($espacios)) {
                            $result['status'] = 1;
                            $result['dataset'] = $espacios;
                        } else {
                            // Si no hay datos, devuelve un mensaje indicando que no se encontraron registros
                            $result['status'] = 1;
                            $result['dataset'] = [];
                            $result['message'] = 'No se encontraron registros';
                        }
                    } else {
                        // Si no se pudo obtener los datos, devuelve un mensaje de error
                        $result['status'] = 0;
                        $result['message'] = 'No se pudo obtener el espacio';
                    }
                } else {
                    // Si el idempleado no es válido, devuelve un mensaje de error
                    $result['status'] = 0;
                    $result['message'] = 'Datos inválidos';
                }
                break;
            
            

        case 'getAllEmpleados':
            // Obtiene todos los empleados asociados a los espacios
            $result = array('status' => 1, 'dataset' => $espacio->getAllEmpleados());
            break;
        case 'getAllEspecialidades':
            // Obtiene todas las especialidades relacionadas con los espacios
            $result = array('status' => 1, 'dataset' => $espacio->getAllEspecialidades());
            break;
        case 'getAllInstituciones':
            // Obtiene todas las instituciones relacionadas con los espacios
            $result = array('status' => 1, 'dataset' => $espacio->getAllInstituciones());
            break;
        case 'addEspacio':
            // Agrega un nuevo espacio
            $_POST = Validator::validateForm($_POST);
            $nombre = $_POST['nombreEspacio'];
            $capacidad = $_POST['capacidadPersonas'];
            $tipo = $_POST['tipoEspacio'];
            $encargado = $_POST['encargadoEspacio'];
            $especialidad = $_POST['especialidadEspacio'];
            $institucion = $_POST['institucionEspacio'];
            // Agrega un nuevo espacio
            if (
                Validator::validateString($nombre) &&
                Validator::validateNaturalNumber($capacidad) &&
                Validator::validateString($tipo) &&
                Validator::validateNaturalNumber($encargado) &&
                Validator::validateNaturalNumber($especialidad) &&
                Validator::validateNaturalNumber($institucion)
            ) {

                $imagenEspacio = null;
                $inventarioEspacio = null;
                // Manejo de carga de archivos (imagen e inventario)
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
                // Parámetros para la inserción del espacio
                $params = array($nombre, $capacidad, $tipo, $encargado, $especialidad, $institucion, $inventarioEspacio, $imagenEspacio);
                // Llama al método para agregar el espacio
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
            // Obtiene un espacio por su ID     
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
            // Actualiza un espacio existente   
            $_POST = Validator::validateForm($_POST);
            $idEspacio = $_POST['idEspacio'];
            $nombre = $_POST['nombreEspacio'];
            $capacidad = $_POST['capacidadPersonas'];
            $tipo = $_POST['tipoEspacio'];
            $encargado = $_POST['encargadoEspacio'];
            $especialidad = $_POST['especialidadEspacio'];
            $institucion = $_POST['institucionEspacio'];
            // Validación de datos recibidos
            if (
                Validator::validateNaturalNumber($idEspacio) &&
                Validator::validateString($nombre) &&
                Validator::validateNaturalNumber($capacidad) &&
                Validator::validateString($tipo) &&
                Validator::validateNaturalNumber($encargado) &&
                Validator::validateNaturalNumber($especialidad) &&
                Validator::validateNaturalNumber($institucion)
            ) {

                $imagenEspacio = $_POST['imagenEspacio'] ?? null;
                $inventarioEspacio = $_POST['inventarioEspacio'] ?? null;
                // Manejo de carga de archivos (imagen e inventario)
                if (isset($_FILES['imagenEspacio']) && $_FILES['imagenEspacio']['error'] == UPLOAD_ERR_OK) {
                    $imagenEspacio = uniqid() . '.' . pathinfo($_FILES['imagenEspacio']['name'], PATHINFO_EXTENSION);
                    move_uploaded_file($_FILES['imagenEspacio']['tmp_name'], '../../api/images/espacios/' . $imagenEspacio);
                }

                if (isset($_FILES['inventarioEspacio']) && $_FILES['inventarioEspacio']['error'] == UPLOAD_ERR_OK) {
                    $inventarioEspacio = uniqid() . '.' . pathinfo($_FILES['inventarioEspacio']['name'], PATHINFO_EXTENSION);
                    move_uploaded_file($_FILES['inventarioEspacio']['tmp_name'], '../../api/inventario/' . $inventarioEspacio);
                }
                // Parámetros para la actualización del espacio
                $params = array($nombre, $capacidad, $tipo, $encargado, $especialidad, $institucion, $inventarioEspacio, $imagenEspacio, $idEspacio);
                // Llama al método para actualizar el espacio
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

        case 'EspaciosPorTipo':
            if ($result['dataset'] = $espacio->EspaciosPorTipo()) {
                $result['status'] = 1;
            } else {
                // Manejar el error y enviar un mensaje adecuado // Código de estado HTTP 500 para errores del servidor
                $result['error'] = 'Hubo un problema al obtener los usaarios con más prestamos';
            }
            break;

        case 'deleteEspacio':
            // Elimina un espacio por su ID 
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
        case 'programasFormacionPorEspacio':
            if (isset($_GET['id_espacio']) && $espacio->setIdEspacio($_GET['id_espacio'])) {
                $result['dataset'] = $espacio->programasFormacionPorCurso();
                $result['status'] = 1;
            } else {
                $result['error'] = 'Espacio incorrecto';
            }
            break;
        case 'tipoObservacionesPorEspacio':
            if (isset($_GET['id_espacio']) && $espacio->setIdEspacio($_GET['id_espacio'])) {
                $result['dataset'] = $espacio->tipoObservacionesPorEspacio();
                $result['status'] = 1;
            } else {
                $result['error'] = 'Espacio incorrecto';
            }
            break;
        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
