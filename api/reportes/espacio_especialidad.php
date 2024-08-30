<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/espacio_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Establecer márgenes de 15 mm en cada lado
$pdf->SetMargins(15, 15, 15);

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Reporte de espacios registrados por especialidad');

// Se instancia el modelo EspacioHandler para obtener los datos.
$espacio = new EspacioHandler;

// Definir el ancho de la página restando los márgenes (15 mm a cada lado).
$pageWidth = $pdf->GetPageWidth() - 30; // 30 mm de márgenes (15 mm a cada lado)

// Ajustar el ancho de las columnas manualmente.
$columnWidths = array(55, 60, 30, 40); // Puedes ajustar estos valores según el contenido

// Verificar si existen registros para mostrar, de lo contrario imprimir un mensaje.
if ($dataEspacios = $espacio->EspaciosPorEspecialidad()) {
    // Establecer un color de relleno para los encabezados.
    $pdf->setFillColor(252, 195, 45);
    // Establecer la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Imprimir los encabezados con una altura de celda de 10 mm.
    $pdf->Cell($columnWidths[0], 10, 'Especialidad', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre del Espacio', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Capacidad', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[3], 10, 'Tipo de Espacio', 1, 1, 'C', 1);

    // Establecer un color de relleno para los datos.
    $pdf->setFillColor(200, 231, 226);
    // Establecer la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Recorrer los registros fila por fila.
    foreach ($dataEspacios as $rowEspacio) {
        // Imprimir las celdas con los datos de espacios.
        $pdf->Cell($columnWidths[0], 10, $pdf->encodeString($rowEspacio['nombre_especialidad']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, $pdf->encodeString($rowEspacio['nombre_espacio']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, $rowEspacio['capacidad_personas'], 1, 0, 'C');
        $pdf->Cell($columnWidths[3], 10, $pdf->encodeString($rowEspacio['tipo_espacio']), 1, 1, 'L');
    }
} else {
    // Si no se encuentran espacios, mostrar un mensaje.
    $pdf->Cell(0, 10, $pdf->encodeString('No hay espacios para mostrar en esta especialidad'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'espacios_por_especialidad.pdf');
?>
