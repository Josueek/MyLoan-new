<?php
require_once('../helpers/database.php');

class EmpleadoHandler
{
    protected $id = null;
    protected $nombre = null;
    protected $apellidos = null;
    protected $telefono = null;
    protected $id_usuario = null;
    protected $correo = null;
    protected $estado = null;
    protected $institucion = null;
    protected $cargo = null;
    protected $imagen = null;
    protected $contrasena = null;

    public function createRow()
    {
        $sql = 'INSERT INTO tb_datos_empleados(nombre_empleado, apellido_empleado, telefono, id_usuario)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellidos, $this->telefono, $this->id_usuario);
        return Database::executeRow($sql, $params);
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
