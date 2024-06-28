<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/data/GestionarEmpleadoData.php');
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
            if ($result['dataset'] = $empleado->getAllEmployees()) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se pudieron obtener los empleados';
            }
            break;

        case 'getEmpleado':
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
                $_POST = json_decode(file_get_contents('php://input'), true);
                if (isset($_POST['id']) && Validator::validateNaturalNumber($_POST['id']) &&
                    isset($_POST['nombre']) && Validator::validateAlphabetic($_POST['nombre']) &&
                    isset($_POST['apellido']) && Validator::validateAlphabetic($_POST['apellido']) &&
                    isset($_POST['telefono']) && Validator::validateString($_POST['telefono']) &&
                    isset($_POST['estado']) && Validator::validateString($_POST['estado']) &&
                    isset($_POST['correo']) && Validator::validateEmail($_POST['correo'])) {
                    if ($empleado->setId($_POST['id']) &&
                        $empleado->setNombre($_POST['nombre']) &&
                        $empleado->setApellidos($_POST['apellido']) &&
                        $empleado->setTelefono($_POST['telefono']) &&
                        $empleado->setEstado($_POST['estado']) &&
                        $empleado->setCorreo($_POST['correo'])) {
                        if ($empleado->updateRow()) {
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
            if ($result['dataset'] = $especialidad->readAll()) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se pudieron obtener las especialidades';
            }
            break;

        case 'createEspecialidad':
            $_POST = Validator::validateForm($_POST);
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
            break;

            // Agrega este caso en tu switch en empleado_services.php
            case 'getEspecialidad':
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
            


                case 'updateEspecialidad':
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
            if ($result['dataset'] = $cargo->readAll()) {
                $result['status'] = 1;
            } else {
                $result['message'] = 'No se pudieron obtener los cargos';
            }
            break;

        case 'createCargo':
            $_POST = Validator::validateForm($_POST);
            if ($cargo->setNombre($_POST['nombre'])) {
                if ($cargo->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cargo creado correctamente';
                } else {
                    $result['message'] = 'No se pudo crear el cargo';
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


        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
    exit;
}
