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

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('inputPassword');
    const confirmPasswordInput = document.getElementById('inputConfirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const passwordInfo = document.getElementById('passwordInfo');

    // Validación de formato de contraseña
    function validarFormatoContrasena(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,72}$/;
        return regex.test(password);
    }

    // Mostrar las reglas cuando el campo tenga foco
    passwordInput.addEventListener('focus', () => {
        passwordInfo.style.display = 'block';
    });

    // Ocultar las reglas cuando el campo pierda el foco
    passwordInput.addEventListener('blur', () => {
        passwordInfo.style.display = 'none';
    });

    // Validar el formato y la confirmación de la contraseña cuando se haga clic en el botón de enviar
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar el envío del formulario de inmediato

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validar formato de la contraseña
        if (!validarFormatoContrasena(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña no cumple con los requisitos. Asegúrate de que tenga entre 8 y 72 caracteres, con al menos una letra mayúscula, una minúscula, un número y un carácter especial.'
            });
            return; // Salir si la contraseña no cumple con los requisitos
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.'
            });
            return; // Salir si las contraseñas no coinciden
        }

        // Solo se ejecuta si la contraseña es válida y las contraseñas coinciden
        const formData = new FormData(document.getElementById('registroForm'));

        fetch('../api/services/registro_services.php?action=signUp', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Registro completado. Redirigiendo...'
                    }).then(() => {
                        window.location.href = 'registro_continuacion.html';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.error
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un problema durante el registro'
                });
            });
    });

    // Función para mostrar/ocultar contraseñas
    document.getElementById('togglePassword').addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = document.querySelector('#togglePassword i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        const icon = document.querySelector('#toggleConfirmPassword i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});
