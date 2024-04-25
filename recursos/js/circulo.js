function previewImage(event) {
  var input = event.target;
  var preview = document.getElementById('imagePreview');
  
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
          preview.style.backgroundImage = 'url(' + e.target.result + ')';
          preview.style.display = 'block'; // Mostramos la vista previa
      }
      
      reader.readAsDataURL(input.files[0]);
  }
}

// Mostrar el texto cuando se hace clic en el círculo
document.getElementById('circleContainer').addEventListener('click', function() {
  document.getElementById('inputFile').click();
});

// Mostrar el texto cuando se borra la imagen
document.getElementById('inputFile').addEventListener('change', function() {
  if (!this.files || !this.files[0]) {
      document.getElementById('uploadText').style.display = 'block';
  }
});

// Evitar que se abra dos veces el selector de archivos cuando se hace clic en el ícono de lápiz
document.querySelector('.circle img').addEventListener('click', function(event) {
  event.stopPropagation(); // Evita que se propague el evento al contenedor del círculo
});