<?php
require_once('../helpers/validator.php');
require_once('../models/handler/equipo_handler.php');

class EquipoData extends EquipoHandler
{
    private $id;
    private $nombre;
    private $descripcion;
    private $cantidad;
    private $espacio;
    private $institucion;

    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id = $id;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($nombre)
    {
        if (Validator::validateString($nombre)) {
            $this->nombre = $nombre;
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($descripcion)
    {
        if (Validator::validateString($descripcion)) {
            $this->descripcion = $descripcion;
            return true;
        } else {
            return false;
        }
    }

    public function setCantidad($cantidad)
    {
        if (Validator::validateNaturalNumber($cantidad)) {
            $this->cantidad = $cantidad;
            return true;
        } else {
            return false;
        }
    }

    public function setEspacio($espacio)
    {
        if (Validator::validateNaturalNumber($espacio)) {
            $this->espacio = $espacio;
            return true;
        } else {
            return false;
        }
    }

    public function setInstitucion($institucion)
    {
        if (Validator::validateNaturalNumber($institucion)) {
            $this->institucion = $institucion;
            return true;
        } else {
            return false;
        }
    }

    public function create()
    {
        $params = array(
            $this->nombre,
            $this->descripcion,
            $this->cantidad,
            $this->espacio,
            $this->institucion
        );
        return $this->addEquipo($params);
    }

    public function getEquipoById($idEquipo)
    {
        return parent::getEquipoById($idEquipo);
    }

    public function update()
    {
        $params = array(
            $this->nombre,
            $this->descripcion,
            $this->cantidad,
            $this->espacio,
            $this->institucion,
            $this->id
        );
        return parent::updateEquipo($params);
    }

    public function delete($idEquipo)
    {
        return parent::deleteEquipo($idEquipo);
    }
}
?>
