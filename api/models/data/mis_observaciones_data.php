<?php
require_once('../helpers/validator.php');
require_once('../models/handler/mis_observaciones_handler.php');

class ObservacionData extends ObservacionHandler
{
    private $id;
    private $fecha;
    private $observacion;
    private $foto;
    private $tipo;
    private $tipo_prestamo;
    private $id_espacio;
    private $id_usuario;
    private $id_prestamo;

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }

    public function setFecha($fecha)
    {
        if (Validator::validateDate($fecha)) {
            $this->fecha = $fecha;
            return true;
        } else {
            return false;
        }
    }

    public function setObservacion($observacion)
    {
        if (Validator::validateString($observacion)) {
            $this->observacion = $observacion;
            return true;
        } else {
            return false;
        }
    }

    public function setFoto($foto)
    {
        // Here you can add additional validation for the photo if needed
        $this->foto = $foto;
        return true; // Assuming it's always valid for simplicity
    }

    public function setTipoObservacion($tipo)
    {
        if (Validator::validateEnumValue($tipo, ['Previa', 'Durante', 'Despues', 'Fuera'])) {
            $this->tipo = $tipo;
            return true;
        } else {
            return false;
        }
    }

    public function setTipoPrestamo($tipo_prestamo)
    {
        if (Validator::validateEnumValue($tipo_prestamo, ['Taller', 'Laboratorio', 'Equipo', 'Material', 'Herramienta'])) {
            $this->tipo_prestamo = $tipo_prestamo;
            return true;
        } else {
            return false;
        }
    }

    public function setIdEspacio($id_espacio)
    {
        if (Validator::validateNaturalNumber($id_espacio)) {
            $this->id_espacio = $id_espacio;
            return true;
        } else {
            return false;
        }
    }

    public function setIdUsuario($id_usuario)
    {
        if (Validator::validateNaturalNumber($id_usuario)) {
            $this->id_usuario = $id_usuario;
            return true;
        } else {
            return false;
        }
    }

    public function setIdPrestamo($id_prestamo)
    {
        if (Validator::validateNaturalNumber($id_prestamo)) {
            $this->id_prestamo = $id_prestamo;
            return true;
        } else {
            return false;
        }
    }

    public function create()
    {
        $params = array(
            $this->fecha,
            $this->observacion,
            $this->foto,
            $this->tipo,
            $this->tipo_prestamo,
            $this->id_espacio,
            $this->id_usuario,
            $this->id_prestamo
        );
        return $this->addObservacion($params);
    }

    public function getObservacionById($idObservacion)
    {
        return parent::getObservacionById($idObservacion);
    }

    public function update()
    {
        $params = array(
            $this->fecha,
            $this->observacion,
            $this->foto,
            $this->tipo,
            $this->tipo_prestamo,
            $this->id_espacio,
            $this->id_usuario,
            $this->id_prestamo,
            $this->id
        );
        return parent::updateObservacion($params);
    }

    public function delete($idObservacion)
    {
        return parent::deleteObservacion($idObservacion);
    }
}
?>
