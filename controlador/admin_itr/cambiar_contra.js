// Función para validar si las contraseñas coinciden
function validarContraseñas() {
    var newPassword = document.getElementById('inputNewPassword').value.trim();
    var confirmPassword = document.getElementById('inputConfirmPassword').value.trim();
    
    // Verificar si ambos campos están llenos
    if (newPassword === '' || confirmPassword === '') {
        mostrarError('Por favor, completa ambos campos de contraseña.');
        return;
    }

    // Verificar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
        mostrarError('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    // Mostrar un mensaje de éxito utilizando SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada con éxito',
        text: 'Tu contraseña ha sido cambiada correctamente.',
        showCancelButton: false,
        confirmButtonText: 'Continuar',
    }).then((result) => {
        // Redirigir al usuario a index.html cuando se haga clic en el botón de confirmación
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
}

// Función para mostrar una alerta de error
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
    });
}

// Evento de clic en el botón "Cambiar contraseña"
document.getElementById('btn-cambiar-contraseña').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Validar las contraseñas antes de cambiarla
    validarContraseñas();
});
