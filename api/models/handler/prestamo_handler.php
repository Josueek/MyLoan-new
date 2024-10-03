<?php
require_once('../helpers/database.php');

class CursoHandler {
    public function getAllCursos() {
        $sql = 'SELECT id_curso, nombre_curso FROM tb_cursos';
        return Database::getRows($sql);
    }

    public function addPrestamo()
    {
        $sql = 'INSERT INTO tb_prestamo (fecha_solicitud, programa_formacion, estado_prestamo,
        observacion, id_curso, id_usuario) VALUES (?,?,?,?,?,?)';
        return Database::executeRow($sql, $params);
    }
}
?>