<?php
require_once('../helpers/validator.php');
require_once('../models/handler/usuario_handler.php');

class UsuarioData extends UsuarioHandler
{
    private $data_error = null;

    public function setCorreo($value)
    {
        if (Validator::validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            $this->data_error = 'Correo electrónico inválido';
            return false;
        }
    }

    public function setContrasena($value)
    {
        if (Validator::validatePassword($value)) {
            $this->contrasena = $value;
            return true;
        } else {
            $this->data_error = 'Contraseña inválida';
            return false;
        }
    }

    public function setCargo($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cargo = $value;
            return true;
        } else {
            $this->data_error = 'Cargo inválido';
            return false;
        }
    }

    public function setInstitucion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->institucion = $value;
            return true;
        } else {
            $this->data_error = 'Institución inválida';
            return false;
        }
    }

    public function getLastId()
    {
        $sql = 'SELECT MAX(id_usuario) AS id_usuario FROM tb_usuarios';
        $params = null;
        $data = Database::getRow($sql, $params);
        return $data['id_usuario'];
    }

    public function getDataError()
    {
        return $this->data_error;
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(correo_electronico, contraseña, id_cargo, id_institucion)
                VALUES(?, ?, ?, ?)';
        $params = array($this->correo, password_hash($this->contrasena, PASSWORD_DEFAULT), $this->cargo, $this->institucion);
        return Database::executeRow($sql, $params);
    }

    public function checkCredentials()
    {
        $sql = 'SELECT id_usuario, correo_electronico, contraseña
                FROM tb_usuarios
                WHERE correo_electronico = ?';
        $params = array($this->correo);
        $data = Database::getRow($sql, $params);
        if ($data && password_verify($this->contrasena, $data['contraseña'])) {
            return $data;
        } else {
            return false;
        }
    }
}
?>
