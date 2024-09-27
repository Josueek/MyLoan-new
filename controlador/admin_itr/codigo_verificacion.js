$(document).ready(function () {
  $('#btn-verificar').on('click', function () {
      // Obtener el valor del input de código
      const codigo = $('#inputCodigo').val().trim();
      const correo = sessionStorage.getItem('correo_electronico'); // Recuperar

      // Validar que el campo de código no esté vacío
      if (codigo === '') {
          Swal.fire('Error', 'Por favor, ingrese el código de verificación.', 'error');
          return;
      }

      // Hacer la solicitud para validar el código
      validarCodigo(correo, codigo).then(function (respuesta) {
          if (respuesta.validado) {
              Swal.fire('Éxito', 'Código de verificación validado con éxito.', 'success').then(() => {
                  window.location.href = 'cambiar_contra.html'; 
              });
          } else {
              Swal.fire('Error', respuesta.message, 'error');
          }
      }).catch(function () {
          Swal.fire('Error', 'Ocurrió un error al validar el código. Inténtalo más tarde.', 'error');
      });
  });
});

// Función para validar el código de verificación
function validarCodigo(correo, codigo) {
  return $.ajax({
      url: '../api/services/codigo_verificacion.php?action=validarCodigo',
      method: 'POST',
      data: {
          correo_electronico: correo,
          codigo_verificacion: codigo
      },
      dataType: 'json'
  });
}
