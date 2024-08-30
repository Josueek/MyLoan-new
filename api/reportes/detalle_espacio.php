<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/espacio_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report('P', 'mm', 'A4');

// Establecer márgenes de 15 mm en cada lado
$pdf->SetMargins(15, 15, 15); // Izquierda, Superior, Derecha
$pdf->startReport('Reporte informativo de espacios');

// Título centrado
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'Reporte de Espacios y Especialidades', 0, 1, 'C');

// Texto explicativo
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, utf8_decode('Este documento presenta un reporte detallado de los espacios disponibles junto con sus especialidades y el nombre del empleado encargado. Cada espacio está descrito con su capacidad, tipo, y especialidad asociada. Por favor, consulte cada sección para los detalles completos de cada espacio.'));

// Añadir un espacio antes de comenzar con los detalles
$pdf->Ln(20);

// Se instancia el modelo EspacioHandler para obtener los datos.
$espacio = new EspacioHandler;

// Verificación de existencia de datos
if ($dataEspacios = $espacio->obtenerDetalleEspacios()) {
    foreach ($dataEspacios as $rowEspacio) {
        // Añadir una nueva página para cada espacio
        $pdf->AddPage();

        // Establecer la fuente para los encabezados de la tabla.
        $pdf->SetFont('Arial', 'B', 12);

        // Imprimir el título del espacio centrado
        $pdf->Cell(0, 10, utf8_decode('Espacio: ' . $rowEspacio['nombre_espacio']), 0, 1, 'C');
        $pdf->Ln(10);

        // Ajuste manual del ancho de las celdas (70 mm para campo, 100 mm para valor)
        $columnWidths = [70, 100];
        $rowHeight = 10;

        // Calcular el ancho total de la tabla
        $totalTableWidth = array_sum($columnWidths);

        // Obtener el ancho de la página y calcular el margen izquierdo para centrar la tabla
        $pageWidth = $pdf->GetPageWidth();
        $marginLeft = ( $pageWidth - $totalTableWidth ) / 2.7;

        // Establecer el margen izquierdo
        $pdf->SetX($marginLeft);

        // Encabezados de las celdas con color de fondo
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->setFillColor(252, 195, 45); // Color para los encabezados

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Campo'), 1, 0, 'C', 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode('Datos'), 1, 1, 'C', 1);

        // Detalles del espacio con ajuste manual de ancho y alto
        $pdf->SetFont('Arial', '', 11);

        // Se imprime cada fila del detalle del espacio centrado
        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Nombre del Espacio'), 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowEspacio['nombre_espacio']), 1, 1);

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Capacidad de Personas'), 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowEspacio['capacidad_personas']), 1, 1);

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Tipo de Espacio'), 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowEspacio['tipo_espacio']), 1, 1);

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Especialidad'), 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowEspacio['nombre_especialidad']), 1, 1);

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Nombre del Empleado'), 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowEspacio['nombre_empleado'] . ' ' . $rowEspacio['apellido_empleado']), 1, 1);
    }
} else {
    // Página adicional en caso de no haber espacios
    $pdf->AddPage();
    $pdf->Cell(0, 10, utf8_decode('No hay espacios para mostrar'), 0, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'reporte_espacios.pdf');
?>
