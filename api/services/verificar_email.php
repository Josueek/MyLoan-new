<?php
// Incluye las dependencias necesarias.
require_once('../models/data/usuario_data.php');
require_once('../helpers/database.php');

// Verifica si hay una acción definida en la solicitud.
if (isset($_GET['action'])) {
    // Instancia el objeto UsuarioData para acceder a la base de datos.
    $usuario = new UsuarioData();
    // Prepara la estructura del resultado.
    $result = array('status' => 0, 'message' => null, 'existe' => false, 'error' => null);

    // Define las acciones disponibles.
    switch ($_GET['action']) {
        case 'verificarCorreo':
            // Verifica si el correo fue enviado en la solicitud POST.
            if (isset($_POST['email']) && !empty($_POST['email'])) {
                // Valida el formato del correo.
                if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                    $result['error'] = 'Correo electrónico inválido';
                    break;
                }

                // Asigna el correo a la instancia de UsuarioData.
                if ($usuario->setCorreo($_POST['email'])) {
                    // Consulta la existencia del correo en la base de datos.
                    if ($usuario->checkEmail()) {
                        $result['status'] = 1;
                        $result['existe'] = true;
                        $result['message'] = 'El correo electrónico está registrado';
                    } else {
                        $result['message'] = 'El correo electrónico no está registrado';
                    }
                } else {
                    $result['error'] = 'No se pudo asignar el correo';
                }
            } else {
                $result['error'] = 'Correo electrónico no proporcionado';
            }
            break;

        default:
            $result['error'] = 'Acción no disponible';
    }

    // Captura cualquier excepción de la base de datos.
    $result['exception'] = Database::getException();
    // Envía la respuesta en formato JSON.
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    // Si no hay acción definida, se envía un mensaje de recurso no disponible.
    print(json_encode('Recurso no disponible'));
}
?>
