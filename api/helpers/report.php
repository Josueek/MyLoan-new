<?php
// Se incluye la clase para generar archivos PDF.
require_once('../../api/libs/fpdf185/fpdf.php');
// Se incluye la clase para manejar la base de datos.
require_once('../models/data/usuario_data.php');

/*
 *   Clase para definir las plantillas de los reportes del sitio.
 *   Para más información http://www.fpdf.org/
 */
class Report extends FPDF
{
    // Constante para definir la ruta de las vistas del sitio.
    const CLIENT_URL = 'http://localhost/MyLoan-new/vistas/vistas_admin/';
    // Propiedad para guardar el título del reporte.
    private $title = null;
    // Propiedad para guardar el nombre del administrador.
    private $adminName = null;

    /*
     *   Método para iniciar el reporte con el encabezado del documento.
     *   Parámetros: $title (título del reporte).
     *   Retorno: ninguno.
     */
    public function startReport($title)
    {
        session_start();
        if (isset($_SESSION['id_usuario'])) {
            $this->title = $title;
            $this->setTitle('MyLoan Report', true);
            $this->setMargins(15, 15, 15);
            $this->addPage('p', 'letter');
            $this->aliasNbPages();
            $this->adminName = $this->getAdminName($_SESSION['id_usuario']);
        } else {
            header('location:' . self::CLIENT_URL);
            exit();
        }
    }

    /*
     *   Método para obtener el nombre del administrador en sesión.
     *   Parámetros: $adminId (ID del administrador).
     *   Retorno: nombre del administrador.
     */
    private function getAdminName($userId)
    {
        $db = new Database;
        $sql = 'SELECT CONCAT(nombre_empleado, " ", apellido_empleado) AS nombre_completo 
                FROM tb_datos_empleados 
                WHERE id_usuario = ?';
        $params = array($userId);
        if ($data = $db->getRow($sql, $params)) {
            return $data['nombre_completo'];
        } else {
            return 'Desconocido'; // Devuelve 'Desconocido' si no se encuentra el nombre
        }
    }

    /*
     *   Método para codificar una cadena de alfabeto español a UTF-8.
     *   Parámetros: $string (cadena).
     *   Retorno: cadena convertida.
     */
    public function encodeString($string)
    {
        return mb_convert_encoding($string, 'ISO-8859-1', 'utf-8');
    }

    /*
     *   Se sobrescribe el método de la librería para establecer la plantilla del encabezado de los reportes.
     *   Se llama automáticamente en el método addPage()
     */
    public function header()
    {
        // Establecer color de fondo
        $this->setFillColor(252, 190, 45); // Color de fondo en RGB
        $this->rect(0, 0, $this->w, 30, 'F'); // Fondo del encabezado

        // Se establece el logo.
        $this->image('../../recursos/img/logos/myloan_logo.png', 15, 7, 25);
        // Se ubica el título.
        $this->setY(10); // Ajustar la altura del título para que quede alineado con el logo
        $this->setFont('Arial', 'B', 15);
        $this->setTextColor(255, 255, 255); // Color del texto
        $this->cell(0, 10, $this->encodeString($this->title), 0, 1, 'C');

        // Se agrega un salto de línea para mostrar el contenido principal del documento.
        $this->ln(20);
    }

    /*
     *   Se sobrescribe el método de la librería para establecer la plantilla del pie de los reportes.
     *   Se llama automáticamente en el método output()
     */
    public function footer()
    {
        // Establecer color de fondo
        $this->setY(-25);
        $this->setFillColor(255, 255, 255); // Color de fondo en RGB
        $this->rect(0, $this->h - 25, $this->w, 25, 'F'); // Fondo del pie de página

        // Se establece la posición para la fecha y hora
        $this->setY($this->h - 20);
        $this->setFont('Arial', 'B', 8);
        $this->setTextColor(0, 0, 0); // Color del texto
        $this->cell(0, 10, $this->encodeString('Fecha/Hora: ' . date('d-m-Y H:i:s')), 0, 1, 'C');

        // Se establece la posición para el número de página
        $this->cell(0, 10, $this->encodeString('Página ') . $this->pageNo() . '/{nb}', 0, 0, 'C');

        // Se muestra el nombre del administrador en el pie de página
        $this->setY($this->h - 15);
        $this->cell(0, 10, $this->encodeString('Generado por: ' . $this->adminName), 0, 1, 'C');
    }
}
?>