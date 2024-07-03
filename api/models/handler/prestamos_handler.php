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
        $sql = 'SELECT p.id_prestamo, p.fecha_solicitud, c.programa_formacion, p.estado_prestamo, p.observacion, c.nombre_curso, e.nombre_empleado
                FROM tb_prestamos p
                INNER JOIN tb_cursos c ON p.id_curso = c.id_curso
                INNER JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_ empleado
                ORDER BY p.id_prestamo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT p.id_prestamo, p.fecha_solicitud, c.programa_formacion, p.estado_prestamo, p.observacion, c.nombre_curso, e.nombre_empleado
                FROM tb_prestamos p
                INNER JOIN tb_cursos c ON p.id_curso = c.id_curso
                INNER JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado
                WHERE p.id_prestamo = ?';
        $params = array($this->id_prestamo);
        return Database::getRow($sql, $params);
    }
}

