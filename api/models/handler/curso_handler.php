<?php

require_once('../helpers/database.php'); // Incluye el archivo de conexión a la base de datos
require_once('../helpers/validator.php');

class CursoHandler
{

    //Metodo que consulta los datos de la tabla de tb_Cursos y obtiene datos espscificos mediente
    //UN filtro
    public function getAllCursos($buscar = '')
    {
        $sql = 'SELECT c.id_curso, c.nombre_curso, c.fecha_inicio, c.fecha_fin, c.cantidad_personas, c.grupo, c.programa_formacion, c.codigo_curso, c.id_empleado, e.nombre_empleado, c.estado
                FROM tb_cursos c
                LEFT JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado
                WHERE c.nombre_curso LIKE ?';
        $params = ["%$buscar%"]; // Consulta SQL para obtener cursos con búsqueda
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }


    //Metodo para obtener los datos de empleados
    public function getAllEmpleados()
    {
        $sql = 'SELECT id_datos_empleado, nombre_empleado FROM tb_datos_empleados';
        return Database::getRows($sql);
    }

    //Metodo para agregar un nuevo curso
    public function addCurso($params)
    {
        $sql = 'INSERT INTO tb_cursos (nombre_curso, fecha_inicio, fecha_fin, cantidad_personas, grupo, programa_formacion, codigo_curso, id_empleado, estado) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }


    //Metodo para obtener los datos de un curso mediante el id
    public function getCursoById($idCurso)
    {
        $sql = 'SELECT * FROM tb_cursos WHERE id_curso = ?';
        $params = array($idCurso);
        return Database::getRow($sql, $params);
    }
    //Metodo para obtener los programas de formacion
    public function getPrograma()
    {
        $sql = 'SELECT Programa_formacion FROM tb_cursos;';
        return Database::getRows($sql);
    }
    //Metodo para obtener el estado de los cursos
    public function getEstadoCurso()
    {
        $sql = 'SELECT estado FROM tb_cursos;';
        return Database::getRows($sql);
    }

    //Actualizar los datos d la tabla cursos 
    public function updateCurso($params)
    {
        $sql = 'UPDATE tb_cursos 
                SET nombre_curso = ?, fecha_inicio = ?, fecha_fin = ?, cantidad_personas = ?, grupo = ?, programa_formacion = ?, codigo_curso = ?, id_empleado = ?, estado = ? 
                WHERE id_curso = ?';
        return Database::executeRow($sql, $params);
    }

    //Borrar datos de la tabla de cursos
    public function deleteCurso($idCurso)
    {
        $sql = 'DELETE FROM tb_cursos WHERE id_curso = ?';
        $params = array($idCurso);
        return Database::executeRow($sql, $params);
    }


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

    //RESPORTES
    public function obtenerReporteCursos()
    {
        // Definir la consulta SQL para obtener todos los cursos con el nombre del empleado
        $sql = '
        SELECT 
            c.nombre_curso, 
            c.fecha_inicio, 
            c.fecha_fin, 
            c.cantidad_personas, 
            c.grupo, 
            c.programa_formacion, 
            c.codigo_curso, 
            c.estado, 
            e.nombre_empleado, 
            e.apellido_empleado
        FROM 
            tb_cursos c
        JOIN 
            tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado
    ';

        // Ejecutar la consulta y retornar los resultados
        return Database::getRows($sql);
    }

    public function getEmpleadosConCursosActivosOFinalizados()
    {
        // Definir la consulta SQL para obtener empleados con cursos activos o finalizados
        $sql = '
        SELECT de.nombre_empleado, de.apellido_empleado, c.nombre_curso, 
               c.fecha_inicio, c.fecha_fin, c.estado
        FROM tb_datos_empleados de
        JOIN tb_cursos c ON de.id_datos_empleado = c.id_empleado
        WHERE c.estado IN ("en curso", "finalizado")
    ';

        // Ejecutar la consulta y retornar los resultados
        return Database::getRows($sql);
    }

    public function CursosUltimosMeses()
    {
        // Consulta para obtener la cantidad de cursos de los últimos 5 meses
        $sql = "
        SELECT
            DATE_FORMAT(c.fecha_inicio, '%M %Y') AS mes,
            COUNT(*) AS cantidad_cursos
        FROM
            tb_cursos c
        WHERE
            c.fecha_inicio >= DATE_FORMAT(CURRENT_DATE - INTERVAL 5 MONTH, '%Y-%m-01')
        GROUP BY
            DATE_FORMAT(c.fecha_inicio, '%Y-%m')
        ORDER BY
            c.fecha_inicio ASC;
    ";

        $cursos = Database::getRows($sql);

        if (count($cursos) > 0) {
            $incrementos = [];
            // Calcular los incrementos entre meses y los porcentajes de incremento
            for ($i = 1; $i < count($cursos); $i++) {
                $incremento = $cursos[$i]['cantidad_cursos'] - $cursos[$i - 1]['cantidad_cursos'];
                $porcentaje_incremento = ($cursos[$i - 1]['cantidad_cursos'] != 0) ? ($incremento / $cursos[$i - 1]['cantidad_cursos']) * 100 : 0;
                $incrementos[] = [
                    'mes' => $cursos[$i]['mes'],
                    'cantidad_cursos' => $cursos[$i]['cantidad_cursos'],
                    'incremento' => $incremento,
                    'porcentaje_incremento' => number_format($porcentaje_incremento, 2)
                ];
            }
            return $incrementos;
        } else {
            return [];
        }
    }


    public function cursosUltimosMesesConProyeccion()
    {
        // Consulta para obtener la cantidad de cursos de los últimos 5 meses
        $sql = "
        SELECT
            DATE_FORMAT(c.fecha_inicio, '%M %Y') AS mes,
            COUNT(*) AS cantidad_cursos
        FROM
            tb_cursos c
        WHERE
            c.fecha_inicio >= DATE_FORMAT(CURRENT_DATE - INTERVAL 5 MONTH, '%Y-%m-01')
        GROUP BY
            DATE_FORMAT(c.fecha_inicio, '%Y-%m')
        ORDER BY
            c.fecha_inicio ASC;
    ";

        $cursos = Database::getRows($sql);

        if (count($cursos) > 0) {
            $incrementos = [];
            $total_porcentaje_incremento = 0;

            // Calcular los incrementos entre meses y los porcentajes de incremento
            for ($i = 1; $i < count($cursos); $i++) {
                $incremento = $cursos[$i]['cantidad_cursos'] - $cursos[$i - 1]['cantidad_cursos'];
                $porcentaje_incremento = ($cursos[$i - 1]['cantidad_cursos'] != 0) ? ($incremento / $cursos[$i - 1]['cantidad_cursos']) * 100 : 0;
                $incrementos[] = [
                    'mes' => $cursos[$i]['mes'],
                    'cantidad_cursos' => $cursos[$i]['cantidad_cursos'],
                    'incremento' => $incremento,
                    'porcentaje_incremento' => number_format($porcentaje_incremento, 2)
                ];
                $total_porcentaje_incremento += $porcentaje_incremento;
            }

            // Calcular el promedio del incremento porcentual mensual
            $promedio_porcentaje_incremento = $total_porcentaje_incremento / 4; // Dividir entre 4 ya que tenemos 5 meses y 4 incrementos

            // Proyectar la cantidad de cursos para el sexto mes usando el promedio del porcentaje de incremento
            $cursos_mes_pasado = $cursos[count($cursos) - 1]['cantidad_cursos'];
            $proyeccion_incremento = ($promedio_porcentaje_incremento / 100) * $cursos_mes_pasado;
            $proyeccion_sexto_mes = $cursos_mes_pasado + $proyeccion_incremento;

            // Obtener el nombre del mes siguiente al último mes registrado
            $ultimo_mes = date('Y-m', strtotime(end($cursos)['mes']));
            $mes_siguiente = date('F Y', strtotime($ultimo_mes . ' +1 month'));

            // Formatear los datos de proyección
            $incrementos[] = [
                'mes' => $mes_siguiente,
                'cantidad_cursos' => round($proyeccion_sexto_mes),
                'incremento' => round($proyeccion_incremento),
                'porcentaje_incremento' => number_format($promedio_porcentaje_incremento, 2)
            ];

            return $incrementos;
        } else {
            return [];
        }
    }

    public function prestamosUltimosMesesConProyeccion()
    {
        // Consulta para obtener la cantidad de préstamos de los últimos 5 meses
        $sql = "
        SELECT
            DATE_FORMAT(p.fecha_prestamo, '%M %Y') AS mes,
            COUNT(*) AS cantidad_prestamos
        FROM
            tb_prestamos p
        WHERE
            p.fecha_prestamo >= DATE_FORMAT(CURRENT_DATE - INTERVAL 5 MONTH, '%Y-%m-01')
        GROUP BY
            DATE_FORMAT(p.fecha_prestamo, '%Y-%m')
        ORDER BY
            p.fecha_prestamo ASC;
    ";

        $prestamos = Database::getRows($sql);

        if (count($prestamos) > 0) {
            $incrementos = [];
            $total_porcentaje_incremento = 0;

            // Calcular los incrementos entre meses y los porcentajes de incremento
            for ($i = 1; $i < count($prestamos); $i++) {
                $incremento = $prestamos[$i]['cantidad_prestamos'] - $prestamos[$i - 1]['cantidad_prestamos'];
                $porcentaje_incremento = ($prestamos[$i - 1]['cantidad_prestamos'] != 0) ? ($incremento / $prestamos[$i - 1]['cantidad_prestamos']) * 100 : 0;
                $incrementos[] = [
                    'mes' => $prestamos[$i]['mes'],
                    'cantidad_prestamos' => $prestamos[$i]['cantidad_prestamos'],
                    'incremento' => $incremento,
                    'porcentaje_incremento' => number_format($porcentaje_incremento, 2)
                ];
                $total_porcentaje_incremento += $porcentaje_incremento;
            }

            // Calcular el promedio del incremento porcentual mensual
            $promedio_porcentaje_incremento = $total_porcentaje_incremento / 4; // Dividir entre 4 ya que tenemos 5 meses y 4 incrementos

            // Proyectar la cantidad de préstamos para el sexto mes usando el promedio del porcentaje de incremento
            $prestamos_mes_pasado = $prestamos[count($prestamos) - 1]['cantidad_prestamos'];
            $proyeccion_incremento = ($promedio_porcentaje_incremento / 100) * $prestamos_mes_pasado;
            $proyeccion_sexto_mes = $prestamos_mes_pasado + $proyeccion_incremento;

            // Obtener el nombre del mes siguiente al último mes registrado
            $ultimo_mes = date('Y-m', strtotime(end($prestamos)['mes']));
            $mes_siguiente = date('F Y', strtotime($ultimo_mes . ' +1 month'));

            // Formatear los datos de proyección
            $incrementos[] = [
                'mes' => $mes_siguiente,
                'cantidad_prestamos' => round($proyeccion_sexto_mes),
                'incremento' => round($proyeccion_incremento),
                'porcentaje_incremento' => number_format($promedio_porcentaje_incremento, 2)
            ];

            return $incrementos;
        } else {
            return [];
        }
    }






}
;