<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');

class InventarioHerramientaHandler
{
    public function getAllHerramientas($buscar = '', $filtrar = '')
    {
        $sql = 'SELECT ih.codigo_herramienta, ih.nombre_herramienta, ih.descripcion, ih.stock, ih.id_institucion, i.nombre_institucion
                FROM tb_inventario_herramienta ih
                LEFT JOIN tb_instituciones i ON ih.id_institucion = i.id_institucion
                WHERE ih.nombre_herramienta LIKE ? AND ih.id_institucion LIKE ?';
        $params = ["%$buscar%", $filtrar ? $filtrar : '%'];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }
    

    public function getAllInstituciones()
    {
        $sql = 'SELECT id_institucion, nombre_institucion FROM tb_instituciones';
        return Database::getRows($sql);
    }

    public function addHerramienta($params)
    {
        $sql = 'INSERT INTO tb_inventario_herramienta (codigo_herramienta, nombre_herramienta, stock, id_institucion, descripcion) 
                VALUES (?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getHerramientaByCodigo($codigoHerramienta)
    {
        $sql = 'SELECT * FROM tb_inventario_herramienta WHERE codigo_herramienta = ?';
        $params = array($codigoHerramienta);
        return Database::getRow($sql, $params);
    }

    public function updateHerramienta($params)
    {
        $sql = 'UPDATE tb_inventario_herramienta 
                SET nombre_herramienta = ?, stock = ?, id_institucion = ?, descripcion = ? 
                WHERE codigo_herramienta = ?';
        return Database::executeRow($sql, $params);
    }

    public function deleteHerramienta($codigoHerramienta)
    {
        $sql = 'DELETE FROM tb_inventario_herramienta WHERE codigo_herramienta = ?';
        $params = array($codigoHerramienta);
        return Database::executeRow($sql, $params);
    }
}
?>