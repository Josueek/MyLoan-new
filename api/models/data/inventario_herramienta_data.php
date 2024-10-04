<?php
require_once('../helpers/validator.php');
require_once('../models/handler/inventario_herramienta_handler.php');

class InventarioHerramientaData extends InventarioHerramientaHandler
{
    private $codigo;
    private $nombre;
    private $stock;
    private $institucion;
    private $descripcion;

    public function setCodigo($codigo)
    {
        if (Validator::validateString($codigo)) {
            $this->codigo = $codigo;
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

    public function setStock($stock)
    {
        if (Validator::validateNaturalNumber($stock)) {
            $this->stock = $stock;
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

    public function setDescripcion($descripcion)
    {
        if (Validator::validateString($descripcion)) {
            $this->descripcion = $descripcion;
            return true;
        } else {
            return false;
        }
    }

    public function create()
    {
        $params = array(
            $this->codigo,
            $this->nombre,
            $this->stock,
            $this->institucion,
            $this->descripcion
        );
        return $this->addHerramienta($params);
    }

    public function getHerramientaByCodigo($codigoHerramienta)
    {
        return parent::getHerramientaByCodigo($codigoHerramienta);
    }

    public function update()
    {
        $params = array(
            $this->nombre,
            $this->stock,
            $this->institucion,
            $this->descripcion,
            $this->codigo
        );
        return parent::updateHerramienta($params);
    }

    public function delete($codigoHerramienta)
    {
        return parent::deleteHerramienta($codigoHerramienta);
    }
}
?>