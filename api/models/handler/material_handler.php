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

    public function TotalMaterialesPorInstitucion()
{
    // Definir la consulta SQL para obtener el total de materiales por institución FALTA EL SERVICES
    $sql = '
        SELECT i.nombre_institucion, SUM(m.cantidad) AS total_materiales
        FROM tb_materiales m
        JOIN tb_equipos e ON m.id_material = e.id_espacio
        JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
        GROUP BY i.id_institucion
    ';

    // Ejecutar la consulta y retornar los resultados
    return Database::getRows($sql);
}
public function getMaterials($orden = 'asc') {
    // Definir la consulta SQL para obtener los materiales
    $sql = 'SELECT nombre, descripcion, cantidad FROM tb_materiales ORDER BY cantidad ' . strtoupper($orden);

    // Preparar la consulta y ejecutar
    $params = array(); // Agrega parámetros si es necesario
    return Database::getRows($sql, $params);
}
}
?>
