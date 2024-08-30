<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/curso_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report('P', 'mm', 'A4');

// Establecer márgenes de 15 mm en cada lado
$pdf->SetMargins(15, 15, 15); // Izquierda, Superior, Derecha
$pdf->startReport('Reporte de cursos registrados');
 

// Título centrado
$pdf->SetFont('Arial', 'B', 18);
$pdf->Cell(0, 10, 'Reporte de Cursos', 0, 1, 'C');

// Texto explicativo
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, utf8_decode('Este documento presenta un reporte detallado de los cursos ofrecidos. Cada curso está descrito en una página separada con información clave como fechas, cantidad de personas, grupo, programa de formación, estado y nombre del empleado a cargo. Por favor, consulte cada página para los detalles completos de cada curso.'));

// Espacio antes de comenzar con los cursos
$pdf->Ln(20);

// Se instancia el modelo CursoHandler para obtener los datos.
$curso = new CursoHandler;

// Verificación de existencia de datos
if ($dataCursos = $curso->obtenerReporteCursos()) {
    foreach ($dataCursos as $rowCurso) {
        // Añadir una nueva página para cada curso
        $pdf->AddPage();

        // Color de fondo para el título del curso
        $pdf->setFillColor(220, 220, 220);

        // Título del curso centrado y con color de fondo
        $pdf->SetFont('Arial', 'B', 16);
        $pdf->Cell(0, 12, utf8_decode('Curso: ' . $rowCurso['nombre_curso']), 0, 1, 'C', 1);
        $pdf->Ln(10);

        // Ajuste manual del ancho de las celdas (70 mm para campo, 100 mm para valor)
        $columnWidths = [70, 100];
        $rowHeight = 10;

        // Calcular el ancho total de la tabla
        $totalTableWidth = array_sum($columnWidths);

        // Obtener el ancho de la página y calcular el margen izquierdo para centrar la tabla
        $pageWidth = $pdf->GetPageWidth();
        $marginLeft = ($pageWidth - $totalTableWidth) / 2.7;

        // Establecer el margen izquierdo
        $pdf->SetX($marginLeft);

        // Encabezados de las celdas con color de fondo
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->setFillColor(252, 195, 45); // Color para los encabezados

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Campos'), 1, 0, 'C', 1);
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode('Datos'), 1, 1, 'C', 1);

        // Detalles del curso con ajuste manual de ancho y alto
        $pdf->SetFont('Arial', '', 12);
 
        // Se imprime cada fila del detalle del curso centrado
        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Nombre del Curso'), 1, 0, 'L'); // Centrando los datos de la columna Campos
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['nombre_curso']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Fecha de inicio'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['fecha_inicio']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Fecha de finalización'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['fecha_fin']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Cantidad de Personas'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['cantidad_personas']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Grupo cursante'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['grupo']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Programa de Formación'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['programa_formacion']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Código del Curso'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['codigo_curso']), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Estado del curso'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode(($rowCurso['estado'] == 'en curso' ? 'En curso' : ($rowCurso['estado'] == 'finalizado' ? 'Finalizado' : ($rowCurso['estado'] == 'pendiente' ? 'Pendiente' : 'Denegado')))), 1, 1, 'C');

        $pdf->Cell($columnWidths[0], $rowHeight, utf8_decode('Nombre del Empleado'), 1, 0, 'L');
        $pdf->Cell($columnWidths[1], $rowHeight, utf8_decode($rowCurso['nombre_empleado'] . ' ' . $rowCurso['apellido_empleado']), 1, 1, 'C');
    }
} else {
    // Página adicional en caso de no haber cursos
    $pdf->AddPage();
    $pdf->Cell(0, 10, utf8_decode('No hay cursos para mostrar'), 0, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'reporte_cursos.pdf');
?>