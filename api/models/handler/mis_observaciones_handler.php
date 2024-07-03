<?php
require_once('../helpers/database.php');

class ObservacionesHandler
{
    // Método para obtener todas las observaciones con filtro opcional
    public function getAllObservaciones($buscar = '', $filtrar = '')
    {
        $sql = 'SELECT id_observacion, fecha_observacion, observacion, foto_observacion, tipo_observacion, tipo_prestamo, id_espacio, id_usuario, id_prestamo
                FROM tb_observaciones
                WHERE observacion LIKE ? AND tipo_prestamo LIKE ?';
        $params = ["%$buscar%", $filtrar ? $filtrar : '%'];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }

    // Método para obtener los tipos de observación
    public function getTiposObservacion()
    {
        return ['Previa', 'Durante', 'Despues', 'Fuera'];
    }

    // Método para obtener los tipos de préstamo
    public function getTiposPrestamo()
    {
        return ['Taller', 'Laboratorio', 'Equipo', 'Material', 'Herramienta'];
    }

    // Método para obtener los espacios
    public function getEspacios()
    {
        $sql = 'SELECT id_espacio, nombre_espacio FROM tb_espacios'; // Suponiendo que hay una tabla tb_espacios
        return Database::getRows($sql);
    }

    // Método para obtener los préstamos
    public function getPrestamos()
    {
        $sql = 'SELECT id_prestamo, descripcion_prestamo FROM tb_prestamos'; // Suponiendo que hay una tabla tb_prestamos
        return Database::getRows($sql);
    }

    // Método para añadir una nueva observación
    public function addObservacion($params)
    {
        $sql = 'INSERT INTO tb_observaciones (fecha_observacion, observacion, foto_observacion, tipo_observacion, tipo_prestamo, id_espacio, id_usuario, id_prestamo) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    // Método para obtener una observación por ID
    public function getObservacionById($idObservacion)
    {
        $sql = 'SELECT * FROM tb_observaciones WHERE id_observacion = ?';
        $params = array($idObservacion);
        return Database::getRow($sql, $params);
    }

    // Método para actualizar una observación
    public function updateObservacion($params)
    {
        $sql = 'UPDATE tb_observaciones 
                SET fecha_observacion = ?, observacion = ?, foto_observacion = ?, tipo_observacion = ?, tipo_prestamo = ?, id_espacio = ?, id_usuario = ?, id_prestamo = ?
                WHERE id_observacion = ?';
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar una observación
    public function deleteObservacion($idObservacion)
    {
        $sql = 'DELETE FROM tb_observaciones WHERE id_observacion = ?';
        $params = array($idObservacion);
        return Database::executeRow($sql, $params);
    }
}
?>
