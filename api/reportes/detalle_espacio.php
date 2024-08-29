<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/espacio_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report('P', 'mm', 'A4');

// Añadir la primera página para el texto explicativo y el logo
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Texto explicativo
$pdf->Cell(0, 10, 'Reporte de Espacios y Especialidades', 0, 1, 'C');
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);

// Establecer el texto en UTF-8
$pdf->MultiCell(0, 10, utf8_decode('Este documento presenta un reporte detallado de los espacios disponibles junto con sus especialidades y el nombre del empleado encargado. Cada espacio está descrito con su capacidad, tipo, y especialidad asociada. Por favor, consulte cada sección para los detalles completos de cada espacio.'));

// Añadir un espacio antes de comenzar con los detalles
$pdf->Ln(20);

// Se instancia el modelo EspacioHandler para obtener los datos.
$espacio = new EspacioHandler;

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataEspacios = $espacio->obtenerDetalleEspacios()) {
    foreach ($dataEspacios as $rowEspacio) {
        // Añadir una nueva página para cada espacio
        $pdf->AddPage();

        // Se establece la fuente para los encabezados de la tabla.
        $pdf->SetFont('Arial', 'B', 12);

        // Imprimir el título del espacio centrado
        $pdf->Cell(0, 10, utf8_decode('Espacio: ' . $rowEspacio['nombre_espacio']), 0, 1, 'C');
        $pdf->Ln(10);

        // Imprimir encabezados de la tabla centrados
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->Cell(70, 10, utf8_decode('Campo'), 1, 0, 'C');
        $pdf->Cell(100, 10, utf8_decode('Valor'), 1, 1, 'C');

        // Imprimir los detalles del espacio en formato tabla
        $pdf->SetFont('Arial', '', 11);
        $pdf->Cell(70, 10, utf8_decode('Nombre del Espacio'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowEspacio['nombre_espacio']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Capacidad de Personas'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowEspacio['capacidad_personas']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Tipo de Espacio'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowEspacio['tipo_espacio']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Especialidad'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowEspacio['nombre_especialidad']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Nombre del Empleado'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowEspacio['nombre_empleado'] . ' ' . $rowEspacio['apellido_empleado']), 1, 1);
    }
} else {
    $pdf->AddPage();
    $pdf->Cell(0, 10, utf8_decode('No hay espacios para mostrar'), 0, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'reporte_espacios.pdf');
?>
