<?php
// Importamos las clases necesarias.
require_once('../helpers/validator.php'); // Para las validaciones de datos.
require_once('../models/handler/prestamos_handler.php'); // Para heredar la funcionalidad de PrestamosHandler.

class PrestamosData extends PrestamosHandler
{
    // Variable privada para manejar errores de datos.
    private $data_error = null;

    // Método para establecer el ID del préstamo, validando que sea un número natural.
    public function setId($id)
    {
        if (Validator::validateNaturalNumber($id)) {
            $this->id_prestamo = $id; // Asignamos el ID al atributo.
            return true; // Retornamos true si la validación es exitosa.
        }
        return false; // Retornamos false si no es válido.
    }

    // Método para establecer la fecha de solicitud del préstamo.
    public function setFechaSolicitud($fecha)
    {
        // Aquí podrías agregar validación del formato de fecha si es necesario.
        $this->fecha_solicitud = $fecha; // Asignamos la fecha al atributo.
    }

    // Método para establecer el programa de formación, validando que sea uno de los valores permitidos.
    public function setProgramaFormacion($programa)
    {
        if (in_array($programa, ['HTP', 'EC', 'FCAT'])) {
            $this->programa_formacion = $programa; // Asignamos el programa al atributo.
            return true; // Retornamos true si la validación es exitosa.
        }
        return false; // Retornamos false si el valor no es válido.
    }

    // Método para establecer el estado del préstamo, validando que sea uno de los valores permitidos.
    public function setEstadoPrestamo($estado)
    {
        if (in_array($estado, ['Aceptado', 'Denegado', 'En Espera'])) {
            $this->estado_prestamo = $estado; // Asignamos el estado al atributo.
            return true; // Retornamos true si la validación es exitosa.
        }
        return false; // Retornamos false si el valor no es válido.
    }

    // Método para establecer observaciones sobre el préstamo, validando la longitud máxima.
    public function setObservacion($observacion)
    {
        if (Validator::validateString($observacion, 300)) { // Limitar longitud si es necesario.
            $this->observacion = $observacion; // Asignamos la observación al atributo.
            return true; // Retornamos true si la validación es exitosa.
        }
        return false; // Retornamos false si no es válido.
    }

    // Método para establecer el ID del curso, validando que sea un número natural.
    public function setIdCurso($idCurso)
    {
        if (Validator::validateNaturalNumber($idCurso)) {
            $this->id_curso = $idCurso; // Asignamos el ID del curso al atributo.
            return true; // Retornamos true si la validación es exitosa.
        }
        return false; // Retornamos false si no es válido.
    }

    // Método para establecer el ID del usuario, validando que sea un número natural.
    public function setIdUsuario($idUsuario)
    {
        if (Validator::validateNaturalNumber($idUsuario)) {
            $this->id_usuario = $idUsuario; // Asignamos el ID del usuario al atributo.
            return true; // Retornamos true si la validación es exitosa.
        }
        return false; // Retornamos false si no es válido.
    }

    public function create()
{
    // Recopilamos los parámetros necesarios para la creación del préstamo.
    $params = array(
        $this->fecha_solicitud,
        $this->programa_formacion,
        'En Espera',  // Forzamos 'En Espera' al crear el préstamo
        $this->observacion,
        $this->id_curso,
        $this->id_usuario
    );
    
    // Llamamos al método createPrestamo de la clase padre para insertar el préstamo.
    return $this->createPrestamo();
}


    // Método para obtener un préstamo por su ID.
    public function getPrestamoById($id)
    {
        // Llamamos al método readOne heredado de la clase padre para obtener el préstamo.
        return parent::readOne($id);
    }

    // Método adicional para obtener errores en la manipulación de datos.
    public function getDataError()
    {
        return $this->data_error; // Retornamos cualquier error que se haya producido.
    }
}