// Ejemplo de script.js para manejar interacciones en el frontend

// URL del servicio PHP para manejar observaciones
const observacionServiceUrl = 'http://localhost/MyLoan-new/api/services/observacion_services.php';

// Cargar todas las observaciones al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarObservaciones();
});

// Función para cargar y mostrar todas las observaciones
function cargarObservaciones(buscar = '') {
    fetch(`${observacionServiceUrl}?action=getAllObservaciones&buscar=${buscar}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 1) {
                mostrarDatosTabla(data.dataset);
            } else {
                console.error('Error al cargar observaciones:', data.message);
            }
        })
        .catch(error => console.error('Error al cargar observaciones:', error));
}

// Función para mostrar los datos de las observaciones en una tabla
function mostrarDatosTabla(dataset) {
    // Implementa la lógica para mostrar los datos en una tabla o lista
    // Por ejemplo, puedes usar jQuery, DOM manipulation, o frameworks como React o Vue
    console.log('Datos de observaciones:', dataset);
}

// Función para llenar un combobox con tipos de observación
function llenarComboboxTiposObservacion() {
    fetch(`${observacionServiceUrl}?action=getTiposObservacion`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 1) {
                // Ejemplo de llenado de combobox con jQuery
                // $("#tiposObservacion").empty();
                // data.dataset.forEach(tipo => {
                //     $("#tiposObservacion").append(`<option value="${tipo}">${tipo}</option>`);
                // });

                // Ejemplo de llenado de combobox con JavaScript puro
                const tiposObservacionSelect = document.getElementById('tiposObservacion');
                tiposObservacionSelect.innerHTML = '';
                data.dataset.forEach(tipo => {
                    const option = document.createElement('option');
                    option.value = tipo;
                    option.textContent = tipo;
                    tiposObservacionSelect.appendChild(option);
                });
            } else {
                console.error('Error al cargar tipos de observación:', data.message);
            }
        })
        .catch(error => console.error('Error al cargar tipos de observación:', error));
}

// Llamar a la función para llenar el combobox de tipos de observación al cargar la página
llenarComboboxTiposObservacion();
