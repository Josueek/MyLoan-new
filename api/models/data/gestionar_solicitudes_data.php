<?php
require_once('../helpers/validator.php');
require_once('../models/handler/prestamo_handler.php');

class PrestamoData extends PrestamoHandler
{
    private $id;
    private $fechaSolicitud;
    private $programaFormacion;
    private $estadoPrestamo;
    private $observacion;
    private $idCurso;
    private $idUsuario;

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }

    public function setFechaSolicitud($fechaSolicitud)
    {
        $this->fechaSolicitud = $fechaSolicitud;
        return true;
    }

    public function setProgramaFormacion($programaFormacion)
    {
        if (Validator::validateString($programaFormacion)) {
            $this->programaFormacion = $programaFormacion;
            return true;
        } else {
            return false;
        }
    }

    public function setEstadoPrestamo($estadoPrestamo)
    {
        if (Validator::validateString($estadoPrestamo)) {
            $this->estadoPrestamo = $estadoPrestamo;
            return true;
        } else {
            return false;
        }
    }

    public function setObservacion($observacion)
    {
        if (Validator::validateString($observacion, null, 300)) {
            $this->observacion = $observacion;
            return true;
        } else {
            return false;
        }
    }

    public function setIdCurso($idCurso)
    {
        if (Validator::validateNaturalNumber($idCurso)) {
            $this->idCurso = $idCurso;
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

    public function create()
    {
        $params = array(
            $this->fechaSolicitud,
            $this->programaFormacion,
            $this->estadoPrestamo,
            $this->observacion,
            $this->idCurso,
            $this->idUsuario
        );
        return $this->addPrestamo($params);
    }

    public function getPrestamoById($id)
    {
        return parent::getPrestamoById($id);
    }

    public function update()
    {
        $params = array(
            $this->fechaSolicitud,
            $this->programaFormacion,
            $this->estadoPrestamo,
            $this->observacion,
            $this->idCurso,
            $this->idUsuario,
            $this->id
        );
        return parent::updatePrestamo($params);
    }

    public function delete($id)
    {
        return parent::deletePrestamo($id);
    }
}
?>
