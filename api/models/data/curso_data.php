<?php
require_once('../helpers/validator.php');
require_once('../models/handler/curso_handler.php');

class CursoData extends CursoHandler
{
    private $id;
    private $nombre;
    private $fecha_inicio;
    private $fecha_fin;
    private $cantidad_personas;
    private $grupo;
    private $programa_formacion;
    private $codigo;
    private $empleado;
    private $estado;

    

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

    public function create()
    {
        $params = array(
            $this->nombre,
            $this->fecha_inicio,
            $this->fecha_fin,
            $this->cantidad_personas,
            $this->grupo,
            $this->programa_formacion,
            $this->codigo,
            $this->empleado,
            $this->estado
        );
        return $this->addCurso($params);
    }

    public function getCursoById($idCurso)
    {
        return parent::getCursoById($idCurso);
    }
    
    public function getCursoByIdCompleto($idCurso)
    {
        return parent::getCursoByIdCompleto($idCurso);
    }

    public function update()
    {
        $params = array(
            $this->nombre,
            $this->fecha_inicio,
            $this->fecha_fin,
            $this->cantidad_personas,
            $this->grupo,
            $this->programa_formacion,
            $this->codigo,
            $this->empleado,
            $this->estado,
            $this->id
        );
        return parent::updateCurso($params);
    }

    public function delete($idCurso)
    {
        return parent::deleteCurso($idCurso);
    }

    
}
?>
