<?php
// Incluir la clase con las plantillas para generar reportes
require_once('../helpers/report.php');
// Incluir la clase para la transferencia y acceso a datos
require_once('../models/handler/curso_handler.php');

// Instanciar la clase para crear el reporte
$pdf = new Report();
$pdf->startReport('Reporte de proyección de préstamos');
// Establecer márgenes de 15 mm a cada lado
$pdf->SetMargins(15, 15, 15);
$pdf->SetAutoPageBreak(true, 15); // Establecer un margen inferior de 15 mm

// Texto explicativo
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, utf8_decode('Este reporte presenta la proyección de préstamos y los cursos donde se realizan correspondiente a cada mes.'));

// Instanciar el modelo CursoHandler para obtener los datos
$curso = new CursoHandler();

// Obtener los datos de préstamos con proyección
$dataCursos = $curso->prestamosUltimosMesesConProyeccion();

// Definir el ancho de la página en mm menos los márgenes de 15 mm a cada lado
$pageWidth = $pdf->GetPageWidth() - 30; // 30 mm = 15 mm de margen a cada lado
$columnWidths = array($pageWidth * 0.30, $pageWidth * 0.30, $pageWidth * 0.40); // Ancho de columnas distribuidas uniformemente

// Verificar si existen registros para mostrar, de lo contrario imprimir un mensaje
if (!empty($dataCursos)) {
    // Establecer un color de relleno para los encabezados
    $pdf->Ln(10); // Añadir un espacio antes de la proyección
    $pdf->setFillColor(252, 190, 45);
    $pdf->setFont('Arial', 'B', 10);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, 'Mes', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, utf8_decode('Cantidad préstamos'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Incremento (%)', 1, 1, 'C', 1);

    // Establecer un color de relleno para los datos
    $pdf->setFillColor(200, 231, 226);
    $pdf->setFont('Arial', '', 11);

    // Recorrer los registros fila por fila
    foreach ($dataCursos as $rowCurso) {
        $pdf->Cell($columnWidths[0], 10, utf8_decode($rowCurso['mes']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, utf8_decode($rowCurso['cantidad_prestamos']), 1, 0, 'C');
        $pdf->Cell($columnWidths[2], 10, $rowCurso['porcentaje_incremento'] . '%', 1, 1, 'C');
    }

    // Espacio adicional para mostrar la proyección del siguiente mes
    $pdf->Ln(10); // Añadir un espacio antes de la proyección

    // Imprimir los detalles de la proyección del siguiente mes
    $pdf->setFillColor(252, 190, 45);
    $pdf->setFont('Arial', 'B', 10);
    $pdf->Cell($columnWidths[0], 10, utf8_decode('Pronóstico del mes siguiente'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Cantidad proyectada', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Incremento (%)', 1, 1, 'C', 1);

    // Obtener el último dato de la proyección
    $lastData = end($dataCursos);
    $pdf->setFillColor(200, 231, 226);
    $pdf->setFont('Arial', '', 11);
    $pdf->Cell($columnWidths[0], 10, utf8_decode($lastData['mes']), 1, 0, 'L');
    $pdf->Cell($columnWidths[1], 10, $lastData['cantidad_prestamos'], 1, 0, 'C');
    $pdf->Cell($columnWidths[2], 10, $lastData['porcentaje_incremento'] . '%', 1, 1, 'C');
} else {
    $pdf->Cell(0, 10, utf8_decode('No hay datos para mostrar'), 1, 1, 'C');
}

// Llamar implícitamente al método footer() y enviar el documento al navegador web
$pdf->output('I', 'proyeccion_prestamos.pdf');
?>
