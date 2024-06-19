<?php
require_once('../helpers/database.php');

class EspacioHandler
{
    public function getAllEspacios()
    {
        $sql = 'SELECT e.id_espacio, e.nombre_espacio, e.capacidad_personas, e.tipo_espacio, e.inventario_doc, e.foto_espacio, 
                       es.nombre_especialidad, i.nombre_institucion, d.nombre_empleado
                FROM tb_espacios e
                LEFT JOIN tb_especialidades es ON e.id_especialidad = es.id_especialidad
                LEFT JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
                LEFT JOIN tb_datos_empleados d ON e.id_empleado = d.id_datos_empleado';
        $data = Database::getRows($sql, null);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }

    public function getAllEmpleados()
    {
        $sql = 'SELECT id_datos_empleado, nombre_empleado FROM tb_datos_empleados';
        return Database::getRows($sql);
    }

    public function getAllEspecialidades()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad FROM tb_especialidades';
        return Database::getRows($sql);
    }

    public function getAllInstituciones()
    {
        $sql = 'SELECT id_institucion, nombre_institucion FROM tb_instituciones';
        return Database::getRows($sql);
    }

    public function addEspacio($params) {
        $sql = 'INSERT INTO tb_espacios (nombre_espacio, capacidad_personas, tipo_espacio, id_empleado, id_especialidad, id_institucion, inventario_doc, foto_espacio) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }
    
}
?>
