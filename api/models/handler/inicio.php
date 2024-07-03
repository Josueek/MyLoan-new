<?php
require_once('../helpers/database.php');

class EspacioHandler
{
    public function getAllEspacios($buscar = '', $filtrar = '')
    {
        $sql = 'SELECT * FROM tb_prestamos';
        $params = ["%$buscar%", $filtrar ? $filtrar : '%'];
        $data = Database::getRows($sql, $params);
        if ($data) {
            return array('status' => 1, 'dataset' => $data);
        } else {
            return array('status' => 0, 'message' => 'No se encontraron registros');
        }
    }
}
?>
