// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el campo de entrada de imagen y el contenedor de vista previa
    var input = document.getElementById('imagen');
    var preview = document.getElementById('preview');

    // Escuchar cambios en el campo de entrada de imagen
    input.addEventListener('change', function(e) {
        // Obtener el archivo seleccionado
        var file = input.files[0];
        // Verificar si se seleccionó un archivo
        if (file) {
            // Crear un objeto URL para la vista previa de la imagen
            var reader = new FileReader();
            reader.onload = function(event) {
                // Establecer la vista previa de la imagen con la URL generada
                preview.src = event.target.result;
            }
            // Leer el archivo como una URL de datos
            reader.readAsDataURL(file);
        }
    });
});
