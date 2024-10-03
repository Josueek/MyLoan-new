<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/prestamo_handler.php');

if (isset($_GET['action'])) {
    session_start();
    $curso = new CursoHandler();
    $prestamo = new PrestamoHandler(); // Instancia de la clase PrestamoHandler
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {

            
        case 'addPrestamo':
            $_POST = Validator::validateForm($_POST); // Validar el formulario correctamente
            if (
                $prestamo->setfecha_solicitud($_POST['fecha_solicitud']) &&
                $prestamo->setprograma_formacion($_POST['programa_formacion']) &&
                $prestamo->setestado_prestamo($_POST['estado_prestamo']) &&
                $prestamo->setobservacion($_POST['observacion']) &&
                $prestamo->setid_curso($_POST['id_curso']) &&
                $prestamo->setid_usario($_POST['id_usario'])
            ) {
                if ($prestamo->create()) {
                    $result['status'] = 1;
                    $result['message'] = 'Prestamo agregado correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar el prestamo';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    // Se envía el resultado en formato JSON
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
?>