<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/gestionar_empleado_data.php');
require_once('../models/data/especialidad_data.php');
require_once('../models/data/cargo_data.php');

if (isset($_GET['action'])) {
    session_start();
    $empleado = new GestionarEmpleadoData();
    $especialidad = new EspecialidadData();
    $cargo = new CargoData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getEmpleados':
            // Obtiene todos los empleados.
            if ($result['dataset'] = $empleado->getAllEmployees()) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se pudieron obtener los empleados';
            }
            break;

        case 'searchEmpleados':
            // Busca empleados según criterios específicos.
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $estado = isset($_GET['estado']) ? $_GET['estado'] : '';
            if ($result['dataset'] = $empleado->searchEmployees($buscar, $estado)) {
                $result['status'] = 1;
            } else {
                $result['status'] = 0;
                $result['dataset'] = [];  // Devolver un dataset vacío si no se encontraron empleados
                $result['message'] = 'No se encontraron empleados con los criterios especificados.';
            }
            break;

        case 'getEmpleado':
            // Obtiene un empleado por su ID.
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($result['dataset'] = $empleado->getEmployeeById($_GET['id'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos del empleado';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateEmpleado':
            // Actualiza el estado de un empleado.
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['id']) && Validator::validateNaturalNumber($_POST['id']) &&
                isset($_POST['estado']) && Validator::validateString($_POST['estado'])) {
                if ($empleado->setId($_POST['id']) && $empleado->setEstado($_POST['estado'])) {
                    if ($empleado->updateEmployee($_POST['id'], $_POST['estado'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Empleado actualizado correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar el empleado';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteEmpleado':
            // Elimina un empleado por su ID.
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($empleado->deleteEmployee($data['id'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Empleado eliminado correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar el empleado';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getAllEspecialidades':
            // Obtiene todas las especialidades.
            if ($result['dataset'] = $especialidad->readAll()) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se pudieron obtener las especialidades';
            }
            break;

        case 'createEspecialidad':
             // Crea una nueva especialidad.
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['nombre']) && Validator::validateString($_POST['nombre'])) {
                if ($especialidad->setNombre($_POST['nombre'])) {
                    if ($especialidad->createRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Especialidad creada correctamente';
                    } else {
                        $result['message'] = 'No se pudo crear la especialidad';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getEspecialidad':
            // Obtiene una especialidad por su ID.
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($especialidad->setId($_GET['id'])) {
                    if ($result['dataset'] = $especialidad->readOne()) {
                        $result['status'] = 1;
                    } else {
                        $result['message'] = 'No se pudo obtener la especialidad';
                    }
                } else {
                    $result['message'] = 'ID inválido';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateEspecialidad':
            // Actualiza una especialidad existente.
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['id']) && Validator::validateNaturalNumber($_POST['id']) &&
                isset($_POST['nombre']) && Validator::validateAlphabetic($_POST['nombre'])) {
                if ($especialidad->setId($_POST['id']) && $especialidad->setNombre($_POST['nombre'])) {
                    if ($especialidad->updateRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Especialidad actualizada correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar la especialidad';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteEspecialidad':
            // Elimina una especialidad por su ID.
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($especialidad->setId($data['id'])) {
                    if ($especialidad->deleteRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Especialidad eliminada correctamente';
                    } else {
                        $result['message'] = 'No se pudo eliminar la especialidad';
                    }
                } else {
                    $result['message'] = 'ID inválido';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getAllCargos':
            // Obtiene todos los cargos.
            if ($result['dataset'] = $cargo->readAll()) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se pudieron obtener los cargos';
            }
            break;

        case 'createCargo':
            // Crea un nuevo cargo.
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['nombre']) && Validator::validateString($_POST['nombre'])) {
                if ($cargo->setNombre($_POST['nombre'])) {
                    if ($cargo->createRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Cargo agregado correctamente.';
                    } else {
                        $result['message'] = 'No se pudo agregar el cargo.';
                    }
                } else {
                    $result['message'] = 'Nombre de cargo no válido.';
                }
            } else {
                $result['message'] = 'Datos inválidos.';
            }
            break;

        case 'getCargo':
            if (isset($_GET['id']) && Validator::validateNaturalNumber($_GET['id'])) {
                if ($cargo->setId($_GET['id'])) {
                    if ($result['dataset'] = $cargo->readOne()) {
                        $result['status'] = 1;
                    } else {
                        $result['message'] = 'No se pudo obtener el cargo';
                    }
                } else {
                    $result['message'] = 'ID inválido';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateCargo':
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['id']) && Validator::validateNaturalNumber($_POST['id']) &&
                isset($_POST['nombre']) && Validator::validateAlphabetic($_POST['nombre'])) {
                if ($cargo->setId($_POST['id']) && $cargo->setNombre($_POST['nombre'])) {
                    if ($cargo->updateRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Cargo actualizado correctamente';
                    } else {
                        $result['message'] = 'No se pudo actualizar el cargo';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteCargo':
            // Obtiene un cargo por su ID.
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && Validator::validateNaturalNumber($data['id'])) {
                if ($cargo->setId($data['id'])) {
                    if ($cargo->deleteRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Cargo eliminado correctamente';
                    } else {
                        $result['message'] = 'No se pudo eliminar el cargo';
                    }
                } else {
                    $result['message'] = 'ID inválido';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'assignEspecialidad':
            // Actualiza un cargo existente.
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['idEmpleado']) && Validator::validateNaturalNumber($_POST['idEmpleado']) &&
                isset($_POST['idEspecialidad']) && Validator::validateNaturalNumber($_POST['idEspecialidad'])) {
                if ($empleado->setId($_POST['idEmpleado']) && $especialidad->setId($_POST['idEspecialidad'])) {
                    if ($empleado->assignEspecialidad($_POST['idEmpleado'], $_POST['idEspecialidad'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Especialidad asignada correctamente';
                    } else {
                        $result['message'] = 'No se pudo asignar la especialidad';
                    }
                } else {
                    $result['message'] = 'Datos inválidos';
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
    exit;
}
