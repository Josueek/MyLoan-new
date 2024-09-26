$(document).ready(function () {
    // Funcionalidad para mostrar/ocultar la nueva contraseña
    $('#toggleNewPassword').on('click', function () {
        const input = $('#inputNewPassword');
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
        $(this).find('i').toggleClass('far fa-eye far fa-eye-slash');
    });

    // Funcionalidad para mostrar/ocultar la contraseña de confirmación
    $('#toggleConfirmPassword').on('click', function () {
        const input = $('#inputConfirmPassword');
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
        $(this).find('i').toggleClass('far fa-eye far fa-eye-slash');
    });

    // Acción al hacer clic en el botón "Cambiar contraseña"
    $('#btn-cambiar-contraseña').on('click', function () {
        const nuevaContraseña = $('#inputNewPassword').val().trim();
        const confirmarContraseña = $('#inputConfirmPassword').val().trim();
        const correo = sessionStorage.getItem('correo_electronico'); // Recuperar correo del sessionStorage

        // Validar que las contraseñas no estén vacías y coincidan
        if (nuevaContraseña === '' || confirmarContraseña === '') {
            Swal.fire('Error', 'Por favor, completa ambos campos de contraseña.', 'error');
            return;
        }
        if (nuevaContraseña !== confirmarContraseña) {
            Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
            return;
        }

        // Hacer la solicitud para cambiar la contraseña
        cambiarContraseña(correo, nuevaContraseña).then(function (respuesta) {
            if (respuesta.cambiado) {
                Swal.fire('Éxito', 'Contraseña cambiada con éxito.', 'success').then(() => {
                    // Redirigir o realizar otra acción
                    window.location.href = 'index.html'; // Ejemplo de redirección
                });
            } else {
                Swal.fire('Error', respuesta.message, 'error');
            }
        }).catch(function () {
            Swal.fire('Error', 'Ocurrió un error al cambiar la contraseña. Inténtalo más tarde.', 'error');
        });
    });
});

// Función para cambiar la contraseña
function cambiarContraseña(correo, nuevaContraseña) {
    return $.ajax({
        url: '../api/services/cambiar_contra.php', // Ruta a tu archivo PHP
        method: 'POST',
        data: {
            correo_electronico: correo,
            nueva_contraseña: nuevaContraseña
        },
        dataType: 'json'
    });
}
