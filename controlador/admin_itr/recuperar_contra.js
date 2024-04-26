// Función para validar el formato del correo electrónico
function validarEmail(email) {
    // Expresión regular para verificar el formato del correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Función para validar los campos antes de avanzar a la siguiente pantalla
  function validarCampos() {
    var email = document.getElementById('inputEmail').value.trim();

    // Verificar si el campo de correo electrónico está vacío o no tiene un formato válido
    if (email === '' || !validarEmail(email)) {
      mostrarError('Por favor, introduce un correo electrónico válido.');
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

  // Función para mostrar una alerta de éxito y redirigir al usuario
  function mostrarExito() {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Código enviado con éxito.',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redireccionar al usuario a la siguiente pantalla
        window.location.href = 'codigo_verificacion.html';
      }
    });
  }

  // Evento de clic en el botón de enviar código
  document.getElementById('btn-enviar-codigo').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Validar los campos antes de avanzar a la siguiente pantalla
    if (validarCampos()) {
      // Mostrar mensaje de éxito y redireccionar al usuario
      mostrarExito();
    }
  });