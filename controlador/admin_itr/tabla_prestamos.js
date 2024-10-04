document.addEventListener('DOMContentLoaded', function () {
    cargarDatosTabla();
    cargarCursos();

    document.getElementById('buscarSolicitud').addEventListener('input', function () {
        buscarSolicitud();
    });

    document.getElementById('filtroCurso').addEventListener('change', function () {
        buscarSolicitud();
    });

    document.getElementById('filtroPrograma').addEventListener('change', function () {
        buscarSolicitud();
    });

    function cargarDatosTabla(buscar = '', curso = '', programa = '') {
        fetch(`../../api/services/solicitud_services.php?action=getAllSolicitudes&buscar=${buscar}&curso=${curso}&programa=${programa}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener solicitudes:', error));
    }

    function buscarSolicitud() {
        const buscar = document.getElementById('buscarSolicitud').value;
        const curso = document.getElementById('filtroCurso').value;
        const programa = document.getElementById('filtroPrograma').value;
        cargarDatosTabla(buscar, curso, programa);
    }

    function mostrarDatosTabla(data) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(prestamo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${prestamo.id_prestamo || 'No se encontraron datos'}</th>
                    <td>${prestamo.nombre_empleado || 'No se encontraron datos'}</td>
                    <td>${prestamo.programa_formacion || 'No se encontraron datos'}</td>
                    <td>${prestamo.observacion || 'No se encontraron datos'}</td>
                    <td>${prestamo.nombre_curso || 'No se encontraron datos'}</td>
                    <td>${prestamo.fecha_solicitud || 'No se encontraron datos'}</td>
                    <td>${prestamo.estado_prestamo || 'No se encontraron datos'}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 7; // Ajusta el número de columnas en la tabla
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }

        // Reasignar eventos para los botones después de agregar el contenido dinámicamente
        gestionarModales();
    }

    function cargarCursos() {
        fetch(`../../api/services/solicitud_services.php?action=getAllCursos`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const select = document.getElementById('filtroCurso');
                    select.innerHTML = '<option value="">Todos</option>';
                    data.dataset.forEach(curso => {
                        const option = document.createElement('option');
                        option.value = curso.id_curso;
                        option.textContent = curso.nombre_curso;
                        select.appendChild(option);
                    });
                }
            })
            .catch(error => console.error('Error al obtener cursos:', error));
    }

    function gestionarModales() {
        // Asignar evento click a todos los botones de "Ver Solicitud"
        document.querySelectorAll('button.ver-solicitud').forEach(button => {
            button.addEventListener('click', function () {
                const prestamoId = this.getAttribute('data-id');
                cargarDetallePrestamo(prestamoId);
            });
        });

        // Asignar evento click a todos los botones de "Aceptar Solicitud"
        document.querySelectorAll('button.aceptar-solicitud').forEach(button => {
            button.addEventListener('click', function () {
                const prestamoId = this.getAttribute('data-id');
                const estadoPrestamo = this.getAttribute('data-estado');
                if (estadoPrestamo === 'Aceptado') {
                    Swal.fire('No se puede asignar un período', 'El préstamo ya ha sido aceptado.', 'error');
                } else if (estadoPrestamo === 'Denegado') {
                    Swal.fire('No se puede asignar un período', 'El préstamo ha sido denegado.', 'error');
                } else {
                    const myModal = new bootstrap.Modal(document.getElementById('aceptarSolicitud'));
                    myModal.show();
                    document.getElementById('btnEnviar').setAttribute('data-id', prestamoId);
                }
            });
        });

        // Manejo del botón Denegar Solicitud
        document.addEventListener('click', function (e) {
            if (e.target && e.target.id === 'denegarSolicitud') {
                const idPrestamo = e.target.getAttribute('data-id');
                Swal.fire({
                    title: '¿Estás seguro que quieres denegar el préstamo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, denegar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        denegarSolicitud(idPrestamo);
                    }
                });
            }
        });

        // Eliminar backdrop después de cerrar modal
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('hidden.bs.modal', function () {
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                    backdrop.remove();
                });
            });
        });
    }

    function cargarDetallePrestamo(prestamoId) {
        fetch(`../../api/services/solicitud_services.php?action=getDetallePrestamo&id=${prestamoId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    mostrarDetallePrestamo(data.dataset);
                    const myModal = new bootstrap.Modal(document.getElementById('verSolicitud'));
                    myModal.show();
                    document.getElementById('denegarSolicitud').setAttribute('data-id', prestamoId);
                } else {
                    Swal.fire('Error', 'No se pudieron obtener los detalles del préstamo', 'error');
                }
            })
            .catch(error => console.error('Error al obtener detalles del préstamo:', error));
    }

    function mostrarDetallePrestamo(detalles) {
        const tbody = document.querySelector('#verSolicitud tbody');
        tbody.innerHTML = '';

        if (detalles.length > 0) {
            detalles.forEach(detalle => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${detalle.cantidad}</td>
                    <td>${detalle.unidad}</td>
                    <td>${detalle.descripcion}</td>
                    <td>${detalle.id_prestamo}</td>
                    <td>${detalle.nombre_espacio || 'No se encontraron datos'}</td>
                    <td>${detalle.nombre_equipo || 'No se encontraron datos'}</td>
                    <td>${detalle.nombre_material || 'No se encontraron datos'}</td>
                    <td>${detalle.nombre_herramienta || 'No se encontraron datos'}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 8;
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }
    }

    function denegarSolicitud(idPrestamo) {
        fetch(`../../api/services/solicitud_services.php?action=denegarSolicitud`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idPrestamo })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Denegado!', 'El préstamo ha sido denegado.', 'success');
                    cargarDatosTabla(); // Actualizar la tabla después de denegar
                    const myModal = bootstrap.Modal.getInstance(document.getElementById('verSolicitud'));
                    myModal.hide();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al denegar la solicitud:', error));
    }

    // Manejo del botón "Enviar" en el modal "aceptarSolicitud"
    document.getElementById('btnEnviar').addEventListener('click', function () {
        const idPrestamo = this.getAttribute('data-id');
        const fechaInicio = document.getElementById('fechaInicio').value;
        const personaRecibe = document.getElementById('personaRecibe').value;

        if (!fechaInicio || !personaRecibe) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        const fechaActual = new Date().toISOString().split('T')[0];
        if (fechaInicio < fechaActual) {
            Swal.fire('Error', 'La fecha de inicio debe ser igual o mayor a la fecha actual', 'error');
            return;
        }

        Swal.fire({
            title: '¿Estás seguro que quieres aceptar el préstamo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`../../api/services/solicitud_services.php?action=aceptarSolicitud`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idPrestamo, fecha_inicio: fechaInicio, persona_recibe: personaRecibe })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status) {
                            Swal.fire('Aceptado!', 'El préstamo ha sido aceptado.', 'success');
                            cargarDatosTabla(); // Actualizar la tabla después de aceptar
                            const myModal = bootstrap.Modal.getInstance(document.getElementById('aceptarSolicitud'));
                            myModal.hide();
                        } else {
                            Swal.fire('Error!', data.message, 'error');
                        }
                    })
                    .catch(error => console.error('Error al aceptar la solicitud:', error));
            }
        });
    });

    // Inicializar Flatpickr para el campo de fecha
    flatpickr('#fechaInicio', {
        dateFormat: 'Y-m-d'
    });

    // Inicializar modales y asignar eventos
    gestionarModales();
});
