<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/curso_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
$pdf->AddPage(); // Añadir una página al iniciar el reporte

// Añadir la primera página para el texto explicativo y el logo
$pdf->SetFont('Arial', 'B', 16);

// Texto explicativo
$pdf->Cell(0, 10, utf8_decode('Reporte de Empleados con Cursos Activos o Finalizados'), 0, 1, 'C');
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);

// Establecer el texto en UTF-8
$pdf->MultiCell(0, 10, utf8_decode('Este documento presenta un reporte detallado de los empleados que están inscritos en cursos activos o finalizados. La tabla muestra el nombre y apellido del empleado, el nombre del curso, las fechas de inicio y fin del curso, y el estado actual del curso. Por favor, consulte la tabla para obtener los detalles completos de cada empleado y su curso.'));

// Añadir un espacio antes de comenzar con los datos
$pdf->Ln(20);

// Definir el ancho de la página en mm.
$pageWidth = $pdf->GetPageWidth();
$columnWidths = array(
    $pageWidth * 0.12, // Ancho para la columna de nombre
    $pageWidth * 0.12, // Ancho para la columna de apellido
    $pageWidth * 0.24, // Ancho para la columna de curso
    $pageWidth * 0.12, // Ancho para la columna de fecha inicio
    $pageWidth * 0.12, // Ancho para la columna de fecha fin
    $pageWidth * 0.12  // Ancho para la columna de estado
);

// Se instancia el modelo CursoHandler para obtener los datos.
$empleado = new CursoHandler; 

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEmpleados = $empleado->getEmpleadosConCursosActivosOFinalizados()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(143, 194, 187);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, utf8_decode('Nombre'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, utf8_decode('Apellido'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, utf8_decode('Curso'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[3], 10, utf8_decode('Fecha Inicio'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[4], 10, utf8_decode('Fecha Fin'), 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[5], 10, utf8_decode('Estado'), 1, 1, 'C', 1);

    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataEmpleados as $rowEmpleado) {
        $estado = ($rowEmpleado['estado'] == 'en curso') ? 'En curso' : 'Finalizado';
        
        // Se imprimen las celdas con los datos.
        $pdf->Cell($columnWidths[0], 10, utf8_decode($rowEmpleado['nombre_empleado']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, utf8_decode($rowEmpleado['apellido_empleado']), 1, 0, 'L');
        $pdf->Cell($columnWidths[2], 10, utf8_decode($rowEmpleado['nombre_curso']), 1, 0, 'L');
        $pdf->Cell($columnWidths[3], 10, utf8_decode($rowEmpleado['fecha_inicio']), 1, 0, 'L');
        $pdf->Cell($columnWidths[4], 10, utf8_decode($rowEmpleado['fecha_fin']), 1, 0, 'L');
        $pdf->Cell($columnWidths[5], 10, utf8_decode($estado), 1, 1, 'L');
    }
} else {
    $pdf->Cell(0, 10, utf8_decode('No hay empleados con cursos activos o finalizados para mostrar'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'empleados_con_cursos.pdf');
?>
