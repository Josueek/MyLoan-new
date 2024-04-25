document.getElementById('inputFile').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      const img = document.createElement('img');
      img.src = imageUrl;
      img.classList.add('img-preview'); // Agregar clase para estilos CSS
      const imageCircle = document.getElementById('imageCircle');
      imageCircle.innerHTML = ''; // Limpiar contenido previo
      imageCircle.appendChild(img); // Agregar imagen al círculo
    }
    reader.readAsDataURL(file);
  }
});
