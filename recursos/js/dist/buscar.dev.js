"use strict";

// Función para manejar la búsqueda
function handleSearch() {
  var input = document.getElementById('search-input').value.toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

  var rows = document.querySelectorAll('#tabla-ejemplo tbody tr'); // Obtener todas las filas de la tabla
  // Iterar sobre las filas para ocultar o mostrar según la búsqueda

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName('td'); // Obtener todas las celdas de la fila

    var isVisible = false; // Iterar sobre las celdas para comprobar si alguna coincide con la búsqueda

    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];

      if (cell.textContent.toLowerCase().includes(input)) {
        isVisible = true;
        break; // No es necesario seguir buscando si ya encontramos una coincidencia
      }
    } // Mostrar u ocultar la fila según si alguna celda coincide con la búsqueda


    if (isVisible) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
} // Agregar evento al botón de búsqueda


document.getElementById('search-button').addEventListener('click', handleSearch); // Agregar evento al presionar Enter en el campo de búsqueda

document.getElementById('search-input').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
//# sourceMappingURL=buscar.dev.js.map
