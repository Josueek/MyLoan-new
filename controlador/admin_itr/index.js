// Primero verificar si ya hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../api/services/sesion_status.php');
        const data = await response.json();
        
        if (data.status === 1) {
            // Si hay una sesión activa, redirigir automáticamente
            window.location.href = '../vistas/vistas_admin/inicio.html';
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
    }
});




// Enviar el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('../api/services/login_services.php?action=login', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.status === 1) {
            // Inicio de sesión correcto
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: `Bienvenido de nuevo, ${data.nombre}`,
            }).then(() => {
                window.location.href = '../vistas/vistas_admin/inicio.html';
            });
        } else {
            // Error en las credenciales o en la cuenta
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error || 'No puedes iniciar sesión porque ya hay una sesión activa, primero cierra sesión o refresca la pagina.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.'
        });
    }
});

// Alternar visibilidad de la contraseña
document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('inputPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const icon = document.querySelector('#togglePassword i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});
