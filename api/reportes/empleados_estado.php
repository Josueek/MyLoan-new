<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/empleado_handler.php');

// Obtener el estado del empleado desde la solicitud (GET)
$estado = isset($_GET['estado']) ? $_GET['estado'] : '';

// Verifica si el estado está definido, de lo contrario muestra un mensaje de error
if ($estado == '') {
    die('No se ha seleccionado un estado válido para el reporte.');
}

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Configurar los márgenes (izquierdo, superior, derecho)
$pdf->SetMargins(15, 15, 15);

// Iniciar el reporte con el encabezado del documento.
$pdf->startReport('Reporte de empleados acorde al estado');

// Se instancia el modelo EmpleadoHandler para obtener los datos.
$empleado = new EmpleadoHandler; 

// Obtener los empleados según el estado seleccionado
$dataEmpleados = $empleado->EmpleadosPorEstado($estado);

// Definir el ancho de la página en mm, teniendo en cuenta los márgenes
$pageWidth = $pdf->GetPageWidth() - 30; // Restar los márgenes izquierdo y derecho
$columnWidths = array($pageWidth * 0.30, $pageWidth * 0.30, $pageWidth * 0.30); // Ancho de las columnas en porcentaje del ancho disponible
$totalWidth = array_sum($columnWidths); // Ancho total de la tabla

// Verifica si existen registros para mostrar, de lo contrario imprime un mensaje.
if ($dataEmpleados) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(252, 195, 45);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 12);

    // Calcular la posición X para centrar la tabla
    $x = ($pdf->GetPageWidth() - $totalWidth) / 2;
    $pdf->SetX($x);

    // Imprimir los encabezados
    $pdf->Cell($columnWidths[0], 10, 'Especialidad asignada', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[1], 10, 'Nombre del empleado', 1, 0, 'C', 1);
    $pdf->Cell($columnWidths[2], 10, 'Apellido del empleado', 1, 1, 'C', 1);

    // Se establece un color de relleno para los datos.
    $pdf->setFillColor(143, 194, 187);
    // Se establece la fuente para los datos.
    $pdf->setFont('Arial', '', 11);

    // Recorren los registros fila por fila.
    foreach ($dataEmpleados as $rowEmpleado) {
        // Mover el cursor a la posición X para centrar los datos
        $pdf->SetX($x);
        // Se imprimen las celdas con los datos de empleados.
        $pdf->Cell($columnWidths[0], 10, $pdf->encodeString($rowEmpleado['nombre_especialidad']), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], 10, $pdf->encodeString($rowEmpleado['nombre_empleado']), 1, 0, 'C');
        $pdf->Cell($columnWidths[2], 10, $pdf->encodeString($rowEmpleado['apellido_empleado']), 1, 1, 'C');
    }
} else {
    // Mover el cursor a la posición X para centrar el mensaje
    $pdf->SetX($x);
    $pdf->Cell(0, 10, $pdf->encodeString('No hay empleados para mostrar en este estado'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'empleados_por_estado.pdf');
?>
