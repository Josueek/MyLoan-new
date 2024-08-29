<?php
require_once('../helpers/validator.php');
require_once('../models/handler/mis_observaciones_handler.php');

/**
 * Clase para manejar los datos de las observaciones.
 */
class MisObservacionesData extends MisObservacionesHandler
{
    private $id;
    private $fechaObservacion;
    private $observacion;
    private $fotoObservacion;
    private $tipoObservacion;
    private $tipoPrestamo;  
    private $idEspacio;
    private $idPrestamo;
    private $idUsuario;

  

    // Métodos setter con validación
    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }

    public function setFechaObservacion($fechaObservacion)
    {
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
        if (Validator::validateString($fotoObservacion)) {
            $this->fotoObservacion = $fotoObservacion;
            return true;
        } else {
            return false;
        }
    }

    public function setTipoObservacion($tipoObservacion)
    {
        if (Validator::validateString($tipoObservacion)) {
            $this->tipoObservacion = $tipoObservacion;
            return true;
        } else {
            return false;
        }
    }

    public function setTipoPrestamo($tipoPrestamo)
    {
        if (Validator::validateString($tipoPrestamo)) {
            $this->tipoPrestamo = $tipoPrestamo;
            return true;
        } else {
            return false;
        }
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

    public function setIdPrestamo($idPrestamo)
    {
        if (Validator::validateNaturalNumber($idPrestamo)) {
            $this->idPrestamo = $idPrestamo;
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

    // Métodos CRUD
    public function create()
    {
        $params = array(
            $this->fechaObservacion,
            $this->observacion,
            $this->fotoObservacion,
            $this->tipoObservacion,
            $this->tipoPrestamo,
            $this->idEspacio,
            $this->idPrestamo,
            $this->idUsuario
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
            $this->idPrestamo,
            $this->idUsuario,
            $this->id
        );
        return parent::updateObservacion($params);
    }

    public function delete($idObservacion)
    {
        return parent::deleteObservacion($idObservacion);
    }

    public function getOpciones()
    {
        return parent::getOpciones();
    }
}
?>
