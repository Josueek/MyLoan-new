<?php
require_once('../helpers/database.php');

class EspacioHandler
{
    public function getAllEspacios($buscar = '', $filtrar = '')
    {
        $sql = 'SELECT e.id_espacio, e.nombre_espacio, e.capacidad_personas, e.tipo_espacio, e.inventario_doc, e.foto_espacio, 
                       es.nombre_especialidad, i.nombre_institucion, d.nombre_empleado
                FROM tb_espacios e
                LEFT JOIN tb_especialidades es ON e.id_especialidad = es.id_especialidad
                LEFT JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
                LEFT JOIN tb_datos_empleados d ON e.id_empleado = d.id_datos_empleado
                WHERE e.nombre_espacio LIKE ? AND es.id_especialidad LIKE ?';
        $params = ["%$buscar%", $filtrar ? $filtrar : '%'];
        $data = Database::getRows($sql, $params);
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

    public function addEspacio($params)
    {
        $sql = 'INSERT INTO tb_espacios (nombre_espacio, capacidad_personas, tipo_espacio, id_empleado, id_especialidad, id_institucion, inventario_doc, foto_espacio) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getEspacioById($idEspacio)
    {
        $sql = 'SELECT id_espacio, nombre_espacio, capacidad_personas, tipo_espacio, id_empleado, id_especialidad, id_institucion, inventario_doc, foto_espacio
                FROM tb_espacios
                WHERE id_espacio = ?';
        $params = array($idEspacio);
        return Database::getRow($sql, $params);
    }

    public function updateEspacio($params)
    {
        $sql = 'UPDATE tb_espacios 
                SET nombre_espacio = ?, capacidad_personas = ?, tipo_espacio = ?, id_empleado = ?, id_especialidad = ?, id_institucion = ?, inventario_doc = ?, foto_espacio = ? 
                WHERE id_espacio = ?';
        return Database::executeRow($sql, $params);
    }

    

    public function deleteEspacio($idEspacio)
    {
        // Primero, obtenemos los nombres de los archivos asociados con el espacio.
        $sql = 'SELECT foto_espacio, inventario_doc FROM tb_espacios WHERE id_espacio = ?';
        $params = array($idEspacio);
        $data = Database::getRow($sql, $params);

        if ($data) {
            // Intentamos eliminar los archivos de imagen e inventario.
            $imageDeleted = Validator::deleteFile('../../api/images/espacios/', $data['foto_espacio']);
            $inventoryDeleted = Validator::deleteFile('../../api/inventario/', $data['inventario_doc']);

            // Ahora eliminamos el registro de la base de datos.
            $sql = 'DELETE FROM tb_espacios WHERE id_espacio = ?';
            if (Database::executeRow($sql, $params)) {
                return true;
            } else {
                // Si la eliminación del registro falla, restauramos los archivos eliminados (si es necesario).
                if (!$imageDeleted) {
                    Validator::saveFile(['tmp_name' => '../../api/images/espacios/' . $data['foto_espacio']], '../../api/images/espacios/');
                }
                if (!$inventoryDeleted) {
                    Validator::saveFile(['tmp_name' => '../../api/inventario/' . $data['inventario_doc']], '../../api/inventario/');
                }
                return false;
            }
        } else {
            return false;
        }
    }
}
?>
