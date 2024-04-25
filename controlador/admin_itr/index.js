 // Función para mostrar una alerta de éxito
 function mostrarExito() {
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Has iniciado sesión correctamente.',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redireccionar al usuario a la página de inicio
        window.location.href = 'vistas_admin/inicio.html';
      }
    });
  }

  // Función para validar los campos de usuario y contraseña
  function validarCampos() {
    var usuario = document.getElementById('inputEmail').value.trim();
    var contraseña = document.getElementById('inputConfirmPassword').value.trim();

    // Verificar si ambos campos están vacíos
    if (usuario === '' && contraseña === '') {
      mostrarError('Por favor, completa los campos de usuario y contraseña.');
      return false;
    }

    // Verificar si el campo de usuario está vacío
    if (usuario === '') {
      mostrarError('Por favor, completa el campo de usuario.');
      return false;
    }

    // Verificar si el campo de contraseña está vacío
    if (contraseña === '') {
      mostrarError('Por favor, completa el campo de contraseña.');
      return false;
    }

    return true;
  }

  // Función para mostrar una alerta de error
  function mostrarError(mensaje) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  // Evento de clic en el botón de inicio de sesión
  document.getElementById('btn-login').addEventListener('click', function() {
    // Validar los campos antes de intentar iniciar sesión
    if (validarCampos()) {
      mostrarExito();
    }
  });