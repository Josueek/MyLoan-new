function cargarCursos() {
    fetch('../../api/services/cargar_curso_services.php?action=getAllCursos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Para depuración
            const selectCurso = document.getElementById('cursoObservar');
            selectCurso.innerHTML = '<option value="">Selecciona un curso</option>'; // Reiniciar opciones
            if (data.dataset) {
                data.dataset.forEach(curso => {
                    const option = document.createElement('option');
                    option.value = curso.id_curso; // Puedes usar el ID para otras operaciones
                    option.text = curso.nombre_curso;
                    selectCurso.appendChild(option);
                });
            } else {
                console.error('No se encontraron datos.');
            }
        })
        .catch(error => console.error('Error al obtener cursos:', error));
}

// Llama a la función para cargar los cursos al cargar la página
document.addEventListener('DOMContentLoaded', cargarCursos);
