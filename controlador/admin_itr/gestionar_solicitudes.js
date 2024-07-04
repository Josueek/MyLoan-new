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
                    <th scope="row">${prestamo.id_prestamo}</th>
                    <td>${prestamo.nombre_empleado}</td>
                    <td>${prestamo.programa_formacion}</td>
                    <td>${prestamo.observacion}</td>
                    <td>${prestamo.nombre_curso}</td>
                    <td>${prestamo.fecha_solicitud}</td>
                    <td>${prestamo.estado_prestamo}</td>
                    <td>
                        <div class="col-3 me-2 mt-2">
                            <button type="button" class="btn btn-primary ver-solicitud" data-id="${prestamo.id_prestamo}" data-estado="${prestamo.estado_prestamo}">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                        </div>
                        <div class="col-3 me-2 mt-2">
                            <button type="button" class="btn btn-success aceptar-solicitud" data-id="${prestamo.id_prestamo}" data-estado="${prestamo.estado_prestamo}">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 8; // Ajuste para incluir la nueva columna
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
                }
            });
        });

        // Manejo del botón Denegar Solicitud
        document.addEventListener('click', function (e) {
            if (e.target && e.target.id === 'denegarSolicitud') {
                const idPrestamo = e.target.getAttribute('data-id');
                validarEstadoParaDenegar(idPrestamo);
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
                    document.getElementById('denegarSolicitud').setAttribute('data-estado', data.dataset[0].estado_prestamo);
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
                    <td>${detalle.nombre_espacio || 'N/A'}</td>
                    <td>${detalle.nombre_equipo || 'N/A'}</td>
                    <td>${detalle.nombre_material || 'N/A'}</td>
                    <td>${detalle.nombre_herramienta || 'N/A'}</td>
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

    function validarEstadoParaDenegar(idPrestamo) {
        fetch(`../../api/services/solicitud_services.php?action=getSolicitud&id=${idPrestamo}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const estado = data.dataset.estado_prestamo;
                    if (estado === 'Aceptado') {
                        Swal.fire('No se puede denegar el préstamo', 'El préstamo ya ha sido aceptado.', 'error');
                    } else if (estado === 'Denegado') {
                        Swal.fire('No se puede denegar el préstamo', 'El préstamo ya ha sido denegado.', 'error');
                    } else {
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
                } else {
                    Swal.fire('Error', 'No se pudo obtener el estado del préstamo', 'error');
                }
            })
            .catch(error => console.error('Error al validar estado del préstamo:', error));
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
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => console.error('Error al denegar la solicitud:', error));
    }
    
    

    // Inicializar modales y asignar eventos
    gestionarModales();
});
