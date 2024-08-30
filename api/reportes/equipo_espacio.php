<?php

// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/equipo_handler.php');

$id_espacio = isset($_GET['id_espacio']) ? $_GET['id_espacio'] : 0;

// Verificar si el id_espacio es válido
if (empty($id_espacio) || !is_numeric($id_espacio)) {
    die('Parámetro id_espacio no válido.');
}

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Establecer márgenes globales (15 mm a cada lado).
$pdf->SetMargins(15, 15, 15);

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Equipo registrado en espacios');

// Se instancia el modelo EquipoHandler para obtener los datos.
$equipo = new EquipoHandler;

// Definir el ancho de la página restando los márgenes (15 mm a cada lado).
$pageWidth = $pdf->GetPageWidth() - 30; // 30 mm de márgenes (15 mm a cada lado)

// Ajustar el ancho de las columnas (puedes ajustar los valores según el contenido).
$columnWidths = array(30, 60, 60, 30);

// Calcular el ancho total de la tabla.
$totalTableWidth = array_sum($columnWidths);

// Calcular el margen izquierdo para centrar la tabla dentro del área disponible.
$marginLeft = ($pageWidth - $totalTableWidth) / 2;

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
$dataEquipos = $equipo->equipoEspacio($id_espacio);
if (is_array($dataEquipos) && count($dataEquipos) > 0) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(252, 190, 45);
    $pdf->setFont('Arial', 'B', 10);

    // Aplicar el margen izquierdo calculado
    $pdf->SetX($pdf->GetX() + $marginLeft);

    // Imprimir los encabezados con una altura de celda de 10 mm y el nuevo ancho de columnas.
    $pdf->Cell($columnWidths[0], 10, utf8_decode('Núm Equipo'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, utf8_decode('Nombre'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, utf8_decode('Descripción'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[3], 10, utf8_decode('Cantidad'), 1, 1, 'C', 1);

    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 10);

    // Se recorren los registros fila por fila con el nuevo ancho de columnas.
    foreach ($dataEquipos as $rowEquipo) {
        // Asegurar que cada fila se mantenga centrada aplicando el margen izquierdo
        $pdf->SetX($pdf->GetX() + $marginLeft);
        $pdf->Cell($columnWidths[0], 10, utf8_decode($rowEquipo['id_equipo']), 1, 0, 'C');
        $pdf->Cell($columnWidths[1], 10, utf8_decode($rowEquipo['nombre']), 1, 0, 'C');
        $pdf->Cell($columnWidths[2], 10, utf8_decode($rowEquipo['descripcion']), 1, 0, 'C');
        $pdf->Cell($columnWidths[3], 10, utf8_decode($rowEquipo['cantidad']), 1, 1, 'C');
    }
} else {
    // Si no se encuentran equipos, se muestra un mensaje centrado.
    $pdf->Cell(0, 10, utf8_decode('No hay equipos para mostrar en este espacio'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'reporte_equipo_espacio.pdf');

?>