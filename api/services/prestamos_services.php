<?php 
require_once('../helpers/database.php'); // Se requiere el archivo para manejar la conexión a la base de datos.
require_once('../helpers/validator.php'); // Se requiere el archivo para validar datos.
require_once('../models/data/prestamos_data.php'); // Se requiere el archivo de datos para manejar operaciones sobre préstamos.

session_start(); // Inicia la sesión.
$prestamo = new PrestamosData(); // Crea un nuevo objeto de la clase PrestamosData.
$result = array('status' => 0, 'message' => null, 'dataset' => null); // Inicializa el resultado.

// Inicializa la conexión a la base de datos
// La conexión ahora se maneja dentro de la clase Database
// No necesitas crear una nueva conexión aquí, porque ya la manejas en los métodos de Database.

if (isset($_GET['action'])) { // Verifica si se ha enviado una acción.

    // Función para obtener el último ID de préstamo
    function getLastPrestamoId() {
        // Se ejecuta la consulta para obtener el último ID
        $query = "SELECT MAX(id_prestamo) as last_id FROM tb_prestamos";
        $result = Database::getRow($query); // Utiliza el método getRow de la clase Database

        if ($result) {
            return $result['last_id']; // Devuelve el ID máximo
        }

        return null; // Si no hay ningún préstamo, retorna null
    }

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
                    } else {
                        $result['message'] = 'No se pudo agregar el préstamo';
                    }
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        // Agregar los detalles del préstamo
        case 'addDetallePrestamo':
            // Validamos los datos del formulario
            $_POST = Validator::validateForm($_POST);
            $cantidad = $_POST['cantidad'] ?? null;
            $unidad = $_POST['unidad'] ?? null;
            $descripcion = $_POST['descripcion'] ?? null;
            $idEspacio = $_POST['idEspacio'] ?? null;
            $idEquipo = $_POST['idEquipo'] ?? null;
            $idMaterial = $_POST['idMaterial'] ?? null;
            $codigoHerramienta = $_POST['codigoHerramienta'] ?? null;

            // Validación de que al menos uno de los campos de ID esté lleno
            if (
                !empty($cantidad) &&
                !empty($unidad) &&
                (!empty($idEspacio) || !empty($idEquipo) || !empty($idMaterial) || !empty($codigoHerramienta))
            ) {
                // Obtenemos el último ID de préstamo
                $idPrestamo = getLastPrestamoId();

                // Preparamos la consulta para insertar los detalles
                $query = "INSERT INTO tb_detalle_prestamos (cantidad, unidad, descripcion, id_prestamo, id_espacio, id_equipo, id_material, codigo_herramienta) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                
                // Usa el método executeRow de Database para insertar
                $values = [$cantidad, $unidad, $descripcion, $idPrestamo, $idEspacio, $idEquipo, $idMaterial, $codigoHerramienta];
                if (Database::executeRow($query, $values)) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle del préstamo agregado correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar el detalle del préstamo';
                }
            } else {
                $result['message'] = 'Datos inválidos. Debe completar todos los campos requeridos.';
            }
            break;

            case 'getLastPrestamoId':
                // Obtener el último ID de préstamo
                $lastId = getLastPrestamoId();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['status' => true, 'lastId' => $lastId]);
                exit; // Detiene la ejecución aquí para evitar enviar más datos
            
    }

    // Establece el encabezado para que el contenido sea JSON y codifica el resultado como JSON.
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result); // Envía la respuesta al cliente.
}
?>
