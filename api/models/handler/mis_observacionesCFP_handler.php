<?php
include_once '../../api/services/mis_observacionesCFP_services.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $fechaObservacion = $_POST['fechaObservacion'] ?? null;
    $observacion = $_POST['observacion'] ?? null;
    $tipoObservacion = $_POST['tipoObservacion'] ?? null;
    $tipoPrestamo = $_POST['tipoPrestamo'] ?? null;
    $espacioObservar = $_POST['espacioObservar'] ?? null;
    $cursoObservar = $_POST['cursoObservar'] ?? null;

    // Manejo de archivo de imagen
    $fotoObservacion = null;
    if (isset($_FILES['fotoObservacion']) && $_FILES['fotoObservacion']['size'] > 0) {
        $fotoObservacion = file_get_contents($_FILES['fotoObservacion']['tmp_name']);
    }

    // Llamar al servicio para insertar la observación
    $result = insertarObservacion($fechaObservacion, $observacion, $tipoObservacion, $tipoPrestamo, $espacioObservar, $cursoObservar, $fotoObservacion);

    // Responder al cliente
    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Observación agregada correctamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Hubo un problema al agregar la observación.']);
    }
}
?>
