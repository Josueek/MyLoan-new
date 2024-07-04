<?php

// Se incluyen los archivos necesarios para la conexión a la base de datos y la validación.
require_once('../helpers/database.php');
require_once('../helpers/validator.php');

/**
 * Clase para manejar las solicitudes de préstamos.
 */
class SolicitudHandler
{
    /**
     * Método para obtener todas las solicitudes de préstamos.
     * @param string $buscar El término de búsqueda para filtrar las solicitudes.
     * @return array El resultado de la consulta con el estado y los datos.
     */
    /**
     * Obtiene todas las solicitudes de préstamos con filtros opcionales.
     */
    public function getAllSolicitudes($buscar = '', $curso = '', $programa = '')
    {
        $sql = 'SELECT p.id_prestamo, p.fecha_solicitud, p.programa_formacion, p.estado_prestamo, p.observacion, p.id_curso, p.id_usuario, 
                       c.nombre_curso, e.nombre_empleado 
                FROM tb_prestamos p
                LEFT JOIN tb_cursos c ON p.id_curso = c.id_curso
                LEFT JOIN tb_datos_empleados e ON p.id_usuario = e.id_datos_empleado
                WHERE (e.nombre_empleado LIKE ? OR ? = "")
                AND (p.id_curso = ? OR ? = "")
                AND (p.programa_formacion = ? OR ? = "")';
        $params = ["%$buscar%", $buscar, $curso, $curso, $programa, $programa];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }

    /**
     * Obtiene el detalle de una solicitud de préstamo por su ID.
     */
    public function getDetallePrestamo($idPrestamo)
    {
        $sql = 'SELECT dp.cantidad, dp.unidad, dp.descripcion, dp.id_prestamo, 
                       e.nombre_espacio, eq.nombre AS nombre_equipo, m.nombre AS nombre_material, h.nombre_herramienta 
                FROM tb_detalle_prestamos dp
                LEFT JOIN tb_espacios e ON dp.id_espacio = e.id_espacio
                LEFT JOIN tb_equipos eq ON dp.id_equipo = eq.id_equipo
                LEFT JOIN tb_materiales m ON dp.id_material = m.id_material
                LEFT JOIN tb_inventario_herramienta h ON dp.codigo_herramienta = h.codigo_herramienta
                WHERE dp.id_prestamo = ?';
        $params = [$idPrestamo];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros de detalle para este préstamo');
        }
    }

    /**
     * Deniega una solicitud de préstamo por su ID.
     */
    public function denegarSolicitud($idPrestamo)
    {
        $sql = 'UPDATE tb_prestamos SET estado_prestamo = "Denegado" WHERE id_prestamo = ?';
        $params = [$idPrestamo];
        return Database::executeRow($sql, $params);
    }


    

    /**
     * Método para agregar una nueva solicitud de préstamo.
     * @param array $params Los parámetros necesarios para crear la solicitud.
     * @return boolean El resultado de la ejecución de la consulta.
     */
    public function addSolicitud($params)
    {
        $sql = 'INSERT INTO tb_prestamos (fecha_solicitud, programa_formacion, estado_prestamo, observacion, id_curso, id_usuario) 
                VALUES (?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    /**
     * Método para obtener una solicitud de préstamo por su ID.
     * @param int $idPrestamo El ID de la solicitud de préstamo.
     * @return array La información de la solicitud de préstamo.
     */
    public function getSolicitudById($idPrestamo)
    {
        $sql = 'SELECT * FROM tb_prestamos WHERE id_prestamo = ?';
        $params = array($idPrestamo);
        return Database::getRow($sql, $params);
    }

    /**
     * Método para actualizar una solicitud de préstamo existente.
     * @param array $params Los parámetros necesarios para actualizar la solicitud.
     * @return boolean El resultado de la ejecución de la consulta.
     */
    public function updateSolicitud($params)
    {
        $sql = 'UPDATE tb_prestamos 
                SET fecha_solicitud = ?, programa_formacion = ?, estado_prestamo = ?, observacion = ?, id_curso = ?, id_usuario = ? 
                WHERE id_prestamo = ?';
        return Database::executeRow($sql, $params);
    }

    /**
     * Método para eliminar una solicitud de préstamo por su ID.
     * @param int $idPrestamo El ID de la solicitud de préstamo.
     * @return boolean El resultado de la ejecución de la consulta.
     */
    public function deleteSolicitud($idPrestamo)
    {
        $sql = 'DELETE FROM tb_prestamos WHERE id_prestamo = ?';
        $params = array($idPrestamo);
        return Database::executeRow($sql, $params);
    }
}
?>
