<?php
session_start(); // Inicia la sesión

require_once('../models/data/empleado_data.php');

if (isset($_GET['action'])) {
    $empleado = new EmpleadoData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);
    switch ($_GET['action']) {
        case 'saveDetails':
            $_POST = Validator::validateForm($_POST);
            $idUsuario = $_SESSION['id_usuario']; // Obtiene el ID del usuario de la sesión

            // Verificar si hay usuarios en la base de datos
            $empleadosExistentes = $empleado->checkExistingUsers();
            $estado = ($empleadosExistentes > 0) ? 'Inactivo' : 'Activo';

            if (
                !$empleado->setNombre($_POST['nombre']) ||
                !$empleado->setApellidos($_POST['apellidos']) ||
                !$empleado->setTelefono($_POST['telefono']) ||
                !$empleado->setIdUsuario($idUsuario) ||
                !$empleado->setEstado($estado)
            ) {
                $result['error'] = $empleado->getDataError();
            } else {
                $filename = null;
                if (isset($_FILES['imagen'])) {
                    $file = $_FILES['imagen'];
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

                if ($empleado->saveDetails()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalles guardados correctamente';
                    session_destroy(); // Destruye la sesión al completar el registro
                } else {
                    $result['error'] = 'Ocurrió un problema al guardar los detalles';
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
