<?php

require_once('../helpers/database.php');
require_once('../helpers/validator.php');

/**
 * Clase para manejar las observaciones.
 */
class MisObservacionesHandler
{
    /**
     * Método para obtener todas las observaciones.
     * @param string $buscar El término de búsqueda para filtrar las observaciones.
     * @param string $tipo El tipo de observación para filtrar las observaciones.
     * @param string $tipoPrestamo El tipo de préstamo para filtrar las observaciones.
     * @return array El resultado de la consulta con el estado y los datos.
     */
    public function getAllObservaciones($buscar = '', $tipo = '', $tipoPrestamo = '')
    {
        $sql = 'SELECT o.id_observacion, o.fecha_observacion, o.observacion, o.foto_observacion, o.tipo_observacion, o.tipo_prestamo, e.nombre_espacio, d.nombre_empleado 
                FROM tb_observaciones o 
                JOIN tb_espacios e ON o.id_espacio = e.id_espacio 
                JOIN tb_datos_empleados d ON o.id_usuario = d.id_usuario
                WHERE (o.observacion LIKE ? OR ? = "") 
                AND (o.tipo_observacion = ? OR ? = "")
                AND (o.tipo_prestamo = ? OR ? = "");';
    
        $params = ["%$buscar%", $buscar, $tipo, $tipo, $tipoPrestamo, $tipoPrestamo];
        $data = Database::getRows($sql, $params);
    
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }
    
    /**
     * Método para obtener una observación por su ID.
     * @param int $idObservacion El ID de la observación.
     * @return array La información de la observación.
     */
    public function getObservacionById($idObservacion)
    {
        $sql = 'SELECT * FROM tb_observaciones WHERE id_observacion = ?';
        $params = array($idObservacion);
        return Database::getRow($sql, $params);
    }

    /**
     * Método para agregar una nueva observación.
     * @param array $params Los parámetros necesarios para crear la observación.
     * @return boolean El resultado de la ejecución de la consulta.
     */
    public function addObservacion($params)
    {
        $sql = 'INSERT INTO tb_observaciones (fecha_observacion, observacion, foto_observacion, tipo_observacion, tipo_prestamo, id_espacio, id_usuario) 
                VALUES (?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    /**
     * Método para actualizar una observación existente.
     * @param array $params Los parámetros necesarios para actualizar la observación.
     * @return boolean El resultado de la ejecución de la consulta.
     */
    public function updateObservacion($params)
    {
        $sql = 'UPDATE tb_observaciones 
                SET fecha_observacion = ?, observacion = ?, foto_observacion = ?, tipo_observacion = ?, tipo_prestamo = ?, id_espacio = ?, id_usuario = ? 
                WHERE id_observacion = ?';
        return Database::executeRow($sql, $params);
    }

    /**
     * Método para eliminar una observación por su ID.
     * @param int $idObservacion El ID de la observación.
     * @return boolean El resultado de la ejecución de la consulta.
     */
    public function deleteObservacion($idObservacion)
    {
        $sql = 'DELETE FROM tb_observaciones WHERE id_observacion = ?'; 
        $params = array($idObservacion);
        return Database::executeRow($sql, $params);
    }
    
    /**
     * Método para obtener las opciones necesarias para el formulario de observaciones.
     * @return array Las opciones para los select del formulario.
     */
    public function getOpciones()
    {
        $result = array();

        $sqlTiposObservacion = 'SELECT DISTINCT tipo_observacion AS id, tipo_observacion AS nombre FROM tb_observaciones';
        $result['tiposObservacion'] = Database::getRows($sqlTiposObservacion);

        $sqlTiposPrestamo = 'SELECT DISTINCT tipo_prestamo AS id, tipo_prestamo AS nombre FROM tb_observaciones';
        $result['tiposPrestamo'] = Database::getRows($sqlTiposPrestamo);

        $sqlEspacios = 'SELECT id_espacio AS id, nombre_espacio AS nombre FROM tb_espacios';
        $result['espacios'] = Database::getRows($sqlEspacios);

        $sqlEmpleados = 'SELECT id_datos_empleado AS id, nombre_empleado AS nombre FROM tb_datos_empleados';
        $result['empleados'] = Database::getRows($sqlEmpleados);

        if ($result) {
            return array('status' => 1, 'dataset' => $result);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron opciones');
        }
    }

    /**
     * Método para guardar una imagen.
     * @param array $file El archivo de la imagen.
     * @return boolean El resultado de la validación y guardado de la imagen.
     */
    public function saveImage($file)
    {
        if (Validator::validateImageFile($file, 800, 800)) {
            $path = '../images/observaciones/';
            return Validator::saveFile($file, $path);
        } else {
            return false;
        }
    }
}
?>
