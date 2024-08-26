<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../../models/handler/empleado_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Empleados por Especialidad');
// Se instancia el modelo UsuarioHandler para obtener los datos.
$empleado = new EmpleadoHandler; 

// Definir el ancho de la página en mm.
$pageWidth = $pdf->GetPageWidth();
$columnWidths = array($pageWidth * 0.3, $pageWidth * 0.35, $pageWidth * 0.35); // Ancho de las columnas en porcentaje de la página

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEmpleados = $empleado->EmpleadosPorEspecialidad()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(143, 194, 187);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, 'Especialidad', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre del Empleado', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Apellido del Empleado', 1, 1, 'C', 1);

    // Se establece un color de relleno para los datos.
    $pdf->setFillColor(200, 231, 226);
    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataEmpleados as $rowEmpleado) {
        // Se imprimen las celdas con los datos de empleados.
        $pdf->Cell($columnWidths[0], 10, $pdf->encodeString($rowEmpleado['nombre_especialidad']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, $pdf->encodeString($rowEmpleado['nombre_empleado']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, $pdf->encodeString($rowEmpleado['apellido_empleado']), 1, 1, 'L');
    }
} else {
    $pdf->Cell(0, 10, $pdf->encodeString('No hay empleados para mostrar en esta especialidad'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'empleados_por_especialidad.pdf');
