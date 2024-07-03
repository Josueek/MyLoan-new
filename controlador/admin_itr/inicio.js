document.addEventListener('DOMContentLoaded', function() {
    cargarDatosTabla();
    cargarComboboxData();

    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/.php?action=getAllEspacios&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener espacios:', error));
    }    
});
