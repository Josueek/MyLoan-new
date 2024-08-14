function cargarTiposPrestamos() {
    fetch('../../api/services/tipos_prestamos.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Para depuración
            const selectTipoPrestamo = document.getElementById('tipoPrestamo');
            selectTipoPrestamo.innerHTML = '<option value="">Selecciona un tipo de préstamo</option>'; // Reiniciar opciones
            data.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo;
                option.text = tipo;
                selectTipoPrestamo.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener tipos de préstamo:', error));
}

// Llama a la función para cargar los tipos de préstamo al cargar la página
document.addEventListener('DOMContentLoaded', cargarTiposPrestamos);
