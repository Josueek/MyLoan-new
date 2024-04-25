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