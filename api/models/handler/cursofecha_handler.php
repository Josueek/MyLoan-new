<?php

require_once ('../helpers/database.php'); // Incluye el archivo de conexión a la base de datos
require_once ('../helpers/validator.php');

class CursoFechaHandler
{

    protected $id;
    protected $nombre;
    protected $fecha_inicio;
    protected $fecha_fin;
    protected $cantidad_personas;
    protected $grupo;
    protected $programa_formacion;
    protected $codigo;
    protected $empleado;
    protected $estado;


    public function obtenerFechasCurso()
    {
        $fechaActual = date('Y-m-d');
        $sql = 'SELECT fecha_inicio 
                FROM tb_cursos 
                WHERE fecha_inicio >= CURDATE() 
                ORDER BY fecha_inicio ASC 
                LIMIT 1';
        $result = Database::getRow($sql);
        $fechaCursoMasCercano = $result ? $result['fecha_inicio'] : null;

        return array('fechaActual' => $fechaActual, 'fechaCursoMasCercano' => $fechaCursoMasCercano);
    }
    public function CursosPorEstado()
    {
        // Definir la consulta SQL para obtener nombres de cursos agrupados por estado
        $sql = '
            SELECT estado, 
                   GROUP_CONCAT(nombre_curso SEPARATOR ", ") AS nombres_cursos
            FROM tb_cursos 
            GROUP BY estado
        ';
    
        // Ejecutar la consulta y retornar los resultados
        return Database::getRows($sql);
    }
    

public function CantidadCursosPorPrograma()
{
    // Definir la consulta SQL para obtener la cantidad de cursos por programa de formación FALTA EL SERVICES
    $sql = '
        SELECT programa_formacion, COUNT(*) AS cantidad_cursos
        FROM tb_cursos
        GROUP BY programa_formacion
    ';

    // Ejecutar la consulta y retornar los resultados FALTA EL SERVICES
    return Database::getRows($sql);
}
 
public function getCantidadCursosUltimos12Meses()
{
    $sql = '
        SELECT 
            DATE_FORMAT(fecha_inicio, "%Y-%m") AS mes_anio, 
            COUNT(*) AS cantidad_cursos
        FROM 
            tb_cursos
        WHERE 
            fecha_inicio >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY 
            DATE_FORMAT(fecha_inicio, "%Y-%m")
        ORDER BY 
            mes_anio
        LIMIT 0, 12
    ';
    
    // Ejecutar la consulta y obtener los resultados
    $result = Database::getRows($sql);
    
    // Crear un array para los nombres de los meses en español FALTA EL SERVICES
    $meses = array(
        '01' => 'Enero',
        '02' => 'Febrero',
        '03' => 'Marzo',
        '04' => 'Abril',
        '05' => 'Mayo',
        '06' => 'Junio',
        '07' => 'Julio',
        '08' => 'Agosto',
        '09' => 'Septiembre',
        '10' => 'Octubre',
        '11' => 'Noviembre',
        '12' => 'Diciembre'
    );
    
    // Convertir los datos de mes_año a nombres de meses en español
    foreach ($result as &$row) {
        list($anio, $mes) = explode('-', $row['mes_anio']);
        $row['mes_anio'] = $meses[$mes] . ' ' . $anio;
    }
    
    return $result;
}

};

// Crear una instancia de CursoHandler y obtener las fechas
$CursoFechaHandler = new CursoFechaHandler();
$fechas = $CursoFechaHandler->obtenerFechasCurso();

// Enviar la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($fechas);