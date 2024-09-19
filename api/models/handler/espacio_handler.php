<?php
require_once('../helpers/database.php');

class EspacioHandler
{
    /**
     * Clase EspacioHandler
     * Esta clase maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los espacios en la base de datos.
     * Las operaciones incluyen la obtención de todos los espacios con opciones de búsqueda y filtrado, 
     * la obtención de empleados, especialidades e instituciones,
     * la adición de un nuevo espacio, la obtención de un espacio por su ID, la actualización y la eliminación de espacios.
     * Utiliza una conexión a la base de datos a través de la clase Database.
     */
    protected $idEmpleado;
    protected $nombre;
    protected $capacidad;
    protected $tipo;
    protected $encargado;
    protected $especialidad;
    protected $institucion;
    protected $imagen;
    protected $inventario;
    protected $idEspacio;

    //Obtener los datso de todos los espacios
    public function getAllEspacios($buscar = '', $filtrar = '')
    {
        $sql = 'SELECT e.id_espacio, e.nombre_espacio, e.capacidad_personas, e.tipo_espacio, e.inventario_doc, e.foto_espacio, 
        es.nombre_especialidad, i.nombre_institucion, d.nombre_empleado
        FROM tb_espacios e
        LEFT JOIN tb_especialidades es ON e.id_especialidad = es.id_especialidad
        LEFT JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
        LEFT JOIN tb_datos_empleados d ON e.id_empleado = d.id_datos_empleado
        WHERE e.nombre_espacio LIKE ? AND es.id_especialidad LIKE ?';
        $params = ["%$buscar%", $filtrar ? $filtrar : '%'];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }
    //Obtener los datos de espacio que corresponden a un instructor
    public function getAllEspaciosByIdUsuario($idempleado)
    {
        $sql = 'SELECT e.id_espacio, e.nombre_espacio, e.capacidad_personas, e.tipo_espacio, e.inventario_doc, e.foto_espacio, 
            es.nombre_especialidad, i.nombre_institucion, e.id_empleado, d.nombre_empleado
            FROM tb_espacios e
            LEFT JOIN tb_especialidades es ON e.id_especialidad = es.id_especialidad
            LEFT JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
            LEFT JOIN tb_datos_empleados d ON e.id_empleado = d.id_datos_empleado
            WHERE e.id_empleado = ?';
        $params = array($idempleado);
        $data = Database::getRows($sql, $params); // Cambiar getRow a getRows para manejar múltiples registros

        if ($data !== false) {
            if (!empty($data)) {
                return array('status' => 1, 'dataset' => $data);
            } else {
                return array('status' => 1, 'dataset' => [], 'message' => 'No se encontraron registros');
            }
        } else {
            return array('status' => 0, 'message' => 'No se pudo obtener el espacio');
        }
    }


    //Obtener los datos de los empleados 
    public function getAllEmpleados()
    {
        $sql = 'SELECT id_datos_empleado, nombre_empleado FROM tb_datos_empleados';
        return Database::getRows($sql);
    }

    //Obtener especialidad para llenar combobox
    public function getAllEspecialidades()
    {
        $sql = 'SELECT id_especialidad, nombre_especialidad FROM tb_especialidades';
        return Database::getRows($sql);
    }

    public function getAllInstituciones()
    {
        $sql = 'SELECT id_institucion, nombre_institucion FROM tb_instituciones';
        return Database::getRows($sql);
    }

    //Consulta para agregar espacios
    public function addEspacio($params)
    {
        $sql = 'INSERT INTO tb_espacios (nombre_espacio, capacidad_personas, tipo_espacio, id_empleado, id_especialidad, id_institucion, inventario_doc, foto_espacio) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return Database::executeRow($sql, $params);
    }

    public function getEspacioById($idEspacio)
    {
        $sql = 'SELECT id_espacio, nombre_espacio, capacidad_personas, tipo_espacio, id_empleado, id_especialidad, id_institucion, inventario_doc, foto_espacio
                FROM tb_espacios
                WHERE id_espacio = ?';
        $params = array($idEspacio);
        return Database::getRow($sql, $params);
    }
    //Obtener el espacio por medio del id obteniendo todos los datos completos
    public function getEspacioByIdCompleto($idEspacio)
    {
        $sql = 'SELECT 
    e.id_espacio,
    e.nombre_espacio,
    e.capacidad_personas,
    e.tipo_espacio,
    e.inventario_doc,
    e.foto_espacio,
    es.nombre_especialidad,
    i.nombre_institucion,
    de.nombre_empleado,
    de.apellido_empleado,
    de.telefono,
    de.estado_empleado,
    de.foto_empleado
FROM tb_espacios e
JOIN tb_especialidades es ON e.id_especialidad = es.id_especialidad
JOIN tb_datos_empleados de ON e.id_empleado = de.id_datos_empleado
JOIN tb_instituciones i ON e.id_institucion = i.id_institucion
WHERE e.id_espacio = ?;';
        $params = array($idEspacio);
        return Database::getRow($sql, $params);
    }

    //Actualizar datos del espacio
    public function updateEspacio($params)
    {
        $sql = 'UPDATE tb_espacios 
                SET nombre_espacio = ?, capacidad_personas = ?, tipo_espacio = ?, id_empleado = ?, id_especialidad = ?, id_institucion = ?, inventario_doc = ?, foto_espacio = ? 
                WHERE id_espacio = ?';
        return Database::executeRow($sql, $params);
    }

    public function EspaciosPorTipo()
    {
        // Definir la consulta SQL para obtener los nombres de espacios y su tipo, agrupados por tipo
        $sql = '
            SELECT tipo_espacio, 
                   GROUP_CONCAT(nombre_espacio SEPARATOR ", ") AS nombres_espacios,
                   COUNT(*) AS cantidad
            FROM tb_espacios
            GROUP BY tipo_espacio
        ';

        // Ejecutar la consulta y retornar los resultados
        return Database::getRows($sql);
    }



    //Eliminar datos de la tabla espacio
    public function deleteEspacio($idEspacio)
    {
        // Primero, obtenemos los nombres de los archivos asociados con el espacio.
        $sql = 'SELECT foto_espacio, inventario_doc FROM tb_espacios WHERE id_espacio = ?';
        $params = array($idEspacio);
        $data = Database::getRow($sql, $params);

        if ($data) {
            // Intentamos eliminar los archivos de imagen e inventario.
            $imageDeleted = Validator::deleteFile('../../api/images/espacios/', $data['foto_espacio']);
            $inventoryDeleted = Validator::deleteFile('../../api/inventario/', $data['inventario_doc']);

            // Ahora eliminamos el registro de la base de datos.
            $sql = 'DELETE FROM tb_espacios WHERE id_espacio = ?';
            if (Database::executeRow($sql, $params)) {
                return true;
            } else {
                // Si la eliminación del registro falla, restauramos los archivos eliminados (si es necesario).
                if (!$imageDeleted) {
                    Validator::saveFile(['tmp_name' => '../../api/images/espacios/' . $data['foto_espacio']], '../../api/images/espacios/');
                }
                if (!$inventoryDeleted) {
                    Validator::saveFile(['tmp_name' => '../../api/inventario/' . $data['inventario_doc']], '../../api/inventario/');
                }
                return false;
            }
        } else {
            return false;
        }
    }

    /// reporte
    public function obtenerDetalleEspacios()
    {
        // Definir la consulta SQL para obtener el detalle de los espacios junto con el nombre de la especialidad y el nombre del empleado
        $sql = '
        SELECT 
            e.nombre_espacio, 
            e.capacidad_personas, 
            e.tipo_espacio, 
            esp.nombre_especialidad, 
            de.nombre_empleado, 
            de.apellido_empleado
        FROM 
            tb_espacios e
        JOIN 
            tb_especialidades esp ON e.id_especialidad = esp.id_especialidad
        JOIN 
            tb_datos_empleados de ON e.id_empleado = de.id_datos_empleado
    ';

        // Ejecutar la consulta y retornar los resultados
        return Database::getRows($sql);
    }

    public function programasFormacionPorCurso()
    {
        $sql = 'SELECT c.programa_formacion, COUNT(dc.id_curso) AS cantidad_cursos
                    FROM tb_cursos c
                    LEFT JOIN tb_detalles_cursos dc ON c.id_curso = dc.id_curso AND dc.id_espacio = ?
                    WHERE c.programa_formacion IN ("HTP", "EC", "FCAT") OR dc.id_curso IS NULL
                    GROUP BY c.programa_formacion';
        $params = array($this->idEspacio);
        return Database::getRows($sql, $params);
    }

    public function tipoObservacionesPorEspacio()
    {
        $sql = 'SELECT 
    tipos.tipo_observacion AS Tipo_Observacion,
    COALESCE(COUNT(o.id_obsevacion), 0) AS Numero_de_Observaciones
    FROM 
        (SELECT "Previa" AS tipo_observacion 
        UNION ALL 
        SELECT "Durante" 
        UNION ALL 
        SELECT "Despues" 
        UNION ALL 
        SELECT "Fuera") AS tipos
    LEFT JOIN tb_observaciones o ON o.tipo_observacion = tipos.tipo_observacion
    AND o.id_espacio = ?
    GROUP BY tipos.tipo_observacion;';
        $params = array($this->idEspacio);
        return Database::getRows($sql, $params);
    }

    public function EspaciosPorEspecialidad()
    {
        // Definir la consulta SQL para obtener los espacios por especialidad
        $sql = '
        SELECT es.nombre_especialidad, e.nombre_espacio, e.capacidad_personas, e.tipo_espacio
        FROM tb_especialidades es
        JOIN tb_espacios e ON es.id_especialidad = e.id_especialidad
    ';

        // Ejecutar la consulta y retornar los resultados
        return Database::getRows($sql);
    }
}
