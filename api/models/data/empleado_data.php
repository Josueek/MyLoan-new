<?php
require_once('../helpers/validator.php');
require_once('../models/handler/empleado_handler.php');

class EmpleadoData extends EmpleadoHandler
{
    private $data_error = null;
    private $estado_empleado = null;

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

    public function setApellidos($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->apellidos = $value;
            return true;
        } else {
            $this->data_error = 'Apellidos inválidos';
            return false;
        }
    }

    public function setTelefono($value)
    {
        if (Validator::validateString($value)) {
            $this->telefono = $value;
            return true;
        } else {
            $this->data_error = 'Teléfono inválido';
            return false;
        }
    }

    public function setImagen($value)
    {
        $this->imagen = $value;
    }

    public function setIdUsuario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            $this->data_error = 'ID de usuario inválido';
            return false;
        }
    }

    public function setEstado($value)
    {
        if ($value == 'Activo' || $value == 'Inactivo') {
            $this->estado_empleado = $value;
            return true;
        } else {
            $this->data_error = 'Estado inválido';
            return false;
        }
    }

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

    public function setContrasena($value)
    {
        if (Validator::validatePassword($value)) {
            $this->contrasena = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = 'Contraseña inválida';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->data_error;
    }

    public function checkExistingUsers()
    {
        $sql = 'SELECT COUNT(*) as total FROM tb_datos_empleados';
        $params = null;
        $data = Database::getRow($sql, $params);
        return $data['total'];
    }

    public function saveDetails()
    {
        $sql = 'INSERT INTO tb_datos_empleados(nombre_empleado, apellido_empleado, telefono, id_usuario, foto_empleado, estado_empleado)
                VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellidos, $this->telefono, $this->id_usuario, $this->imagen, $this->estado_empleado);
        return Database::executeRow($sql, $params);
    }

    public function checkStatus($id_usuario)
    {
        $sql = 'SELECT estado_empleado FROM tb_datos_empleados WHERE id_usuario = ?';
        $params = array($id_usuario);
        $data = Database::getRow($sql, $params);
        return $data && $data['estado_empleado'] === 'Activo';
    }

    public function getNombreEmpleado($id_usuario)
    {
        $sql = 'SELECT nombre_empleado FROM tb_datos_empleados WHERE id_usuario = ?';
        $params = array($id_usuario);
        $data = Database::getRow($sql, $params);
        return $data ? $data['nombre_empleado'] : null;
    }

    public function getProfile()
    {
        $sql = 'SELECT nombre_empleado AS nombre, apellido_empleado AS apellido, correo_electronico AS email, telefono, estado_empleado AS estado, id_institucion AS institucion, id_cargo AS cargo, foto_empleado AS imagen
                FROM tb_datos_empleados
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    public function updateProfile()
    {
        $sql = 'UPDATE tb_datos_empleados
                SET correo_electronico = ?, telefono = ?, estado_empleado = ?, id_institucion = ?, id_cargo = ?, foto_empleado = ?
                WHERE id_usuario = ?';
        $params = array($this->correo, $this->telefono, $this->estado, $this->institucion, $this->cargo, $this->imagen, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    public function updateProfileWithPassword()
    {
        $sql = 'UPDATE tb_datos_empleados
                SET correo_electronico = ?, telefono = ?, estado_empleado = ?, id_institucion = ?, id_cargo = ?, foto_empleado = ?, contraseña = ?
                WHERE id_usuario = ?';
        $params = array($this->correo, $this->telefono, $this->estado, $this->institucion, $this->cargo, $this->imagen, $this->contrasena, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }
}
?>
