document.addEventListener('DOMContentLoaded', function() {
    var continuarBtn = document.querySelector('.btn-custom');

    continuarBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        
        var email = document.getElementById('inputEmail').value.trim();
        var password = document.getElementById('inputPassword').value.trim();
        var cargo = document.getElementById('inputCargo').value;

        // Validar correo electrónico
        if (!isValidEmail(email)) {
            mostrarError('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validar contraseña
        if (!password) {
            mostrarError('Por favor, ingresa una contraseña.');
            return;
        }

        // Validar selección de cargo
        if (cargo === 'Selecciona un cargo') {
            mostrarError('Por favor, selecciona un cargo.');
            return;
        }

        // Si todos los campos son válidos, mostrar Sweet Alert con el botón "Continuar"
        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Bienvenido a MyLoan. ¿Deseas continuar con el registro?',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redireccionar al usuario a la página de registro_continuacion
                window.location.href = 'registro_continuacion.html';
            }
        });
    });

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar una alerta de error
    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }
});
