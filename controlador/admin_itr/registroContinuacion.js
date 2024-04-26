// JavaScript para manejar la funcionalidad de agregar imagen
$(document).ready(function () {
    // Manejar el evento de hacer clic en el botón "Agregar Imagen"
    $('#btnAgregarImagen').click(function () {
      // Abrir el cuadro de diálogo para seleccionar imagen
      $('<input type="file" accept="image/*">').on('change', function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
  
        // Manejar el evento de carga de la imagen seleccionada
        reader.onload = function (event) {
          // Mostrar la imagen seleccionada en el contenedor
          $('#imagenSeleccionada').attr('src', event.target.result);
        };
  
        // Leer el contenido del archivo de imagen como una URL
        reader.readAsDataURL(file);
      }).click();
    });
  });  



  document.addEventListener('DOMContentLoaded', function() {
    var confirmarBtn = document.getElementById('btn-confirmar');

    confirmarBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        var nombre = document.getElementById('inputNombre').value.trim();
        var apellidos = document.getElementById('inputApellidos').value.trim();
        var telefono = document.getElementById('inputTelefono').value.trim();

        // Validar nombre
        if (!nombre) {
            mostrarError('Por favor, ingresa tu nombre.');
            return;
        }

        // Validar apellidos
        if (!apellidos) {
            mostrarError('Por favor, ingresa tus apellidos.');
            return;
        }

        // Validar teléfono
        if (!telefono) {
            mostrarError('Por favor, ingresa tu número de teléfono.');
            return;
        } else if (!/^\d+$/.test(telefono)) {
            mostrarError('Por favor, ingresa un número de teléfono válido.');
            return;
        }

        // Mostrar modal de registro completado con éxito
        Swal.fire({
            icon: 'success',
            title: 'Registro completado',
            text: 'Tu registro se ha completado con éxito.',
            confirmButtonText: 'Ir al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redireccionar al usuario al index.html
                window.location.href = 'index.html';
            }
        });
    });

    // Función para mostrar una alerta de error
    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }
});
