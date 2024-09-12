<?php
require_once('../helpers/validator.php');
require_once('../models/handler/cursofecha_handler.php');

class CursoFechaData extends CursoFechaHandler
{
   
    

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

    public function setFechaInicio($fecha_inicio)
    {
        if (Validator::validateDate($fecha_inicio)) {
            $this->fecha_inicio = $fecha_inicio;
            return true;
        } else {
            return false;
        }
    }

    public function setFechaFin($fecha_fin)
    {
        if (Validator::validateDate($fecha_fin)) {
            $this->fecha_fin = $fecha_fin;
            return true;
        } else {
            return false;
        }
    }

    public function setCantidadPersonas($cantidad_personas)
    {
        if (Validator::validateNaturalNumber($cantidad_personas)) {
            $this->cantidad_personas = $cantidad_personas;
            return true;
        } else {
            return false;
        }
    }

    public function setGrupo($grupo)
    {
        if (Validator::validateString($grupo)) {
            $this->grupo = $grupo;
            return true;
        } else {
            return false;
        }
    }

    public function setProgramaFormacion($programa_formacion)
    {
        if (Validator::validateString($programa_formacion)) {
            $this->programa_formacion = $programa_formacion;
            return true;
        } else {
            return false;
        }
    }

    public function setCodigo($codigo)
    {
        if (Validator::validateString($codigo)) {
            $this->codigo = $codigo;
            return true;
        } else {
            return false;
        }
    }

    public function setEmpleado($empleado)
    {
        if (Validator::validateNaturalNumber($empleado)) {
            $this->empleado = $empleado;
            return true;
        } else {
            return false;
        }
    }

    public function setEstado($estado)
    {
        if (Validator::validateString($estado)) {
            $this->estado = $estado;
            return true;
        } else {
            return false;
        }
    }

   

    
}
?>
