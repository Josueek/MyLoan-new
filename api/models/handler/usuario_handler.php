<?php
require_once('../helpers/database.php');

class UsuarioHandler
{
    protected $id = null;
    protected $correo = null;
    protected $contrasena = null;
    protected $cargo = null;
    protected $institucion = null;


    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }
    
    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(correo_electronico, contraseña, id_cargo, id_institucion)
                VALUES(?, ?, ?, ?)';
        $params = array($this->correo, $this->contrasena, $this->cargo, $this->institucion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_usuario, correo_electronico, id_cargo, id_institucion
                FROM tb_usuarios
                ORDER BY id_usuario';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_usuario, correo_electronico, id_cargo, id_institucion
                FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_usuarios
                SET correo_electronico = ?, id_cargo = ?, id_institucion = ?
                WHERE id_usuario = ?';
        $params = array($this->correo, $this->cargo, $this->institucion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
