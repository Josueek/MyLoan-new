<?php
// mis_observaciones_service.php
include_once '../data/db_connection.php';

function insertarObservacion($fechaObservacion, $observacion, $tipoObservacion, $tipoPrestamo, $espacioObservar, $cursoObservar, $fotoObservacion) {
    $conn = getConnection();

    // Preparar la consulta de inserción
    $stmt = $conn->prepare("INSERT INTO tb_observaciones (fecha_observacion, observacion, tipo_observacion, tipo_prestamo, espacio_observar, curso_observar, foto_observacion) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)");

    // Asignar parámetros
    $stmt->bind_param("sssssss", $fechaObservacion, $observacion, $tipoObservacion, $tipoPrestamo, $espacioObservar, $cursoObservar, $fotoObservacion);

    // Ejecutar la consulta y verificar si fue exitosa
    $result = $stmt->execute();

    // Cerrar conexión y devolver el resultado
    $stmt->close();
    $conn->close();

    return $result;
}
?>
