<?php
require_once('../helpers/database.php');

class ObservacionData {
    private $db;
    private $idObservacion;
    private $fechaObservacion;
    private $observacion;
    private $tipoObservacion;
    private $tipoPrestamo;
    private $idEspacio;
    private $idUsuario;
    private $idPrestamo;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function getAllObservaciones($buscar = '')
    {
        $observaciones = array();

        $query = "SELECT * FROM tb_observaciones WHERE observacion LIKE '%$buscar%' ORDER BY fecha_observacion DESC";

        $result = $this->db->query($query);

        if ($result) {
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
        $tipos = array();

        $query = "SELECT DISTINCT tipo_observacion FROM tb_observaciones";

        $result = $this->db->query($query);

        if ($result) {
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
        $tipos = array();

        $query = "SELECT DISTINCT tipo_prestamo FROM tb_observaciones";

        $result = $this->db->query($query);

        if ($result) {
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
        $espacios = array();

        $query = "SELECT id_espacio, nombre_espacio FROM tb_espacios";

        $result = $this->db->query($query);

        if ($result) {
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
        $prestamos = array();

        $query = "SELECT id_prestamo, nombre_prestamo FROM tb_prestamos";

        $result = $this->db->query($query);

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $prestamos[] = $row;
            }
            $result->free();
            return $prestamos;
        } else {
            return null;
        }
    }

    public function getObservacionById($id)
    {
        $query = "SELECT * FROM tb_observaciones WHERE id_observacion = $id LIMIT 1";

        $result = $this->db->query($query);

        if ($result && $result->num_rows == 1) {
            $observacion = $result->fetch_assoc();
            $result->free();
            return $observacion;
        } else {
            return null;
        }
    }

    public function create()
    {
        $query = "INSERT INTO tb_observaciones (fecha_observacion, observacion, tipo_observacion, tipo_prestamo, id_espacio, id_usuario, id_prestamo) VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssiii', $this->fechaObservacion, $this->observacion, $this->tipoObservacion, $this->tipoPrestamo, $this->idEspacio, $this->idUsuario, $this->idPrestamo);

        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function update()
    {
        $query = "UPDATE tb_observaciones SET fecha_observacion = ?, observacion = ?, tipo_observacion = ?, tipo_prestamo = ?, id_espacio = ?, id_usuario = ?, id_prestamo = ? WHERE id_observacion = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssiiii', $this->fechaObservacion, $this->observacion, $this->tipoObservacion, $this->tipoPrestamo, $this->idEspacio, $this->idUsuario, $this->idPrestamo, $this->idObservacion);

        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    public function delete($id)
    {
        $query = "DELETE FROM tb_observaciones WHERE id_observacion = ?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);

        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }

    // Getters y setters para propiedades de la clase ObservacionData
    // Implementar según sea necesario para manipular los datos de observación
    // Ejemplo de getter:
    public function setIdObservacion($idObservacion)
    {
        $this->idObservacion = $idObservacion;
    }

    // Implementar otros getters y setters según sea necesario
    // ...
}
?>
