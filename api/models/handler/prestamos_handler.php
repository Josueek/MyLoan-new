<?php
require_once('../helpers/database.php');

class prestamos_handler
{
    protected $id_prestamo = null;
    protected $nombre_curso = null;
    protected $fecha_solicitud = null;
    protected $programa_formacion = null;
    protected $estado_prestamo = null;
    protected $observacion = null;
    protected $nombre_empleado = null; 

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id_prestamo = $id;
            return true;
        } else {
            return false;
        }
    }

    public function readAll()
    {
        $sql = 'SELECT p.id_prestamo, p.fecha_solicitud, p.programa_formacion, p.estado_prestamo, p.observacion, c.nombre_curso, e.nombre_empleado
                FROM tb_prestamos p
                LEFT JOIN tb_cursos c ON p.id_curso = c.id_curso
                LEFT JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado
                ORDER BY p.id_prestamo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT p.id_prestamo, p.fecha_solicitud, p.programa_formacion, p.estado_prestamo, p.observacion, c.nombre_curso, e.nombre_empleado
                FROM tb_prestamos p
                LEFT JOIN tb_cursos c ON p.id_curso = c.id_curso
                LEFT JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado
                WHERE p.id_prestamo = ?';
        $params = array($this->id_prestamo);
        return Database::getRow($sql, $params);
    }

    public function prestamosUltimosMesesConProyeccion() {
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
    
};