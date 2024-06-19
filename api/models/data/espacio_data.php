<?php
require_once('../helpers/validator.php');
require_once('../models/handler/espacio_handler.php');

class EspacioData extends EspacioHandler
{
    private $nombre;
    private $capacidad;
    private $tipo;
    private $encargado;
    private $especialidad;
    private $institucion;
    private $imagen;
    private $inventario;

    public function setNombre($nombre)
    {
        if (Validator::validateString($nombre)) {
            $this->nombre = $nombre;
            return true;
        } else {
            return false;
        }
    }

    public function setCapacidad($capacidad)
    {
        if (Validator::validateNaturalNumber($capacidad)) {
            $this->capacidad = $capacidad;
            return true;
        } else {
            return false;
        }
    }

    public function setTipo($tipo)
    {
        if (Validator::validateString($tipo)) {
            $this->tipo = $tipo;
            return true;
        } else {
            return false;
        }
    }

    public function setEncargado($encargado)
    {
        if (Validator::validateNaturalNumber($encargado)) {
            $this->encargado = $encargado;
            return true;
        } else {
            return false;
        }
    }

    public function setEspecialidad($especialidad)
    {
        if (Validator::validateNaturalNumber($especialidad)) {
            $this->especialidad = $especialidad;
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

    public function setImagen($imagen)
    {
        if ($imagen['error'] === UPLOAD_ERR_OK && Validator::validateImageFile($imagen, 500, 500)) {
            $this->imagen = uniqid() . '.' . pathinfo($imagen['name'], PATHINFO_EXTENSION);
            return true;
        } else {
            return false;
        }
    }

    public function setInventario($inventario)
    {
        if ($inventario['error'] === UPLOAD_ERR_OK) {
            $fileType = pathinfo($inventario['name'], PATHINFO_EXTENSION);
            if (in_array($fileType, ['pdf', 'doc', 'docx', 'xls', 'xlsx'])) {
                $this->inventario = uniqid() . '.' . $fileType;
                return true;
            }
        }
        return false;
    }

    public function save()
    {
        $params = array(
            $this->nombre,
            $this->capacidad,
            $this->tipo,
            $this->encargado,
            $this->especialidad,
            $this->institucion,
            $this->inventario,
            $this->imagen
        );

        if ($this->addEspacio($params)) {
            if ($this->imagen) {
                move_uploaded_file($_FILES['imagenEspacio']['tmp_name'], '../../api/images/espacios/' . $this->imagen);
            }
            if ($this->inventario) {
                move_uploaded_file($_FILES['inventarioEspacio']['tmp_name'], '../../api/inventario/' . $this->inventario);
            }
            return true;
        } else {
            return false;
        }
    }
}
?>
