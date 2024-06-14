<?php
// Inicia la sesión en el servidor. Esto debe estar al principio de cualquier script que maneje sesiones.
session_start();

// Inicializa un arreglo llamado $result que contendrá el estado de la operación y otros datos.
$result = array(
    'status' => 0,        // Indica si la operación fue exitosa o no (0 para fallo, 1 para éxito).
    'message' => null,    // Mensaje informativo sobre el resultado de la operación.
    'dataset' => null,    // Aquí se podrían incluir datos adicionales, aunque no se usa en este script.
    'error' => null       // Mensaje de error en caso de que ocurra alguno.
);

// Verifica si la variable de sesión 'id_usuario' está definida, lo que indicaría que hay una sesión activa.
if (isset($_SESSION['id_usuario'])) {
    // Si 'id_usuario' está definida, establece que la operación fue exitosa.
    $result['status'] = 1;
    // Guarda el 'id_usuario' en el resultado para uso posterior.
    $result['id_usuario'] = $_SESSION['id_usuario'];
    // Define un mensaje indicando que la sesión está activa.
    $result['message'] = 'Sesión activa';
} else {
    // Si 'id_usuario' no está definida, indica que no hay una sesión activa.
    $result['status'] = 0;
    // Define un mensaje indicando que no hay sesión activa.
    $result['message'] = 'No hay sesión activa';
}

// Configura el tipo de contenido de la respuesta HTTP como JSON y establece el juego de caracteres a UTF-8.
header('Content-type: application/json; charset=utf-8');
// Convierte el arreglo $result a formato JSON y lo imprime para que sea devuelto como respuesta.
print(json_encode($result));
?>

?>
