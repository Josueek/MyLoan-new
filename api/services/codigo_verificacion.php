<?php
require_once('../helpers/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';

    // Acción para guardar el código de verificación en la base de datos
    if ($action === 'guardarCodigo') {
        $correo_electronico = $_POST['correo_electronico'] ?? '';
        $codigo_verificacion = $_POST['codigo_verificacion'] ?? '';

        // Validar que ambos campos no estén vacíos
        if (empty($correo_electronico) || empty($codigo_verificacion)) {
            echo json_encode(['guardado' => false, 'message' => 'Se requiere el correo electrónico y el código de verificación.']);
            exit;
        }

        // Guardar el código de verificación en la base de datos
        $updateQuery = "UPDATE tb_usuarios SET codigo_verificacion = ? WHERE correo_electronico = ?";
        $guardado = Database::executeRow($updateQuery, [$codigo_verificacion, $correo_electronico]);

        if ($guardado) {
            echo json_encode(['guardado' => true, 'message' => 'Código guardado correctamente.']);
        } else {
            echo json_encode(['guardado' => false, 'message' => 'Error al guardar el código.']);
        }
    }

    // Acción para validar el código de verificación
    if ($action === 'validarCodigo') {
        // Obtener el correo electrónico y el código de verificación del cuerpo de la solicitud
        $correo_electronico = $_POST['correo_electronico'] ?? '';
        $codigo_verificacion = $_POST['codigo_verificacion'] ?? '';

        // Validar que ambos campos no estén vacíos
        if (empty($correo_electronico) || empty($codigo_verificacion)) {
            echo json_encode(['validado' => false, 'message' => 'Se requiere el correo electrónico y el código de verificación.']);
            exit;
        }

        // Verificar si el código de verificación es correcto
        $query = "SELECT * FROM tb_usuarios WHERE correo_electronico = ? AND codigo_verificacion = ?";
        $usuario = Database::getRow($query, [$correo_electronico, $codigo_verificacion]);

        if ($usuario) {
            // Si el código es correcto, eliminar el código de verificación
            $updateQuery = "UPDATE tb_usuarios SET codigo_verificacion = NULL WHERE correo_electronico = ?";
            $eliminado = Database::executeRow($updateQuery, [$correo_electronico]);

            if ($eliminado) {
                echo json_encode(['validado' => true, 'message' => 'Código de verificación validado con éxito.']);
            } else {
                echo json_encode(['validado' => false, 'message' => 'Error al eliminar el código de verificación.']);
            }
        } else {
            echo json_encode(['validado' => false, 'message' => 'Código de verificación incorrecto.']);
        }
    }
} else {
    echo json_encode(['validado' => false, 'message' => 'Método de solicitud no permitido.']);
}
?>