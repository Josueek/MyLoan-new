 // Función para mostrar la vista previa de la imagen
 function previewImage() {
    var preview = document.getElementById('previewImagen');
    var fileInput = document.getElementById('imagenObservacion');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      preview.src = reader.result;
      preview.style.display = 'block';
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
      preview.style.display = 'none';
    }
  }

  // Adjunta el evento onchange al input de la imagen
  document.getElementById('imagenObservacion').addEventListener('change', previewImage);