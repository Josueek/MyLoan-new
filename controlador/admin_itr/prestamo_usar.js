document.addEventListener('DOMContentLoaded', function () {
    // Recuperar el préstamo de localStorage
    const prestamo = JSON.parse(localStorage.getItem('prestamo')) || { articulos: [] };

    // Mostrar los datos del préstamo (si es necesario)
    console.log(prestamo);

    // Función para mostrar los artículos en la tabla
    function mostrarArticulos() {
        const tbody = document.getElementById('detalleArticulos');
        tbody.innerHTML = '';
        prestamo.articulos.forEach((articulo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${articulo.cantidad}</td>
                <td>${articulo.unidad}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.articulo}</td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarArticulo(${index})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Función para eliminar un artículo del préstamo
    window.eliminarArticulo = function (index) {
        prestamo.articulos.splice(index, 1);
        localStorage.setItem('prestamo', JSON.stringify(prestamo));
        mostrarArticulos();
    }

    // Mostrar los artículos iniciales
    mostrarArticulos();

    // Evento para enviar el préstamo
    document.getElementById('btnAgregar').addEventListener('click', function () {
        fetch('../../api/services/inventario_herramienta_services.php?action=crearPrestamo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prestamo)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 1) {
                alert('Préstamo creado con éxito');
                localStorage.removeItem('prestamo');
                window.location.href = 'pagina_de_confirmacion.html'; // Redirigir a una página de confirmación
            } else {
                alert('Error al crear el préstamo: ' + data.message);
            }
        })
        .catch(error => console.error('Error al enviar los datos del préstamo:', error));
    });
});
