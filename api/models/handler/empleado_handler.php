<?php
require_once('../helpers/database.php');

class EmpleadoHandler
{
    protected $id = null;
    protected $nombre = null;
    protected $apellidos = null;
    protected $telefono = null;
    protected $id_usuario = null;

    public function createRow()
    {
        $sql = 'INSERT INTO tb_datos_empleados(nombre_empleado, apellido_empleado, telefono, id_usuario)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellidos, $this->telefono, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }
}
?>
