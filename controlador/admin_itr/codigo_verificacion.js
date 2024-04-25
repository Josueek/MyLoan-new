// Función para validar que solo se ingresen números
function validarNumeros(event) {
    var tecla = event.keyCode || event.which;
    var teclaPermitida = /\d/;
    return teclaPermitida.test(String.fromCharCode(tecla));
  }
  
  // Función para validar los campos antes de avanzar a la siguiente pantalla
  function validarCampos() {
    var codigo = document.getElementById('inputCodigo').value.trim();
  
    // Verificar si el campo de código de verificación está vacío
    if (codigo === '') {
      mostrarError('Por favor, ingresa el código de verificación.');
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
  
  // Evento de clic en el botón de verificar código
  document.getElementById('btn-verificar').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
    // Validar los campos antes de avanzar a la siguiente pantalla
    if (validarCampos()) {
      // Redireccionar al usuario a la siguiente pantalla
      window.location.href = 'cambiar_contra.html';
    }
  });
  
  // Esperar a que el documento esté completamente cargado antes de ejecutar el código
  document.addEventListener('DOMContentLoaded', function() {
    // Evento para validar que solo se ingresen números en el campo de código de verificación
    document.getElementById('inputCodigo').addEventListener('keypress', function(event) {
      if (!validarNumeros(event)) {
        event.preventDefault();
      }
    });
  });
  