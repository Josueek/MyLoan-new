<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');

class PrestamoHandler
{
    public function getAllPrestamos($buscar = '', $filtrar = '')
    {
        $order = '';
        if ($filtrar == 'asc') {
            $order = 'ORDER BY fecha_solicitud ASC';
        } elseif ($filtrar == 'desc') {
            $order = 'ORDER BY fecha_solicitud DESC';
        }

        $sql = "SELECT id_prestamo, fecha_solicitud, programa_formacion, estado_prestamo, observacion, id_curso, id_usuario 
                FROM tb_prestamos 
                WHERE programa_formacion LIKE ? $order";
        $params = ["%$buscar%"];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }

    public function addPrestamo($params)
    {
        $sql = 'INSERT INTO tb_prestamos (fecha_solicitud, programa_formacion, estado_prestamo, observacion, id_curso, id_usuario) VALUES (?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getPrestamoById($idPrestamo)
    {
        $sql = 'SELECT * FROM tb_prestamos WHERE id_prestamo = ?';
        $params = array($idPrestamo);
        return Database::getRow($sql, $params);
    }

    public function updatePrestamo($params)
    {
        $sql = 'UPDATE tb_prestamos 
                SET fecha_solicitud = ?, programa_formacion = ?, estado_prestamo = ?, observacion = ?, id_curso = ?, id_usuario = ? 
                WHERE id_prestamo = ?';
        return Database::executeRow($sql, $params);
    }

    public function deletePrestamo($idPrestamo)
    {
        $sql = 'DELETE FROM tb_prestamos WHERE id_prestamo = ?';
        $params = array($idPrestamo);
        return Database::executeRow($sql, $params);
    }
}
?>
