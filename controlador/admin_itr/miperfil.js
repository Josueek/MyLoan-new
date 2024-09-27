document.addEventListener('DOMContentLoaded', async () => {
    // Verifica el estado de la sesión.
    const sessionCheck = await fetch('../../api/services/sesion_status.php');
    const sessionData = await sessionCheck.json();
    //Id de los campos de clave
    const claveInput = document.getElementById('inputClave');
    const confirmarClaveInput = document.getElementById('inputConfirmarClave');
    const toggleClaveBtn = document.getElementById('toggleClave');
    const toggleConfirmarClaveBtn = document.getElementById('toggleConfirmarClave');

    // Función para mostrar/ocultar clave
    toggleClaveBtn.addEventListener('click', () => {
        const type = claveInput.getAttribute('type') === 'password' ? 'text' : 'password';
        claveInput.setAttribute('type', type);

        const icon = toggleClaveBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Función para mostrar/ocultar confirmar clave
    toggleConfirmarClaveBtn.addEventListener('click', () => {
        const type = confirmarClaveInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmarClaveInput.setAttribute('type', type);

        const icon = toggleConfirmarClaveBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
    
    // Si no hay una sesión activa, redirige al usuario a la página de inicio de sesión.
    if (!sessionData.status) {
        window.location.href = '../../vistas/index.html';
        return;
    }

    // Obtiene los datos del perfil del usuario.
    const response = await fetch(`../../api/services/miperfil_services.php?action=getProfile`);
    const data = await response.json();

    // Si se obtienen los datos correctamente, los muestra en el formulario.
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
        // Si ocurre un error al obtener los datos, muestra un mensaje de error.
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error,
        });
    }
});

document.getElementById('profile-form').addEventListener('submit', async (event) => {
    // Evita que el formulario se envíe de forma tradicional.
    event.preventDefault();

    // Obtiene las contraseñas ingresadas.
    const inputClave = document.getElementById('inputClave').value;
    const inputConfirmarClave = document.getElementById('inputConfirmarClave').value;
    // Crea un objeto FormData con los datos del formulario.
    const formData = new FormData(event.target);

    // Valida las contraseñas.
    if (inputClave && (inputClave.length < 8 || inputClave !== inputConfirmarClave)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden o no cumplen con los requisitos.',
        });
        return;
    }

    // Muestra una confirmación antes de enviar los datos.
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

    // Si el usuario cancela la confirmación, no hace nada.
    if (!result.isConfirmed) {
        return;
    }

    // Envía los datos del formulario al servidor.
    const response = await fetch(`../../api/services/miperfil_services.php?action=updateProfile`, {
        method: 'POST',
        body: formData,
    });

    // Procesa la respuesta del servidor.
    const data = await response.json();

    // Si la actualización fue exitosa, muestra un mensaje de éxito y recarga la página.
    if (data.status) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Perfil actualizado correctamente.',
        }).then(() => {
            window.location.reload();
        });
    } else {
        // Si ocurre un error, muestra un mensaje de error.
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error,
        });
    }

    document.getElementById('toggleConfirmar').addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = document.querySelector('#toggleConfirmar i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});
