// Primero verificar si ya hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../api/services/sesion_status.php');
        const data = await response.json();
        
        if (data.status === 1) {
            // Si hay una sesión activa, redirigir automáticamente
            window.location.href = '../vistas/vistas_admin/inicio.html';
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
    }
});

$(document).ready(function () {
  // Acción al hacer clic en el botón "Enviar código"
  $('#btn-enviar-codigo').on('click', function () {
      // Obtiene el valor del input de correo electrónico
      const email = $('#inputEmail').val().trim();
      sessionStorage.setItem('correo_electronico', email); // Almacenar en sessionStorage

      // Valida que el campo de correo no esté vacío
      if (email === '') {
          Swal.fire('Error', 'Por favor, ingrese su correo electrónico.', 'error');
          return;
      }

      // Verifica si el correo electrónico está registrado en la base de datos
      verificarCorreo(email).then(function (existe) {
        if (existe) {
            // Si el correo existe, genera un código de verificación
            const codigo = generarCodigoVerificacion();

            // Parámetros del correo a enviar
            const templateParams = {
                email: email,
                message: `Tu código de recuperación es: ${codigo}`
            };

            // Envía el código de verificación por correo electrónico
            enviarCorreo(templateParams).then(function () {
                // Guarda el código en la base de datos
                guardarCodigo(email, codigo).then(function (response) {
                    if (response.guardado) {
                        Swal.fire('Éxito', 'El código de verificación ha sido enviado a tu correo.', 'success').then(() => {
                            // Redirigir a la siguiente pantalla después de que se cierre el alert
                            window.location.href = 'codigo_verificacion.html';
                        });
                    } else {
                        Swal.fire('Error', response.message, 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error', 'Hubo un problema al guardar el código en la base de datos.', 'error');
                    console.log('Error al guardar el código: ', error);
                });
            }).catch(function (error) {
                Swal.fire('Error', 'Hubo un problema al enviar el correo. Inténtalo de nuevo.', 'error');
                console.log('Error al enviar el correo: ', error);
            });
        } else {
            Swal.fire('Error', 'El correo electrónico no está registrado.', 'error');
        }
    }).catch(function () {
        Swal.fire('Error', 'Ocurrió un error al verificar el correo. Inténtalo más tarde.', 'error');
    });
});
});

// Función para verificar si el correo existe en la base de datos
function verificarCorreo(email) {
  return $.ajax({
      url: '../api/services/verificar_email.php?action=verificarCorreo', // Ruta a tu archivo PHP
      method: 'POST',
      data: { email: email },
      dataType: 'json'
  }).then(function (response) {
      return response.existe;
  });
}

// Función para generar un código de verificación de 6 dígitos
function generarCodigoVerificacion() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un número de 6 dígitos
}

// Función para enviar el código de verificación usando EmailJS
function enviarCorreo(templateParams) {
  return emailjs.send(
      'service_jiixs3q',   // ID del servicio
      'template_fap0gk2',  // ID de la plantilla
      templateParams,      // Parámetros del correo
      'Uu6zKJAjpSzO3lbnM'  // Clave pública de EmailJS
  );
}

// Función para guardar el código en la base de datos
function guardarCodigo(email, codigo) {
  return $.ajax({
      url: '../api/services/codigo_verificacion.php?action=guardarCodigo', // Ruta a tu archivo PHP
      method: 'POST',
      data: { correo_electronico: email, codigo_verificacion: codigo },
      dataType: 'json'
  });
}

