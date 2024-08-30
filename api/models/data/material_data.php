<?php
require_once('../helpers/validator.php');
require_once('../models/handler/material_handler.php');

class MaterialData extends MaterialHandler
{
    private $data_error = null;
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

    public function setTipoInventario($tipo)
    {
        if (Validator::validateAlphabetic($tipo)) {
            $this->tipoInventario = $tipo;
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

    public function create()
    {
        $params = array(
            $this->nombre,
            $this->descripcion,
            $this->cantidad
        );
        return $this->addMaterial($params);
    }

    public function getMaterialById($id)
    {
        return parent::getMaterialById($id);
    }

    public function update()
    {
        $params = array(
            $this->nombre,
            $this->descripcion,
            $this->cantidad,
            $this->id
        );
        return parent::updateMaterial($params);
    }

    public function delete($id)
    {
        return parent::deleteMaterial($id);
    }

    // Método adicional de error
    public function getDataError()
    {
        return $this->data_error;
    }
}
