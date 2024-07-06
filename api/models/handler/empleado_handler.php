<?php
require_once ('../helpers/database.php');

class EmpleadoHandler
{

    /**
     * Clase EmpleadoHandler
     * Esta clase maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los empleados en la base de datos.
     * Las operaciones incluyen la creación de un nuevo empleado, obtener el perfil de un empleado, actualizar el perfil con o sin contraseña.
     * Utiliza una conexión a la base de datos a través de la clase Database.
     */

    //Propiedades para almacenar los datos
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


    //Insertar un nuevo empleado
    public function createRow()
    {
        $sql = 'INSERT INTO tb_datos_empleados(nombre_empleado, apellido_empleado, telefono, id_usuario)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellidos, $this->telefono, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    //Obtener los datos del empleado y jalar los datos en editar perfil
    public function getProfile()
    {
        $sql = 'SELECT nombre_empleado AS nombre, apellido_empleado AS apellido, correo_electronico AS email, telefono, estado_empleado AS estado, id_institucion AS institucion, id_cargo AS cargo, foto_empleado AS imagen
                FROM tb_datos_empleados
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    //Metodo para editar perfil
    public function updateProfile()
    {
        $sql = 'UPDATE tb_datos_empleados
                SET correo_electronico = ?, telefono = ?, estado_empleado = ?, id_institucion = ?, id_cargo = ?, foto_empleado = ?
                WHERE id_usuario = ?';
        $params = array($this->correo, $this->telefono, $this->estado, $this->institucion, $this->cargo, $this->imagen, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }
    //Metodo par actualizar el perfil junto con la contraseña
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