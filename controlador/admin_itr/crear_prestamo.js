$(document).ready(function() {
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

function guardarDatosPrestamo() {
    const fechaEntrega = $('#fechaEntrega').val();
    const programaFormacion = $('#programaformacion').val();
    const usuarioPrestamos = $('#usuarioPrestamos').val();
    const cursoSolicitar = $('#institucion').val();
    const descripcion = $('#descripcion').val();

    const prestamoData = {
        fechaEntrega,
        programaFormacion,
        usuarioPrestamos,
        cursoSolicitar,
        descripcion
    };

    localStorage.setItem('prestamoData', JSON.stringify(prestamoData));
}
