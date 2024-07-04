<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');

class ObservacionHandler
{
    public function getAllObservaciones($buscar = '')
    {
        $sql = 'SELECT o.id_observacion, o.fecha_observacion, o.observacion, o.foto_observacion, o.tipo_observacion, o.tipo_prestamo, o.id_espacio, o.id_usuario, o.id_prestamo
                FROM tb_observaciones o
                WHERE o.observacion LIKE ?';
        $params = ["%$buscar%"];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron observaciones');
        }
    }

    public function addObservacion($params)
    {
        $sql = 'INSERT INTO tb_observaciones (fecha_observacion, observacion, foto_observacion, tipo_observacion, tipo_prestamo, id_espacio, id_usuario, id_prestamo) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getObservacionById($idObservacion)
    {
        $sql = 'SELECT * FROM tb_observaciones WHERE id_observacion = ?';
        $params = array($idObservacion);
        return Database::getRow($sql, $params);
    }

    public function updateObservacion($params)
    {
        $sql = 'UPDATE tb_observaciones 
                SET fecha_observacion = ?, observacion = ?, foto_observacion = ?, tipo_observacion = ?, tipo_prestamo = ?, id_espacio = ?, id_usuario = ?, id_prestamo = ? 
                WHERE id_observacion = ?';
        return Database::executeRow($sql, $params);
    }

    public function deleteObservacion($idObservacion)
    {
        $sql = 'DELETE FROM tb_observaciones WHERE id_observacion = ?';
        $params = array($idObservacion);
        return Database::executeRow($sql, $params);
    }
    public function getAllPrestamoOb()
    {
        $sql = 'SELECT id_datos_empleado, nombre_empleado FROM tb_datos_empleados';
        return Database::getRows($sql);
    }

    public function getAllEspecialidades()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad FROM tb_especialidades';
        return Database::getRows($sql);
    }

    public function getAllInstituciones()
    {
        $sql = 'SELECT id_institucion, nombre_institucion FROM tb_instituciones';
        return Database::getRows($sql);
    }
}
?>
