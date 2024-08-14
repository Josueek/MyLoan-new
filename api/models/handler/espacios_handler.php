<?php
require_once('../helpers/database.php');

class EspaciosHandler {
    public function getAllEspacios() {
        $sql = 'SELECT id_espacio, nombre_espacio FROM tb_espacios';
        $result = Database::getRows($sql);
        print_r($result); // Imprimir resultados para depuración
        return $result;
    }
}

// Ejecutar para depuración
$handler = new EspaciosHandler();
$handler->getAllEspacios();
?>
