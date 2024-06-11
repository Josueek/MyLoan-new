<?php
require_once('../models/data/empleado_data.php');
require_once('../helpers/database.php');
require_once('../helpers/validator.php');

session_start();

if (isset($_GET['action'])) {
    $empleado = new EmpleadoData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);

    switch ($_GET['action']) {
        case 'checkSession':
            if (isset($_SESSION['id_usuario'])) {
                $result['status'] = 1;
                $result['id_usuario'] = $_SESSION['id_usuario'];
            } else {
                $result['status'] = 0;
            }
            break;

        case 'getProfile':
            if ($empleado->setIdUsuario($_GET['id_usuario'])) {
                $result['dataset'] = $empleado->getProfile();
                if ($result['dataset']) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se pudo obtener la información del perfil';
                }
            } else {
                $result['error'] = 'ID de usuario inválido';
            }
            break;

        case 'updateProfile':
            $_POST = Validator::validateForm($_POST);

            if (
                !$empleado->setCorreo($_POST['inputEmail']) ||
                !$empleado->setTelefono($_POST['inputTelefono']) ||
                !$empleado->setEstado($_POST['inputEstado']) ||
                !$empleado->setInstitucion($_POST['inputInstitucion']) ||
                !$empleado->setCargo($_POST['inputCargo'])
            ) {
                $result['error'] = $empleado->getDataError();
            } else {
                $filename = null;
                if (isset($_FILES['inputImage'])) {
                    $file = $_FILES['inputImage'];
                    if (Validator::validateImageFile($file, 1000)) {
                        $filename = Validator::getFilename();
                        $empleado->setImagen($filename);
                        if (!Validator::saveFile($file, '../../api/images/perfil/')) {
                            $result['error'] = 'No se pudo guardar la imagen';
                            break;
                        }
                    } else {
                        $result['error'] = Validator::getFileError();
                        break;
                    }
                }

                $empleado->setImagen($filename);

                $inputClave = $_POST['inputClave'];
                if ($inputClave !== '' && strlen($inputClave) >= 8) {
                    if ($empleado->setContrasena($inputClave)) {
                        if ($empleado->updateProfileWithPassword()) {
                            $result['status'] = 1;
                            $result['message'] = 'Perfil actualizado correctamente';
                        } else {
                            $result['error'] = 'Ocurrió un problema al actualizar el perfil';
                        }
                    } else {
                        $result['error'] = $empleado->getDataError();
                    }
                } else {
                    if ($empleado->updateProfile()) {
                        $result['status'] = 1;
                        $result['message'] = 'Perfil actualizado correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al actualizar el perfil';
                    }
                }
            }
            break;

        default:
            $result['error'] = 'Acción no disponible';
    }

    $result['exception'] = Database::getException();
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
?>
