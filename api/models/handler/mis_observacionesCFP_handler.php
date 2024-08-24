<?php
require_once('../helpers/database.php');

include_once __DIR__ . '/../../services/mis_observacionesCFP_services.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fechaObservacion = $_POST['fechaObservacion'] ?? null;
    $observacion = $_POST['observacion'] ?? null;
    $tipoObservacion = $_POST['+'] ?? null;
    $tipoPrestamo = $_POST['tipoPrestamo'] ?? null;m
    $espacioObservar = $_POST['espacioObservar'] ?? null;
    $cursoObservar = $_POST['cursoObservar'] ?? null;

    $fotoObservacion = null;
    if (isset($_FILES['fotoObservacion']) && $_FILES['fotoObservacion']['size'] > 0) {
        $fotoObservacion = file_get_contents($_FILES['fotoObservacion']['tmp_name']);
    }

    try {
        $result = insertarObservacion($fechaObservacion, $observacion, $tipoObservacion, $tipoPrestamo, $espacioObservar, $cursoObservar, $fotoObservacion);

        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'Observación agregada correctamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Hubo un problema al agregar la observación.']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error en el servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de solicitud no permitido.']);
}
?>
