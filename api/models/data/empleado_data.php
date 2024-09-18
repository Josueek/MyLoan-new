<?php
require_once ('../helpers/validator.php');
require_once ('../models/handler/empleado_handler.php');

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

    //Datos del empleado
    public function getNombreEmpleado($id_usuario)
    {
        $sql = 'SELECT nombre_empleado FROM tb_datos_empleados WHERE id_usuario = ?';
        $params = array($id_usuario);
        $data = Database::getRow($sql, $params);
        return $data ? $data['nombre_empleado'] : null;
    }
    // Obtener la especialidad del empleado
    public function getEspecialidad($id_usuario)
    {
        $sql = 'SELECT id_especialidad
                 FROM tb_instructores
                 WHERE id_usuario = ?';
        $params = array($id_usuario);
        $data = Database::getRow($sql, $params);
        return $data ? $data['id_especialidad'] : null;
    }

    // Obtener el cargo del empleado
    public function getCargo($id_usuario)
    {
        $sql = 'SELECT id_cargo 
                 FROM tb_usuarios
                 WHERE id_usuario = ?';
        $params = array($id_usuario);
        $data = Database::getRow($sql, $params);
        return $data ? $data['id_cargo'] : null;
    }
    // Obtener la institución del empleado
    public function getInstitucion($id_usuario)
    {
        $sql = 'SELECT id_institucion 
                    FROM tb_usuarios
                    WHERE id_usuario = ?';
        $params = array($id_usuario);
        $data = Database::getRow($sql, $params);
        return $data ? $data['id_institucion'] : null;
    }


    public function getProfile()
    {
        $sql = 'SELECT de.id_datos_empleado, de.nombre_empleado AS nombre, de.apellido_empleado AS apellido, u.correo_electronico AS email, de.telefono, de.estado_empleado AS estado,
                i.nombre_institucion AS institucion, c.nombre_cargo AS cargo, de.foto_empleado AS imagen,
                er.nombre_especialidad AS especialidad
                FROM tb_datos_empleados de
                INNER JOIN tb_usuarios u ON de.id_usuario = u.id_usuario
                INNER JOIN tb_instituciones i ON u.id_institucion = i.id_institucion
                INNER JOIN tb_cargos c ON u.id_cargo = c.id_cargo
                LEFT JOIN tb_especialidades er ON de.id_especialidad = er.id_especialidad
                WHERE de.id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    // Actualiza el perfil sin cambiar la contraseña.
    public function updateProfile($filename = null)
    {
        // Verifica si se proporcionó una imagen y ajusta la consulta SQL.
        $sql = 'UPDATE tb_datos_empleados SET telefono = ?' . ($filename ? ', foto_empleado = ?' : '') . ' WHERE id_usuario = ?';
        $params = $filename ? array($this->telefono, $filename, $this->id_usuario) : array($this->telefono, $this->id_usuario);
        $usuarioData = new UsuarioData();
        $usuarioData->setId($this->id_usuario);
        $usuarioData->setCorreo($this->correo);
        $usuarioUpdated = $usuarioData->updateProfile();
        return Database::executeRow($sql, $params) && $usuarioUpdated;
    }

    // Actualiza el perfil cambiando la contraseña.
    public function updateProfileWithPassword($filename = null)
    {
        // Verifica si se proporcionó una imagen y ajusta la consulta SQL.
        $sql = 'UPDATE tb_datos_empleados SET telefono = ?' . ($filename ? ', foto_empleado = ?' : '') . ' WHERE id_usuario = ?';
        $params = $filename ? array($this->telefono, $filename, $this->id_usuario) : array($this->telefono, $this->id_usuario);
        $usuarioData = new UsuarioData();
        $usuarioData->setId($this->id_usuario);
        $usuarioData->setCorreo($this->correo);
        $usuarioData->setContrasena($this->contrasena);
        $usuarioUpdated = $usuarioData->updatePassword();
        return Database::executeRow($sql, $params) && $usuarioUpdated;
    }
}
?>