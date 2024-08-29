<?php
require_once('../helpers/database.php');

class GestionarEmpleadoHandler
{
    protected $id = null;
    protected $id_usuario = null;
    protected $nombre = null;
    protected $apellidos = null;
    protected $telefono = null;
    protected $estado = null;
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

    public function setNombre($nombre)
    {
        if (Validator::validateAlphabetic($nombre)) {
            $this->nombre = $nombre;
            return true;
        } else {
            return false;
        }
    }

    public function setApellidos($apellidos)
    {
        if (Validator::validateAlphabetic($apellidos)) {
            $this->apellidos = $apellidos;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($telefono)
    {
        if (Validator::validateString($telefono)) {
            $this->telefono = $telefono;
            return true;
        } else {
            return false;
        }
    }

    public function setEstado($estado)
    {
        if ($estado == 'Activo' || $estado == 'Inactivo') {
            $this->estado = $estado;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($correo)
    {
        if (Validator::validateEmail($correo)) {
            $this->correo = $correo;
            return true;
        } else {
            return false;
        }
    }

    public function setContrasena($contrasena)
    {
        if (Validator::validatePassword($contrasena)) {
            $this->contrasena = password_hash($contrasena, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setCargo($cargo)
    {
        if (Validator::validateNaturalNumber($cargo)) {
            $this->cargo = $cargo;
            return true;
        } else {
            return false;
        }
    }

    public function setInstitucion($institucion)
    {
        if (Validator::validateNaturalNumber($institucion)) {
            $this->institucion = $institucion;
            return true;
        } else {
            return false;
        }
    }

    public function searchEmployees($buscar = '', $estado = '')
    {
        $sql = 'SELECT de.id_datos_empleado, de.nombre_empleado, de.apellido_empleado, de.telefono, de.estado_empleado, 
            u.correo_electronico, c.nombre_cargo AS cargo, e.nombre_especialidad AS especialidad
            FROM tb_datos_empleados de
            JOIN tb_usuarios u ON de.id_usuario = u.id_usuario
            JOIN tb_cargos c ON u.id_cargo = c.id_cargo
            LEFT JOIN tb_especialidades e ON de.id_especialidad = e.id_especialidad
            WHERE de.nombre_empleado LIKE ?';

        $params = ["%$buscar%"];

        if ($estado) {
            $sql .= ' AND de.estado_empleado = ?';
            $params[] = $estado;
        }

        $sql .= ' ORDER BY de.id_datos_empleado';

        return Database::getRows($sql, $params);
    }


    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(correo_electronico, contraseña, id_cargo, id_institucion)
                VALUES(?, ?, ?, ?)';
        $params = array($this->correo, $this->contrasena, $this->cargo, $this->institucion);
        $result = Database::executeRow($sql, $params);
        if ($result) {
            $this->id = Database::getLastRowId();
            $sql = 'INSERT INTO tb_datos_empleados(nombre_empleado, apellido_empleado, telefono, id_usuario, estado_empleado)
                    VALUES(?, ?, ?, ?, ?)';
            $params = array($this->nombre, $this->apellidos, $this->telefono, $this->id, $this->estado);
            return Database::executeRow($sql, $params);
        } else {
            return false;
        }
    }

    public function readAll()
    {
        $sql = 'SELECT u.id_usuario, de.id_datos_empleado, de.nombre_empleado, de.apellido_empleado, de.telefono, de.estado_empleado, u.correo_electronico, c.nombre_cargo AS cargo, e.nombre_especialidad AS especialidad
                FROM tb_datos_empleados de
                JOIN tb_usuarios u ON de.id_usuario = u.id_usuario
                JOIN tb_cargos c ON u.id_cargo = c.id_cargo
                LEFT JOIN tb_especialidades e ON de.id_especialidad = e.id_especialidad
                ORDER BY de.id_datos_empleado';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT de.id_datos_empleado, de.nombre_empleado, de.apellido_empleado, de.telefono, de.estado_empleado, u.correo_electronico, c.nombre_cargo, e.nombre_especialidad
                FROM tb_datos_empleados de
                INNER JOIN tb_usuarios u ON de.id_usuario = u.id_usuario
                LEFT JOIN tb_cargos c ON u.id_cargo = c.id_cargo
                LEFT JOIN tb_especialidades e ON de.id_especialidad = e.id_especialidad
                WHERE de.id_datos_empleado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function prestamoPorEmpleado()
    {
        $sql = 'SELECT 
    estado AS Estado,
    COALESCE(COUNT(p.id_prestamo), 0) AS cantidad_prestamos
FROM 
    (SELECT "En Espera" AS estado 
     UNION ALL 
     SELECT "Aceptado" 
     UNION ALL 
     SELECT "Denegado") AS estados
LEFT JOIN 
    tb_prestamos p ON p.estado_prestamo = estados.estado
    AND p.id_usuario = ?
GROUP BY 
    estados.estado;';
        $params = array($this->id_usuario);
        return Database::getRows($sql, $params);
    }

    public function assignEspecialidad($idEmpleado, $idEspecialidad)
    {
        $sql = 'UPDATE tb_datos_empleados SET id_especialidad = ? WHERE id_datos_empleado = ?';
        $params = array($idEspecialidad, $idEmpleado);
        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_datos_empleados
                SET estado_empleado = ?
                WHERE id_datos_empleado = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_datos_empleados
                WHERE id_datos_empleado = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
