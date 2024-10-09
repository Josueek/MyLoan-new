<?php
session_start();  // Inicia la sesión PHP para permitir el uso de variables de sesión.
session_destroy();  // Destruye todas las variables de sesión existentes. Esto asegura que el usuario actual se desconecte y elimina cualquier dato de sesión almacenado.
header("Location: ../../vistas/index.html");  // Redirige al usuario a la página de inicio index.html dentro del directorio vistas. Esto se usa comúnmente para dirigir al usuario a una página principal o de inicio de sesión después de cerrar sesión.
exit();  // Detiene la ejecución adicional del script para asegurar que la redirección se realice correctamente y no se procese más código innecesario.


?>
    