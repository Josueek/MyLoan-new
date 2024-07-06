<?php
// Incluye el archivo de conexión a la base de datos
require_once ('../helpers/database.php');

class CargoHandler
{
    protected $id = null; // Propiedad protegida para almacenar el ID del cargo
    protected $cargo = null; // Propiedad protegida para almacenar el nombre del cargo

    // Método para asignar el ID del cargo
    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id; // Asigna el ID si es válido
            return true;
        } else {
            return false; // Retorna false si el ID no es válido
        }
    }

    // Método para leer un cargo específico por ID por medio de la consulta SQL
    public function readOne()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM tb_cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params); // Ejecuta la consulta y retorna el resultado
    }


    // Método para asignar el nombre del cargo y valida del nombre del cargo que sea
    public function setCargo($cargo)
    {
        if (Validator::validateAlphabetic($cargo)) {
            $this->cargo = $cargo;
            return true;
        } else {
            return false;
        }
    }

    // Método para crear un nuevo cargo
    public function createRow()
    {
        $sql = 'INSERT INTO tb_cargos(nombre_cargo) VALUES(?)';
        $params = array($this->cargo);
        return Database::executeRow($sql, $params);
    }

    // Método para leer los datos de la tabla de tb_cargos
    public function readAll()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM tb_cargos ORDER BY id_cargo';
        return Database::getRows($sql);
    }

    //Actualizar los datos de la tabla tb_cargos
    public function updateRow()
    {
        $sql = 'UPDATE tb_cargos SET nombre_cargo = ? WHERE id_cargo = ?';
        $params = array($this->cargo, $this->id);
        return Database::executeRow($sql, $params);
    }

    //Eliminar datos 
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>