<?php
require_once('../helpers/database.php'); // Se requiere el archivo para manejar la conexión a la base de datos.
require_once('../helpers/validator.php'); // Se requiere el archivo para validar datos.
require_once('../models/data/prestamos_data.php'); // Se requiere el archivo de datos para manejar operaciones sobre préstamos.

session_start(); // Inicia la sesión.
$prestamo = new PrestamosData(); // Crea un nuevo objeto de la clase PrestamosData.
$result = array('status' => 0, 'message' => null, 'dataset' => null); // Inicializa el resultado.

if (isset($_GET['action'])) { // Verifica si se ha enviado una acción.
    // Inicializa la conexión a la base de datos
    $database = new Database(); // Asegúrate de que este constructor esté definido correctamente en tu clase Database.

    switch ($_GET['action']) { // Comienza el switch para manejar diferentes acciones.


        case 'getAllPrestamos':
            // Obtiene todos los préstamos, con opción de búsqueda y filtrado.
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';
            $result = $prestamo->getAllPrestamos($buscar, $filtrar);
            break;

        case 'getPrestamoById':
            // Obtiene un préstamo por su ID.
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['idPrestamo']) && Validator::validateNaturalNumber($data['idPrestamo'])) {
                if ($result['dataset'] = $prestamo->getPrestamoById($data['idPrestamo'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudo obtener el préstamo';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'addPrestamo':
            // Valida los datos del formulario.
            $_POST = Validator::validateForm($_POST);
            $fechaSolicitud = $_POST['fechaSolicitud'] ?? null;
            $programaFormacion = $_POST['programaFormacion'] ?? null;
            $observacion = $_POST['observacion'] ?? null;
            $idCurso = $_POST['idCurso'] ?? null;
            $idUsuario = $_POST['idUsuario'] ?? null;

            // Validaciones de los datos recibidos.
            if (
                $fechaSolicitud &&
                $programaFormacion &&
                $observacion &&
                Validator::validateNaturalNumber($idCurso) &&
                Validator::validateNaturalNumber($idUsuario)
            ) {
                // Validar que la fecha no sea menor que la fecha actual
                $fechaActual = date('Y-m-d');
                if ($fechaSolicitud < $fechaActual) {
                    $result['message'] = 'La fecha de solicitud no puede ser menor que la fecha actual.';
                } else {
                    // Asignamos el estado del préstamo a "En Espera"
                    $prestamo->setFechaSolicitud($fechaSolicitud);
                    $prestamo->setProgramaFormacion($programaFormacion);
                    $prestamo->setObservacion($observacion);
                    $prestamo->setIdCurso($idCurso);
                    $prestamo->setIdUsuario($idUsuario);
                    $prestamo->setEstadoPrestamo('En Espera'); // Estado forzado a 'En Espera'

                    // Creamos el préstamo
                    if ($prestamo->create()) {
                        $result['status'] = 1;
                        $result['message'] = 'Préstamo agregado correctamente';

                        // Obtener el último ID del préstamo y guardarlo en el resultado
                        $query = "SELECT MAX(id_prestamo) as id_prestamo FROM tb_prestamos";
                        $lastIdResult = Database::getRow($query);
                        if ($lastIdResult) {
                            $result['lastPrestamoId'] = $lastIdResult['id_prestamo']; // Agregar el ID del último préstamo a la respuesta
                        }
                    } else {
                        $result['message'] = 'No se pudo agregar el préstamo';
                    }
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;
    }

    // Establece el encabezado para que el contenido sea JSON y codifica el resultado como JSON.
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result); // Envía la respuesta al cliente.
}