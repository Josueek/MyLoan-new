<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/empleado_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
$pdf->AddPage(); // Añadir una página al iniciar el reporte

// Añadir la primera página para el texto explicativo y el logo
$pdf->SetFont('Arial', 'B', 16);

// Texto explicativo
$pdf->Cell(0, 10, utf8_decode('Reporte de Empleados por Especialidad'), 0, 1, 'C');
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);

// Establecer el texto en UTF-8
$pdf->MultiCell(0, 10, utf8_decode('Este documento presenta un reporte detallado de los empleados organizados por especialidad. Cada sección muestra la especialidad y los empleados asociados con su nombre y apellido. Por favor, consulte la tabla para obtener los detalles completos de cada empleado y su especialidad.'));

// Añadir un espacio antes de comenzar con los datos
$pdf->Ln(20);
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Reporte de empleados asignados por especialidad');
// Se instancia el modelo UsuarioHandler para obtener los datos.
$empleado = new EmpleadoHandler; 

// Definir el ancho de la página en mm.
$pageWidth = $pdf->GetPageWidth();
$columnWidths = array($pageWidth * 0.30, $pageWidth * 0.30, $pageWidth * 0.30); // Ancho de las columnas en porcentaje de la página

// Se instancia el modelo EmpleadoHandler para obtener los datos.
$empleado = new EmpleadoHandler; 

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEmpleados = $empleado->EmpleadosPorEspecialidad()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(252, 190, 45);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 10);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, utf8_decode('Especialidad'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, utf8_decode('Nombre del Empleado'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, utf8_decode('Apellido del Empleado'), 1, 1, 'C', 1);
    $pdf->Cell($columnWidths[0], 10, 'Especialidad', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre del empleado', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Apellido del empleado', 1, 1, 'C', 1);

    // Se establece un color de relleno para los datos.
    $pdf->setFillColor(200, 231, 226);
    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataEmpleados as $rowEmpleado) {
        // Se imprimen las celdas con los datos de empleados.
        $pdf->Cell($columnWidths[0], 10, utf8_decode($rowEmpleado['nombre_especialidad']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, utf8_decode($rowEmpleado['nombre_empleado']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, utf8_decode($rowEmpleado['apellido_empleado']), 1, 1, 'L');
    }
} else {
    $pdf->Cell(0, 10, utf8_decode('No hay empleados para mostrar en esta especialidad'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'empleados_por_especialidad.pdf');
?>
