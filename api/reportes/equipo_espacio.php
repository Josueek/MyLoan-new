<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../../models/handler/equipo_handler.php');

// Obtener el parámetro id_espacio de la solicitud
$id_espacio = isset($_GET['id_espacio']) ? $_GET['id_espacio'] : 0;

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Equipo por espacio');
// Se instancia el modelo EquipoHandler para obtener los datos.
$equipo = new EquipoHandler; 

// Definir el ancho de la página en mm.
$pageWidth = $pdf->GetPageWidth();
$columnWidths = array($pageWidth * 0.25, $pageWidth * 0.25, $pageWidth * 0.25, $pageWidth * 0.25); // Ajusta el ancho de las columnas

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEquipos = $equipo->equipoEspacio($id_espacio)) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(143, 194, 187);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, 'ID Equipo', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Descripción', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[3], 10, 'Cantidad', 1, 1, 'C', 1);

    // Se establece un color de relleno para los datos.
    $pdf->setFillColor(252, 190, 45);
    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataEquipos as $rowEquipo) {
        // Se imprimen las celdas con los datos de equipos.
        $pdf->Cell($columnWidths[0], 10, $pdf->encodeString($rowEquipo['id_equipo']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, $pdf->encodeString($rowEquipo['nombre']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, $pdf->encodeString($rowEquipo['descripcion']), 1, 0, 'L');
        $pdf->Cell($columnWidths[3], 10, $pdf->encodeString($rowEquipo['cantidad']), 1, 1, 'L');
    }
} else {
    $pdf->Cell(0, 10, $pdf->encodeString('No hay equipos para mostrar en este espacio'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'equipos_por_espacio.pdf');
