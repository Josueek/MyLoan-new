<?php
require_once('../helpers/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el correo electrónico y la nueva contraseña del cuerpo de la solicitud
    $correo_electronico = $_POST['correo_electronico'] ?? '';
    $nueva_contraseña = $_POST['nueva_contraseña'] ?? '';

    // Validar que ambos campos no estén vacíos
    if (empty($correo_electronico) || empty($nueva_contraseña)) {
        echo json_encode(['cambiado' => false, 'message' => 'Se requiere el correo electrónico y la nueva contraseña.']);
        exit;
    }

    // Encriptar la nueva contraseña
    $hashed_password = password_hash($nueva_contraseña, PASSWORD_DEFAULT); // Genera el hash de la contraseña

    // Actualizar la contraseña en la base de datos
    $updateQuery = "UPDATE tb_usuarios SET contraseña = ? WHERE correo_electronico = ?";
    $cambiado = Database::executeRow($updateQuery, [$hashed_password, $correo_electronico]);

    if ($cambiado) {
        echo json_encode(['cambiado' => true, 'message' => 'Contraseña cambiada correctamente.']);
    } else {
        echo json_encode(['cambiado' => false, 'message' => 'Error al cambiar la contraseña.']);
    }
} else {
    echo json_encode(['cambiado' => false, 'message' => 'Método de solicitud no permitido.']);
}
?>
