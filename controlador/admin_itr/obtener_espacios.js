function cargarEspacios() {
    fetch('../../api/services/espacios_services.php?action=getAllEspacios')
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data); // Agrega esta línea
            const selectEspacio = document.getElementById('espacioObservar');
            selectEspacio.innerHTML = '<option value="">Selecciona un espacio</option>'; // Reiniciar opciones
            if (data.dataset) {
                data.dataset.forEach(espacio => {
                    const option = document.createElement('option');
                    option.value = espacio.id_espacio;
                    option.text = espacio.nombre_espacio;
                    selectEspacio.appendChild(option);
                });
            } else {
                console.error('N/A.');
            }
        })
        .catch(error => console.error('Error al obtener espacios:', error));
}

// Llama a la función para cargar los espacios al cargar la página
document.addEventListener('DOMContentLoaded', cargarEspacios);
