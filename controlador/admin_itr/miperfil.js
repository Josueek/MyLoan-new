document.addEventListener('DOMContentLoaded', async () => {
    // Verificar si el usuario ha iniciado sesión
    const sessionCheck = await fetch('../api/services/session_check.php');
    const sessionData = await sessionCheck.json();

    if (!sessionData.loggedIn) {
        window.location.href = '../index.html'; // Redirigir al inicio de sesión si no hay sesión
    }

    // Cargar los datos del perfil
    const response = await fetch('../api/services/miperfil_services.php?action=getProfile');
    const data = await response.json();

    if (data.status) {
        document.getElementById('inputNombre').value = data.dataset.nombre;
        document.getElementById('inputApellido').value = data.dataset.apellido;
        document.getElementById('inputEmail').value = data.dataset.email;
        document.getElementById('inputTelefono').value = data.dataset.telefono;
        document.getElementById('inputEstado').value = data.dataset.estado;
        document.getElementById('inputInstitucion').value = data.dataset.institucion;
        document.getElementById('inputCargo').value = data.dataset.cargo;
        if (data.dataset.imagen) {
            document.querySelector('img[alt="Profile Picture"]').src = `../../api/images/perfil/${data.dataset.imagen}`;
        }

        Swal.fire({
            icon: 'success',
            title: 'Datos cargados con éxito',
            text: 'El perfil ha sido cargado correctamente.',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error,
        });
    }
});

document.getElementById('profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputClave = document.getElementById('inputClave').value;
    const inputConfirmarClave = document.getElementById('inputConfirmarClave').value;
    const formData = new FormData(event.target);

    // Validar los campos
    if (!inputClave || inputClave.length < 8 || inputClave !== inputConfirmarClave) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden o no cumplen con los requisitos.',
        });
        return;
    }

    // Confirmar la actualización
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas actualizar los datos del perfil?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) {
        return;
    }

    // Enviar los datos al servidor
    const response = await fetch('../api/services/profile_services.php?action=updateProfile', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (data.status) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Perfil actualizado correctamente.',
        }).then(() => {
            window.location.reload();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error,
        });
    }
});
