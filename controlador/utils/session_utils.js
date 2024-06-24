/**
 * Función para verificar si hay una sesión activa.
 * Realiza una petición al servidor para comprobar el estado de la sesión.
 */
async function checkSession() {
    try {
        // Realiza una petición al script PHP que verifica el estado de la sesión
        const response = await fetch('../../api/services/sesion_status.php');
        
        // Convierte la respuesta en un objeto JSON
        const data = await response.json();

        // Si no hay una sesión activa, redirige al usuario a la página de inicio de sesión
        if (!data.status) {
            window.location.href = '../../vistas/index.html';
        }
    } catch (error) {
        // En caso de error durante la petición, muestra un mensaje de error en la consola
        console.error('Error verificando la sesión:', error);

        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '../../vistas/index.html';
    }
}

// Ejecuta la función checkSession cuando el contenido del DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});
