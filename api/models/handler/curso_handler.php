<?php

require_once ('../helpers/database.php'); // Incluye el archivo de conexión a la base de datos
require_once ('../helpers/validator.php');

class CursoHandler
{

    //Metodo que consulta los datos de la tabla de tb_Cursos y obtiene datos espscificos mediente
    //UN filtro
    public function getAllCursos($buscar = '')
    {
        $sql = 'SELECT c.id_curso, c.nombre_curso, c.fecha_inicio, c.fecha_fin, c.cantidad_personas, c.grupo, c.programa_formacion, c.codigo_curso, c.id_empleado, e.nombre_empleado, c.estado
                FROM tb_cursos c
                LEFT JOIN tb_datos_empleados e ON c.id_empleado = e.id_datos_empleado
                WHERE c.nombre_curso LIKE ?';
        $params = ["%$buscar%"]; // Consulta SQL para obtener cursos con búsqueda
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }


    //Metodo para obtener los datos de empleados
    public function getAllEmpleados()
    {
        $sql = 'SELECT id_datos_empleado, nombre_empleado FROM tb_datos_empleados';
        return Database::getRows($sql);
    }

    //Metodo para agregar un nuevo curso
    public function addCurso($params)
    {
        $sql = 'INSERT INTO tb_cursos (nombre_curso, fecha_inicio, fecha_fin, cantidad_personas, grupo, programa_formacion, codigo_curso, id_empleado, estado) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }


    //Metodo para obtener los datos de un curso mediante el id
    public function getCursoById($idCurso)
    {
        $sql = 'SELECT * FROM tb_cursos WHERE id_curso = ?';
        $params = array($idCurso);
        return Database::getRow($sql, $params);
    }
    //Metodo para obtener los programas de formacion
    public function getPrograma(){
        $sql = 'SELECT Programa_formacion FROM tb_cursos;';
        return Database::getRows($sql);
    }
     //Metodo para obtener el estado de los cursos
     public function getEstadoCurso(){
        $sql = 'SELECT estado FROM tb_cursos;';
        return Database::getRows($sql);
    }

    //Actualizar los datos d la tabla cursos 
    public function updateCurso($params)
    {
        $sql = 'UPDATE tb_cursos 
                SET nombre_curso = ?, fecha_inicio = ?, fecha_fin = ?, cantidad_personas = ?, grupo = ?, programa_formacion = ?, codigo_curso = ?, id_empleado = ?, estado = ? 
                WHERE id_curso = ?';
        return Database::executeRow($sql, $params);
    }

    //Borrar datos de la tabla de cursos
    public function deleteCurso($idCurso)
    {
        $sql = 'DELETE FROM tb_cursos WHERE id_curso = ?';
        $params = array($idCurso);
        return Database::executeRow($sql, $params);
    }

    public function obtenerFechasCurso()
    {
        $fechaActual = date('Y-m-d');
        $sql = 'SELECT fecha_inicio 
                FROM tb_cursos 
                WHERE fecha_inicio >= CURDATE() 
                ORDER BY fecha_inicio ASC 
                LIMIT 1';
        $result = Database::getRow($sql, []);
        $fechaCursoMasCercano = $result ? $result['fecha_inicio'] : null;

        return array('fechaActual' => $fechaActual, 'fechaCursoMasCercano' => $fechaCursoMasCercano);
    }
}


?>