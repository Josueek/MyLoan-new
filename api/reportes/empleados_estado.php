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

// Añadir una página antes de cualquier otra operación
$pdf->AddPage();

// Configurar el ancho y alto de la página
$pageWidth = $pdf->GetPageWidth();
$pageHeight = $pdf->GetPageHeight();

// Añadir imagen de fondo en la página actual
$pdf->Image('C:/xampp/htdocs/MyLoan-new/api/images/categorias/Fondo de reportes.png', 0, 0, $pageWidth, $pageHeight, 'PNG', '', '', true, 300, '', false, false, 0, 'C', false, false);

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Empleados por Estado');

// Se instancia el modelo EmpleadoHandler para obtener los datos.
$empleado = new EmpleadoHandler; 

// Obtener los empleados según el estado seleccionado
$dataEmpleados = $empleado->EmpleadosPorEstado($estado);

// Definir el ancho de la página en mm.
$columnWidths = array($pageWidth * 0.30, $pageWidth * 0.30, $pageWidth * 0.30); // Ancho de las columnas en porcentaje de la página

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEmpleados) {
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
    $pdf->Cell(0, 10, $pdf->encodeString('No hay empleados para mostrar en este estado'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'empleados_por_estado.pdf');
?>
