document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('../api/services/login_services.php?action=login', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.status) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: `Bienvenido de nuevo, ${data.nombre}`,
            }).then(() => {
                window.location.href = '../vistas/vistas_admin/inicio.html'; // Cambia a la página de destino después del login
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error,
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
  
  document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('inputPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const icon = document.querySelector('#togglePassword i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
  