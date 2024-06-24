<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');

class MaterialHandler
{
    public function getAllMateriales($buscar = '', $filtrar = '')
    {
        $order = '';
        if ($filtrar == 'asc') {
            $order = 'ORDER BY cantidad ASC';
        } elseif ($filtrar == 'desc') {
            $order = 'ORDER BY cantidad DESC';
        }

        $sql = "SELECT id_material, nombre, descripcion, cantidad 
                FROM tb_materiales 
                WHERE nombre LIKE ? $order";
        $params = ["%$buscar%"];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }

    public function addMaterial($params)
    {
        $sql = 'INSERT INTO tb_materiales (nombre, descripcion, cantidad) VALUES (?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getMaterialById($idMaterial)
    {
        $sql = 'SELECT * FROM tb_materiales WHERE id_material = ?';
        $params = array($idMaterial);
        return Database::getRow($sql, $params);
    }

    public function updateMaterial($params)
    {
        $sql = 'UPDATE tb_materiales 
                SET nombre = ?, descripcion = ?, cantidad = ? 
                WHERE id_material = ?';
        return Database::executeRow($sql, $params);
    }

    public function deleteMaterial($idMaterial)
    {
        $sql = 'DELETE FROM tb_materiales WHERE id_material = ?';
        $params = array($idMaterial);
        return Database::executeRow($sql, $params);
    }
}
?>
