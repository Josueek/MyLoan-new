<?php
require_once('../helpers/database.php');

class PrestamosHandler
{
    protected $id_prestamo = null;
    protected $fecha_solicitud = null;
    protected $programa_formacion = null;
    protected $estado_prestamo = null;
    protected $observacion = null;
    protected $id_curso = null;  // Agregado
    protected $id_usuario = null;  // Agregado

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id_prestamo = $id;
            return true;
        }
        return false;
    }

    public function setFechaSolicitud($fecha)
    {
        $this->fecha_solicitud = $fecha;
    }

    public function setProgramaFormacion($programa)
    {
        $this->programa_formacion = $programa;
    }

    public function setEstadoPrestamo($estado)
    {
        $this->estado_prestamo = $estado;
    }

    public function setObservacion($observacion)
    {
        $this->observacion = $observacion;
    }

    public function setIdCurso($idCurso)
    {
        if (Validator::validateNaturalNumber($idCurso)) {
            $this->id_curso = $idCurso;
            return true;
        }
        return false;
    }

    public function setIdUsuario($idUsuario)
    {
        if (Validator::validateNaturalNumber($idUsuario)) {
            $this->id_usuario = $idUsuario;
            return true;
        }
        return false;
    }

    public function getAllPrestamos($buscar = '', $filtrar = '')
    {
        // Creamos la base de la consulta SQL
        $sql = 'SELECT p.id_prestamo, p.fecha_solicitud, p.programa_formacion, p.estado_prestamo, p.observacion, c.nombre_curso, e.nombre_empleado
                FROM tb_prestamos p
                LEFT JOIN tb_cursos c ON p.id_curso = c.id_curso
                LEFT JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado';
    
        // Si se proporciona un término de búsqueda, se agrega a la consulta
        if ($buscar != '') {
            $sql .= ' WHERE p.programa_formacion LIKE ? OR c.nombre_curso LIKE ?';
            $params = array("%$buscar%", "%$buscar%");
        } else {
            $params = array();
        }
    
        // Si se proporciona un filtro, se agrega a la consulta
        if ($filtrar != '') {
            if ($buscar != '') {
                $sql .= ' AND p.estado_prestamo = ?';
            } else {
                $sql .= ' WHERE p.estado_prestamo = ?';
            }
            $params[] = $filtrar;
        }
    
        $sql .= ' ORDER BY p.id_prestamo';
    
        // Devolvemos el resultado de la consulta
        return Database::getRows($sql, $params);
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

    public function createPrestamo()
    {
        // El estado del préstamo se asigna como 'En Espera'
        $sql = 'INSERT INTO tb_prestamos (fecha_solicitud, programa_formacion, estado_prestamo, observacion, id_curso, id_usuario) 
                VALUES (?, ?, ?, ?, ?, ?)';
        $params = array(
            $this->fecha_solicitud,
            $this->programa_formacion,
            'En Espera',  // Siempre asignamos 'En Espera'
            $this->observacion,
            $this->id_curso,
            $this->id_usuario
        );
        return Database::executeRow($sql, $params);
    }
    
}
