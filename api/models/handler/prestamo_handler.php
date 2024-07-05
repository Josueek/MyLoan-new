<?php
require_once('../helpers/database.php');

class CursoHandler {
    public function getAllCursos() {
        $sql = 'SELECT id_curso, nombre_curso FROM tb_cursos';
        return Database::getRows($sql);
    }
}
?>
