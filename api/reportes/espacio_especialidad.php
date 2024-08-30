<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/espacio_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Espacios por Especialidad');
// Se instancia el modelo EspacioHandler para obtener los datos.
$espacio = new EspacioHandler; 

// Definir el ancho de la página en mm.
$pageWidth = $pdf->GetPageWidth();
$margin = 10; // Margen en mm
$availableWidth = $pageWidth - (2 * $margin); // Ancho disponible para la tabla
$columnWidths = array($availableWidth * 0.30, $availableWidth * 0.30, $availableWidth * 0.20, $availableWidth * 0.20); // Ancho de las columnas en porcentaje del ancho disponible

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEspacios = $espacio->EspaciosPorEspecialidad()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(143, 194, 187);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, 'Especialidad', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre del Espacio', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Capacidad', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[3], 10, 'Tipo de Espacio', 1, 1, 'C', 1);

    // Se establece un color de relleno para los datos.
    $pdf->setFillColor(200, 231, 226);
    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataEspacios as $rowEspacio) {
        // Se imprimen las celdas con los datos de espacios.
        $pdf->Cell($columnWidths[0], 10, $pdf->encodeString($rowEspacio['nombre_especialidad']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, $pdf->encodeString($rowEspacio['nombre_espacio']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, $rowEspacio['capacidad_personas'], 1, 0, 'C');
        $pdf->Cell($columnWidths[3], 10, $pdf->encodeString($rowEspacio['tipo_espacio']), 1, 1, 'L');
    }
} else {
    $pdf->Cell(0, 10, $pdf->encodeString('No hay espacios para mostrar en esta especialidad'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'espacios_por_especialidad.pdf');
?>
