"use strict";

document.getElementById('inputFile').addEventListener('change', function (event) {
  var file = event.target.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var imageUrl = e.target.result;
      var img = document.createElement('img');
      img.src = imageUrl;
      img.classList.add('img-preview'); // Agregar clase para estilos CSS

      var imageCircle = document.getElementById('imageCircle');
      imageCircle.innerHTML = ''; // Limpiar contenido previo

      imageCircle.appendChild(img); // Agregar imagen al círculo
    };

    reader.readAsDataURL(file);
  }
});
//# sourceMappingURL=circulo.dev.js.map
