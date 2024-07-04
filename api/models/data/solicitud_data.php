<?php
require_once('../helpers/validator.php');
require_once('../models/handler/solicitud_handler.php');

/**
 * Clase para manejar los datos de las solicitudes de préstamos.
 */
class SolicitudData extends SolicitudHandler
{
    private $id;
    private $fechaSolicitud;
    private $programaFormacion;
    private $estadoPrestamo;
    private $observacion;
    private $idCurso;
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

    public function setFechaSolicitud($fechaSolicitud)
    {
        if (Validator::validateDate($fechaSolicitud)) {
            $this->fechaSolicitud = $fechaSolicitud;
            return true;
        } else {
            return false;
        }
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
        if (Validator::validateString($observacion)) {
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

    // Métodos CRUD
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
        return $this->addSolicitud($params);
    }

    public function getSolicitudById($idPrestamo)
    {
        return parent::getSolicitudById($idPrestamo);
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
        return parent::updateSolicitud($params);
    }

    public function delete($idPrestamo)
    {
        return parent::deleteSolicitud($idPrestamo);
    }
}
?>
