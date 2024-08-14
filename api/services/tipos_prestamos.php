<?php
// Importar la clase de conexión o definir la conexión aquí si no estás utilizando una clase
require_once('path_to_your_conexion_file.php');

// Crear una instancia de la clase de conexión
$conexion = new Conexion();
$conn = $conexion->getConnection();

try {
    // Consulta SQL para obtener los tipos de préstamo
    $sql = "SELECT DISTINCT tipo_prestamo FROM tb_observaciones";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Obtener los resultados en un array
    $result = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Devolver los datos en formato JSON
    echo json_encode($result);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
