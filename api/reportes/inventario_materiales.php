<?php
// Incluir la clase con las plantillas para generar reportes
require_once('../helpers/report.php');
// Incluir la clase para la transferencia y acceso a datos
require_once('../models/handler/material_handler.php');

// Instanciar la clase para crear el reporte
$pdf = new Report();
 

// Establecer márgenes de 15 mm a cada lado
$pdf->SetMargins(15, 15, 15);
$pdf->SetAutoPageBreak(true, 15); // Establecer un margen inferior de 15 mm
$pdf->startReport('Reporte sobre inventario de materiales');

// Obtener el valor del parámetro de orden
$orden = isset($_GET['orden']) ? $_GET['orden'] : 'asc';

// Instanciar el modelo MaterialHandler para obtener los datos
$material = new MaterialHandler();

// Definir el ancho de la página en mm menos los márgenes de 15 mm a cada lado
$pageWidth = $pdf->GetPageWidth() - 30; // 30 mm = 15 mm de margen a cada lado
$columnWidths = array($pageWidth * 0.33, $pageWidth * 0.33, $pageWidth * 0.34); // Ancho de columnas distribuidas uniformemente

// Calcular el ancho total de la tabla
$tableWidth = array_sum($columnWidths);

// Calcular el punto de inicio X para centrar la tabla
$startX = ($pageWidth - $tableWidth) / 2 + 15; // +15 para tener en cuenta el margen izquierdo

// Establecer el punto de inicio X
$pdf->SetX($startX);

// Verificar si existen registros para mostrar, de lo contrario imprimir un mensaje
if ($dataMateriales = $material->getMaterials($orden)) {
    // Establecer un color de relleno para los encabezados
    $pdf->setFillColor(252, 190, 45);
    $pdf->setFont('Arial', 'B', 10);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Descripcion', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Cantidad', 1, 1, 'C', 1);

    // Establecer un color de relleno para los datos
    $pdf->setFillColor(200, 231, 226);
    $pdf->setFont('Arial', '', 11);

    // Recorrer los registros fila por fila
    foreach ($dataMateriales as $rowMaterial) {
        $pdf->SetX($startX); // Asegurarse de que cada fila comience desde el punto de inicio X
        $pdf->Cell($columnWidths[0], 10, utf8_decode($rowMaterial['nombre']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, utf8_decode($rowMaterial['descripcion']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, $rowMaterial['cantidad'], 1, 1, 'C');
    }
} else {
    $pdf->SetX($startX); // Asegurarse de que el mensaje de "No hay materiales para mostrar" esté centrado
    $pdf->Cell($tableWidth, 10, utf8_decode('No hay materiales para mostrar'), 1, 1, 'C');
}

// Llamar implícitamente al método footer() y enviar el documento al navegador web
$pdf->output('I', 'inventario_materiales.pdf');
?>