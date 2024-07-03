<?php
require_once('../helpers/validator.php');
require_once('../models/handler/mis_observaciones_handler.php'); // Adjust the path as per your file structure

class ObservacionesData extends ObservacionesHandler
{
    private $idObservacion;
    private $fechaObservacion;
    private $observacion;
    private $fotoObservacion;
    private $tipoObservacion;
    private $tipoPrestamo;
    private $idEspacio;
    private $idUsuario;
    private $idPrestamo;

    public function setIdObservacion($idObservacion)
    {
        if (Validator::validateNaturalNumber($idObservacion)) {
            $this->idObservacion = $idObservacion;
            return true;
        } else {
            return false;
        }
    }

    public function setFechaObservacion($fechaObservacion)
    {
        // Assuming $fechaObservacion is in 'YYYY-MM-DD' format
        if (Validator::validateDate($fechaObservacion)) {
            $this->fechaObservacion = $fechaObservacion;
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

    public function setFotoObservacion($fotoObservacion)
    {
        // You might want to validate and handle the photo upload in more detail
        $this->fotoObservacion = $fotoObservacion;
    }

    public function setTipoObservacion($tipoObservacion)
    {
        // Assuming $tipoObservacion is validated elsewhere
        $this->tipoObservacion = $tipoObservacion;
    }

    public function setTipoPrestamo($tipoPrestamo)
    {
        // Assuming $tipoPrestamo is validated elsewhere
        $this->tipoPrestamo = $tipoPrestamo;
    }

    public function setIdEspacio($idEspacio)
    {
        if (Validator::validateNaturalNumber($idEspacio)) {
            $this->idEspacio = $idEspacio;
            return true;
        } else {
            return false;
        }
    }

    public function setIdUsuario($idUsuario)
    {
        if (Validator::validateNaturalNumber($idUsuario)) {
            $this->idUsuario = $idUsuario;
            return true;
        } else {
            return false;
        }
    }

    public function setIdPrestamo($idPrestamo)
    {
        if (Validator::validateNaturalNumber($idPrestamo)) {
            $this->idPrestamo = $idPrestamo;
            return true;
        } else {
            return false;
        }
    }

    public function create()
    {
        $params = array(
            $this->fechaObservacion,
            $this->observacion,
            $this->fotoObservacion,
            $this->tipoObservacion,
            $this->tipoPrestamo,
            $this->idEspacio,
            $this->idUsuario,
            $this->idPrestamo
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
            $this->fechaObservacion,
            $this->observacion,
            $this->fotoObservacion,
            $this->tipoObservacion,
            $this->tipoPrestamo,
            $this->idEspacio,
            $this->idUsuario,
            $this->idPrestamo,
            $this->idObservacion
        );
        return parent::updateObservacion($params);
    }

    public function delete($idObservacion)
    {
        return parent::deleteObservacion($idObservacion);
    }
}
?>
