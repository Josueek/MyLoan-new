document.addEventListener('DOMContentLoaded', function () {
    let timeout;

    // Función para reiniciar el temporizador
    function resetTimer() {
        clearTimeout(timeout);
        // Iniciar un nuevo temporizador de 5 segundos (5000 milisegundos)
        timeout = setTimeout(logout, 300000); // 5 segundos
    }

    function logout() {
        // Mostrar alerta de SweetAlert
        Swal.fire({
            icon: 'warning',
            title: 'Sesión cerrada',
            text: 'Tu sesión ha sido cerrada por inactividad.',
            willClose: () => {
                // Redirigir al script de cierre de sesión después de que la alerta se cierre
                window.location.href = '../../api/services/cerrar_sesion.php'; // Cambia esto a la ruta de tu script PHP
            }
        });
    }

    // Reiniciar el temporizador cuando el usuario realiza alguna acción
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onkeypress = resetTimer;
    window.onclick = resetTimer;
    window.onscroll = resetTimer;

});