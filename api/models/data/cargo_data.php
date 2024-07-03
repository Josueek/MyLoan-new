<?php
require_once('../helpers/validator.php');
require_once('../models/handler/cargo_handler.php');

class CargoData extends CargoHandler
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
        $sql = 'INSERT INTO tb_cargos(nombre_cargo) VALUES(?)';
        $params = array($this->nombre);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM tb_cargos ORDER BY id_cargo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM tb_cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_cargos SET nombre_cargo = ? WHERE id_cargo = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>