<?php
require_once('../helpers/database.php');

class CargoHandler
{
    protected $id = null;
    protected $cargo = null;

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }

    public function readOne()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM tb_cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function setCargo($cargo)
    {
        if (Validator::validateAlphabetic($cargo)) {
            $this->cargo = $cargo;
            return true;
        } else {
            return false;
        }
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_cargos(nombre_cargo) VALUES(?)';
        $params = array($this->cargo);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM tb_cargos ORDER BY id_cargo';
        return Database::getRows($sql);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_cargos SET nombre_cargo = ? WHERE id_cargo = ?';
        $params = array($this->cargo, $this->id);
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
