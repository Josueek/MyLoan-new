document.addEventListener('DOMContentLoaded', function () {
    // Guardar los datos del préstamo en localStorage al hacer clic en "Siguiente"
    document.getElementById('btnAgregarequipo').addEventListener('click', function () {
        // Obtener los datos del préstamo
        const fechaSolicitud = document.getElementById('fechaEntrega').value;
        const programaFormacion = document.getElementById('programaformacion').value;
        const usuarioSolicitante = document.getElementById('usuarioPrestamos').value;
        const curso = document.getElementById('institucion').value;
        const observacion = document.getElementById('descripcion').value;

        // Crear un objeto de préstamo
        const prestamo = {
            fechaSolicitud,
            programaFormacion,
            usuarioSolicitante,
            curso,
            observacion,
            articulos: [] // Inicialmente vacío, se llenará en la segunda página
        };

        // Guardar el préstamo en localStorage
        localStorage.setItem('prestamo', JSON.stringify(prestamo));

        // Redirigir a la segunda página
        window.location.href = 'crear_solicitud_prestamousar.html';
    });
});

(document).ready(function() {
    $('#fechaEntrega').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    cargarEmpleados();

    $('#btnSiguiente').click(function() {
        guardarDatosPrestamo();
        window.location.href = 'crear_uso_prestamo.html';  // Cambia esto a la ruta de tu segunda pantalla
    });
});

function cargarEmpleados() {
    fetch('../../api/services/empleado_services.php?action=getEmpleados')
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                mostrarEmpleados(data.dataset);
            } else {
                console.error('Error al obtener empleados:', data.message);
            }
        })
        .catch(error => console.error('Error al obtener empleados:', error));
}

function mostrarEmpleados(empleados) {
    const tbody = document.getElementById('tablaEmpleados');
    tbody.innerHTML = '';
    if (empleados.length > 0) {
        empleados.forEach(empleado => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${empleado.nombre_empleado}</td>
                <td>${empleado.apellido_empleado}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.estado_empleado}</td>
                <td>${empleado.correo_electronico}</td>
                <td>${empleado.cargo}</td>
                <td>${empleado.especialidad}</td>
            `;
            tr.addEventListener('click', () => {
                seleccionarUsuario(empleado.nombre_empleado);
            });
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="8" class="text-center">No se encontraron registros</td>`;
        tbody.appendChild(tr);
    }
}

function seleccionarUsuario(nombre) {
    const usuarioPrestamos = document.getElementById('usuarioPrestamos');
    usuarioPrestamos.value = nombre;
}