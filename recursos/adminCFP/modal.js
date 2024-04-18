// Función para abrir el modal
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Cierra el modal al hacer clic fuera de él
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Evento para abrir el modal cuando se hace clic en el botón "Buscar Espacio"
document.getElementById('buscarEspacio').addEventListener('click', function() {
    openModal();
});