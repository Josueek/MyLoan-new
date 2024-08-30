<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/handler/inventario_herramienta_handler.php');
require_once('../models/data/inventario_herramienta_data.php');

if (isset($_GET['action'])) {
    session_start();
    $herramienta = new InventarioHerramientaData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null);

    switch ($_GET['action']) {
        case 'getAllHerramientas':
            $buscar = isset($_GET['buscar']) ? $_GET['buscar'] : '';
            $filtrar = isset($_GET['filtrar']) ? $_GET['filtrar'] : '';
            $result = $herramienta->getAllHerramientas($buscar, $filtrar);
            break;

        case 'getAllInstituciones':
            $result = array('status' => 1, 'dataset' => $herramienta->getAllInstituciones());
            break;

        case 'addHerramienta':
            $_POST = Validator::validateForm($_POST);
            if (
                $herramienta->setCodigo($_POST['codigo']) &&
                $herramienta->setNombre($_POST['nombre']) &&
                $herramienta->setStock($_POST['stock']) &&
                $herramienta->setInstitucion($_POST['institucion']) &&
                $herramienta->setDescripcion($_POST['descripcion'])
            ) {
                if ($herramienta->create()) {
                    $result['status'] = 1;
                    $result['message'] = 'Herramienta agregada correctamente';
                } else {
                    $result['message'] = 'No se pudo agregar la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'getHerramienta':
            if (isset($_GET['codigo']) && Validator::validateString($_GET['codigo'])) {
                if ($result['dataset'] = $herramienta->getHerramientaByCodigo($_GET['codigo'])) {
                    $result['status'] = 1;
                } else {
                    $result['message'] = 'No se pudieron obtener los datos de la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'updateHerramienta':
            $_POST = Validator::validateForm($_POST);
            if (
                $herramienta->setCodigo($_POST['codigo']) &&
                $herramienta->setNombre($_POST['nombre']) &&
                $herramienta->setStock($_POST['stock']) &&
                $herramienta->setInstitucion($_POST['institucion']) &&
                $herramienta->setDescripcion($_POST['descripcion'])
            ) {
                if ($herramienta->update()) {
                    $result['status'] = 1;
                    $result['message'] = 'Herramienta actualizada correctamente';
                } else {
                    $result['message'] = 'No se pudo actualizar la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'deleteHerramienta':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['codigoHerramienta']) && Validator::validateString($data['codigoHerramienta'])) {
                if ($herramienta->delete($data['codigoHerramienta'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Herramienta eliminada correctamente';
                } else {
                    $result['message'] = 'No se pudo eliminar la herramienta';
                }
            } else {
                $result['message'] = 'Datos inválidos';
            }
            break;

        case 'crearPrestamo':
            $data = json_decode(file_get_contents('php://input'), true);

            // Validar los datos recibidos
            if (
                !empty($data['fechaSolicitud']) &&
                !empty($data['programaFormacion']) &&
                !empty($data['usuarioSolicitante']) &&
                !empty($data['curso']) &&
                isset($data['articulos']) && is_array($data['articulos'])
            ) {

                // Iniciar una transacción
                Database::getConnection()->beginTransaction();

                try {
                    // Insertar datos en la tabla de préstamos
                    $sql = "INSERT INTO tb_prestamos (fecha_solicitud, programa_formacion, estado_prestamo, observacion, id_curso, id_usuario) 
                            VALUES (:fechaSolicitud, :programaFormacion, 1, :observacion, :curso, :usuarioSolicitante)";
                    $params = array(
                        ':fechaSolicitud' => $data['fechaSolicitud'],
                        ':programaFormacion' => $data['programaFormacion'],
                        ':observacion' => $data['observacion'],
                        ':curso' => $data['curso'],
                        ':usuarioSolicitante' => $data['usuarioSolicitante']
                    );
                    $stmt = Database::getConnection()->prepare($sql);
                    $stmt->execute($params);
                    $prestamoId = Database::getConnection()->lastInsertId();

                    // Insertar datos en la tabla de detalles del préstamo
                    foreach ($data['articulos'] as $articulo) {
                        $sql = "INSERT INTO detalle_prestamo (cantidad, unidad, descripcion, id_prestamo, codigo_herramienta) 
                                VALUES (:cantidad, :unidad, :descripcion, :prestamoId, :codigoHerramienta)";
                        $params = array(
                            ':cantidad' => $articulo['cantidad'],
                            ':unidad' => $articulo['unidad'],
                            ':descripcion' => $articulo['descripcion'],
                            ':prestamoId' => $prestamoId,
                            ':codigoHerramienta' => $articulo['articulo']  // Assuming this is the 'codigoHerramienta'
                        );
                        $stmt = Database::getConnection()->prepare($sql);
                        $stmt->execute($params);

                        // Actualizar el stock de la herramienta
                        $sql = "UPDATE herramientas SET stock = stock - :cantidad WHERE codigo_herramienta = :codigoHerramienta";
                        $params = array(
                            ':cantidad' => $articulo['cantidad'],
                            ':codigoHerramienta' => $articulo['articulo']  // Assuming this is the 'codigoHerramienta'
                        );
                        $stmt = Database::getConnection()->prepare($sql);
                        $stmt->execute($params);
                    }

                    // Confirmar la transacción
                    Database::getConnection()->commit();
                    $result['status'] = 1;
                    $result['message'] = 'Préstamo creado con éxito';
                } catch (Exception $e) {
                    // Revertir la transacción en caso de error
                    Database::getConnection()->rollBack();
                    $result['message'] = 'Error al crear el préstamo: ' . $e->getMessage();
                }
            } else {
                $result['message'] = 'Datos del préstamo incompletos o inválidos';
            }
            break;

        default:
            $result['message'] = 'Acción no disponible';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
