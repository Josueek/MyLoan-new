<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');

class EquipoHandler
{
    public function getAllEquipos($buscar = '', $filtrar = '')
    {
        $orderBy = '';
        if ($filtrar === 'mayor') {
            $orderBy = 'ORDER BY e.cantidad DESC';
        } elseif ($filtrar === 'menor') {
            $orderBy = 'ORDER BY e.cantidad ASC';
        }

        $sql = 'SELECT e.id_equipo, e.nombre, e.descripcion, e.cantidad, e.id_espacio, e.id_institucion, es.nombre_espacio, i.nombre_institucion
                FROM tb_equipos e
                LEFT JOIN tb_espacios es ON e.id_espacio = es.id_espacio
                LEFT JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
                WHERE e.nombre LIKE ?
                ' . $orderBy;
        $params = ["%$buscar%"];
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

    public function getAllEspacios()
    {
        $sql = 'SELECT id_espacio, nombre_espacio FROM tb_espacios';
        return Database::getRows($sql);
    }

    public function addEquipo($params)
    {
        $sql = 'INSERT INTO tb_equipos (nombre, descripcion, cantidad, id_espacio, id_institucion) 
                VALUES (?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getEquipoById($idEquipo)
    {
        $sql = 'SELECT * FROM tb_equipos WHERE id_equipo = ?';
        $params = array($idEquipo);
        return Database::getRow($sql, $params);
    }

    public function updateEquipo($params)
    {
        $sql = 'UPDATE tb_equipos 
                SET nombre = ?, descripcion = ?, cantidad = ?, id_espacio = ?, id_institucion = ? 
                WHERE id_equipo = ?';
        return Database::executeRow($sql, $params);
    }

    public function deleteEquipo($idEquipo)
    {
        $sql = 'DELETE FROM tb_equipos WHERE id_equipo = ?';
        $params = array($idEquipo);
        return Database::executeRow($sql, $params);
    }
}
?>
