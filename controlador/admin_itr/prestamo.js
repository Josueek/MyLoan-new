
document.getElementById("btnSiguiente").addEventListener("click", function() {
    window.location.href = "http://localhost/MyLoan-new/vistas/_/crear_solicitud_prestamousar.html";
});

function cargarCursos() {
    fetch('../../api/services/prestamo_services.php?action=getAllCursos')
        .then(response => response.json())
        .then(data => {
            const selectCurso = document.getElementById('institucion');
            selectCurso.innerHTML = '<option value="0">Elije un curso</option>'; // Reiniciar opciones
            data.dataset.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.id_curso;
                option.text = curso.nombre_curso;
                selectCurso.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener cursos:', error));
}
