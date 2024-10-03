<?phpr
require_once('../helpers/validator.php');
require_once('../models/handler/prestamo_handler.php');

class PrestamoData extends CursoHandler{

    private $data_error = null;
    public function create()
    {
        $params = array(
            $this->fecha_solicitud,
            $this->programa_formacion,
            $this->estado_prestamo,
            $this->observacion,
            $this->id_curso,
            $this->id_usuario,
        );
        return $this->AddPrestamo($params);
    }
}

?>