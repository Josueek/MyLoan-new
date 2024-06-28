<?php
require_once('../helpers/validator.php');
require_once('../models/handler/gestionarEmpleadoHandler.php');

class GestionarEmpleadoData extends GestionarEmpleadoHandler
{
    private $data_error = null;

    public function getDataError()
    {
        return $this->data_error;
    }

    public function saveDetails()
    {
        return $this->createRow();
    }

    public function getAllEmployees()
    {
        return $this->readAll();
    }

    public function getEmployeeById($id)
    {
        if ($this->setId($id)) {
            return $this->readOne();
        } else {
            return null;
        }
    }

    public function updateEmployee($id, $estado)
    {
        if ($this->setId($id) && $this->setEstado($estado)) {
            return $this->updateRow();
        } else {
            return false;
        }
    }

    public function deleteEmployee($id)
    {
        if ($this->setId($id)) {
            return $this->deleteRow();
        } else {
            return false;
        }
    }
}
