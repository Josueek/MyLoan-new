<?php
require_once('../helpers/database.php');

class ObservacionesHandler {
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function getAllObservaciones($buscar = '')
    {
        $query = "SELECT * FROM tb_observaciones WHERE observacion LIKE '%$buscar%' ORDER BY fecha_observacion DESC";

        $result = $this->db->query($query);

        if ($result) {
            $observaciones = array();
            while ($row = $result->fetch_assoc()) {
                $observaciones[] = $row;
            }
            $result->free();
            return $observaciones;
        } else {
            return null;
        }
    }

    public function getTiposObservacion()
    {
        $query = "SELECT DISTINCT tipo_observacion FROM tb_observaciones";

        $result = $this->db->query($query);

        if ($result) {
            $tipos = array();
            while ($row = $result->fetch_assoc()) {
                $tipos[] = $row['tipo_observacion'];
            }
            $result->free();
            return $tipos;
        } else {
            return null;
        }
    }

    public function getTiposPrestamo()
    {
        $query = "SELECT DISTINCT tipo_prestamo FROM tb_observaciones";

        $result = $this->db->query($query);

        if ($result) {
            $tipos = array();
            while ($row = $result->fetch_assoc()) {
                $tipos[] = $row['tipo_prestamo'];
            }
            $result->free();
            return $tipos;
        } else {
            return null;
        }
    }

    public function getEspacios()
    {
        $query = "SELECT id_espacio, nombre_espacio FROM tb_espacios";

        $result = $this->db->query($query);

        if ($result) {
            $espacios = array();
            while ($row = $result->fetch_assoc()) {
                $espacios[] = $row;
            }
            $result->free();
            return $espacios;
        } else {
            return null;
        }
    }

    public function getPrestamos()
    {
        $query = "SELECT id_prestamo, nombre_prestamo FROM tb_prestamos";

        $result = $this->db->query($query);

        if ($result) {
            $prestamos = array();
            while ($row = $result->fetch_assoc()) {
                $prestamos[] = $row;
            }
            $result->free();
            return $prestamos;
        } else {
            return null;
        }
    }

    // Otros métodos según sea necesario para manejar datos específicos
}
?>
