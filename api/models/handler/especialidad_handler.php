<?php
require_once ('../helpers/database.php');

class EspecialidadHandler
{
    /**
     * Clase EspecialidadHandler
     * Esta clase maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las especialidades en la base de datos.
     * Las operaciones incluyen la configuración de ID y nombre de la especialidad, la creación de una nueva especialidad,
     * la lectura de todas las especialidades, la lectura de una especialidad específica por su ID, la actualización de una especialidad,
     * y la eliminación de una especialidad. Utiliza una conexión a la base de datos a través de la clase Database.
     */

     //Variables para almacenar los datos
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