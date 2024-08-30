<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/inventario_herramienta_handler.php');

// Obtener la institución seleccionada desde la solicitud (GET)
$institucion = isset($_GET['institucion']) ? $_GET['institucion'] : '';

// Verifica si la institución está definida, de lo contrario muestra un mensaje de error
if ($institucion == '') {
    die('No se ha seleccionado una institución válida para el reporte.');
}

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Reporte de herramientas registradas por Institución');

// Se instancia el modelo HerramientasHandler para obtener los datos.
$herramientas = new InventarioHerramientaHandler;

// Obtener las herramientas según la institución seleccionada
$dataHerramientas = $herramientas->HerramientasPorInstitucion($institucion);

// Definir el ancho de la página en mm.
$pageWidth = $pdf->GetPageWidth();
$columnWidths = array(20, 60, 60, 20, 20); // Definimos anchos fijos para cada columna

// Calcular el ancho total de la tabla
$tableWidth = array_sum($columnWidths);
$leftMargin = ($pageWidth - $tableWidth) / 2;

// Establecer el margen izquierdo para centrar la tabla
$pdf->SetLeftMargin($leftMargin);
$pdf->SetX($leftMargin); // Ajustar la posición inicial de la tabla

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataHerramientas) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(252, 195, 45);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, utf8_decode('Código'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, utf8_decode('Descripción'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[3], 10, 'Stock', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[4], 10, 'En Uso', 1, 1, 'C', 1);

    // Se establece un color de relleno para los datos.
    $pdf->setFillColor(200, 231, 226);
    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataHerramientas as $rowHerramienta) {
        $pdf->Cell($columnWidths[0], 10, $pdf->encodeString($rowHerramienta['codigo_herramienta']), 1, 0, 'C');
        $pdf->Cell($columnWidths[1], 10, $pdf->encodeString($rowHerramienta['nombre_herramienta']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, $pdf->encodeString($rowHerramienta['descripcion']), 1, 0, 'C');
        $pdf->Cell($columnWidths[3], 10, $rowHerramienta['stock'], 1, 0, 'C');
        $pdf->Cell($columnWidths[4], 10, $rowHerramienta['en_uso'], 1, 1, 'C');
    }
} else {
    $pdf->Cell(0, 10, $pdf->encodeString('No hay herramientas para mostrar en esta institución'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'herramientas_por_institucion.pdf');
?>
