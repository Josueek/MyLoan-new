<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../helpers/report.php');
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../models/handler/curso_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report('P', 'mm', 'A4');

// Añadir la primera página para el texto explicativo y el logo
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Texto explicativo
$pdf->Cell(0, 10, 'Reporte de Cursos', 0, 1, 'C');
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 12);

// Establecer el texto en UTF-8
$pdf->MultiCell(0, 10, utf8_decode('Este documento presenta un reporte detallado de los cursos ofrecidos. Cada curso está descrito en una página separada con información clave como fechas, cantidad de personas, grupo, programa de formación, estado y nombre del empleado a cargo. Por favor, consulte cada página para los detalles completos de cada curso.'));

// Añadir un espacio antes de comenzar con los cursos
$pdf->Ln(20);

// Se instancia el modelo CursoHandler para obtener los datos.
$curso = new CursoHandler;

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataCursos = $curso->obtenerReporteCursos()) {
    foreach ($dataCursos as $rowCurso) {
        // Añadir una nueva página para cada curso
        $pdf->AddPage();
        $pdf->setFillColor(252, 190, 45);
        // Se establece la fuente para los encabezados de la tabla.
        $pdf->SetFont('Arial', 'B', 12);

        // Imprimir el título del curso centrado
        $pdf->Cell(0, 10, utf8_decode('Curso: ' . $rowCurso['nombre_curso']), 0, 1, 'C');
        $pdf->Ln(10);

        // Imprimir encabezados de la tabla centrados
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->Cell(70, 10, utf8_decode('Campo'), 1, 0, 'C');
        $pdf->Cell(100, 10, utf8_decode('Valor'), 1, 1, 'C');

        // Imprimir los detalles del curso en formato tabla
        $pdf->SetFont('Arial', '', 11);
        $pdf->Cell(70, 10, utf8_decode('Nombre del Curso'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['nombre_curso']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Fecha Inicio'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['fecha_inicio']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Fecha Fin'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['fecha_fin']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Cantidad de Personas'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['cantidad_personas']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Grupo'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['grupo']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Programa de Formación'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['programa_formacion']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Código del Curso'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['codigo_curso']), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Estado'), 1);
        $pdf->Cell(100, 10, utf8_decode(($rowCurso['estado'] == 'en curso' ? 'En curso' : ($rowCurso['estado'] == 'finalizado' ? 'Finalizado' : ($rowCurso['estado'] == 'pendiente' ? 'Pendiente' : 'Denegado')))), 1, 1);
        
        $pdf->Cell(70, 10, utf8_decode('Nombre del Empleado'), 1);
        $pdf->Cell(100, 10, utf8_decode($rowCurso['nombre_empleado'] . ' ' . $rowCurso['apellido_empleado']), 1, 1);
    }
} else {
    $pdf->AddPage();
    $pdf->Cell(0, 10, utf8_decode('No hay cursos para mostrar'), 0, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'reporte_cursos.pdf');
?>
