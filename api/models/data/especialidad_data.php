<?php
require_once('../helpers/validator.php');
require_once('../models/handler/especialidad_handler.php');

class EspecialidadData extends EspecialidadHandler
{
    private $data_error = null;

    public function setNombre($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'Nombre inválido';
            return false;
        }
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_especialidades(nombre_especialidad) VALUES(?)';
        $params = array($this->nombre);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad FROM tb_especialidades ORDER BY id_especialidad';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad FROM tb_especialidades WHERE id_especialidad = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_especialidades SET nombre_especialidad = ? WHERE id_especialidad = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_especialidades WHERE id_especialidad = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>