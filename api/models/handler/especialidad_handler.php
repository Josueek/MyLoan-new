<?php
require_once('../helpers/database.php');

class EspecialidadHandler
{
    protected $id = null;
    protected $nombre = null;

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($nombre)
    {
        if (Validator::validateAlphabetic($nombre)) {
            $this->nombre = $nombre;
            return true;
        } else {
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