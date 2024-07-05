document.addEventListener('DOMContentLoaded', function () {
    cargarDatosTabla();
    cargarOpciones();

    document.getElementById('search-input').addEventListener('input', function () {
        buscarObservacion();
    });

    document.getElementById('filter-select').addEventListener('change', function () {
        buscarObservacion();
    });

    document.getElementById('guardarObservacion').addEventListener('click', function () {
        guardarObservacion();
    });

    function cargarDatosTabla(buscar = '', tipo = '') {
        fetch(`../../api/services/mis_observaciones_services.php?action=getAllObservaciones&buscar=${buscar}&tipo=${tipo}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener observaciones:', error));
    }

    function buscarObservacion() {
        const buscar = document.getElementById('search-input').value;
        const tipo = document.getElementById('filter-select').value;
        cargarDatosTabla(buscar, tipo);
    }

    function mostrarDatosTabla(data) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(observacion => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${observacion.fecha_observacion}</td>
                    <td>${observacion.observacion}</td>
                    <td><img src="../../api/images/observaciones/${observacion.foto_observacion}" width="100px" height="100px"></td>
                    <td>${observacion.tipo_observacion}</td>
                    <td>${observacion.tipo_prestamo}</td>
                    <td>${observacion.nombre_espacio}</td>
                    <td>${observacion.id_prestamo}</td>
                    <td>${observacion.nombre_empleado}</td>
                    <td>
                        <button type="button" class="btn btn-primary editar-observacion" data-id="${observacion.id_observacion}">Editar</button>
                        <button type="button" class="btn btn-danger eliminar-observacion" data-id="${observacion.id_observacion}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 9;
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }

        gestionarModales();
    }

    function cargarOpciones() {
        fetch(`../../api/services/mis_observaciones_services.php?action=getOpciones`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const tipoObservacionSelect = document.getElementById('tipoObservacion');
                    const tipoPrestamoSelect = document.getElementById('tipoPrestamo');
                    const espacioSelect = document.getElementById('espacioObservar');
                    const prestamoSelect = document.getElementById('prestamoObservar');
                    const empleadoSelect = document.getElementById('empleadoObservar');

                    tipoObservacionSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
                    tipoPrestamoSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
                    espacioSelect.innerHTML = '<option value="">Selecciona un espacio</option>';
                    prestamoSelect.innerHTML = '<option value="">Selecciona un préstamo</option>';
                    empleadoSelect.innerHTML = '<option value="">Selecciona un empleado</option>';

                    data.dataset.tiposObservacion.forEach(option => {
                        tipoObservacionSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                    });

                    data.dataset.tiposPrestamo.forEach(option => {
                        tipoPrestamoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                    });

                    data.dataset.espacios.forEach(option => {
                        espacioSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                    });

                    data.dataset.prestamos.forEach(option => {
                        prestamoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                    });

                    data.dataset.empleados.forEach(option => {
                        empleadoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                    });
                }
            })
            .catch(error => console.error('Error al obtener opciones:', error));
    }

    function gestionarModales() {
        document.querySelectorAll('button.editar-observacion').forEach(button => {
            button.addEventListener('click', function () {
                const idObservacion = this.getAttribute('data-id');
                cargarDetalleObservacion(idObservacion);
            });
        });

        document.querySelectorAll('button.eliminar-observacion').forEach(button => {
            button.addEventListener('click', function () {
                const idObservacion = this.getAttribute('data-id');
                Swal.fire({
                    title: '¿Estás seguro que quieres eliminar la observación?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminarObservacion(idObservacion);
                    }
                });
            });
        });
    }

    function cargarDetalleObservacion(idObservacion) {
        fetch(`../../api/services/mis_observaciones_services.php?action=getObservacion&id=${idObservacion}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    document.getElementById('fechaObservacion').value = data.dataset.fecha_observacion;
                    document.getElementById('observacion').value = data.dataset.observacion;
                    document.getElementById('tipoObservacion').value = data.dataset.tipo_observacion;
                    document.getElementById('tipoPrestamo').value = data.dataset.tipo_prestamo;
                    document.getElementById('espacioObservar').value = data.dataset.id_espacio;
                    document.getElementById('prestamoObservar').value = data.dataset.id_prestamo;
                    document.getElementById('empleadoObservar').value = data.dataset.id_usuario;
                    document.getElementById('inputFile').value = '';

                    const myModal = new bootstrap.Modal(document.getElementById('observationModal'));
                    myModal.show();

                    document.getElementById('guardarObservacion').setAttribute('data-id', idObservacion);
                } else {
                    Swal.fire('Error', 'No se pudieron obtener los detalles de la observación', 'error');
                }
            })
            .catch(error => console.error('Error al obtener detalles de la observación:', error));
    }

    function guardarObservacion() {
        const idObservacion = document.getElementById('guardarObservacion').getAttribute('data-id');
        const fechaObservacion = document.getElementById('fechaObservacion').value;
        const observacion = document.getElementById('observacion').value;
        const tipoObservacion = document.getElementById('tipoObservacion').value;
        const tipoPrestamo = document.getElementById('tipoPrestamo').value;
        const idEspacio = document.getElementById('espacioObservar').value;
        const idPrestamo = document.getElementById('prestamoObservar').value;
        const idUsuario = document.getElementById('empleadoObservar').value;
        const inputFile = document.getElementById('inputFile').files[0];

        if (!fechaObservacion || !observacion || !tipoObservacion || !tipoPrestamo || !idEspacio || !idPrestamo || !idUsuario) {
            Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('fecha_observacion', fechaObservacion);
        formData.append('observacion', observacion);
        formData.append('tipo_observacion', tipoObservacion);
        formData.append('tipo_prestamo', tipoPrestamo);
        formData.append('id_espacio', idEspacio);
        formData.append('id_prestamo', idPrestamo);
        formData.append('id_usuario', idUsuario);

        if (inputFile) {
            formData.append('foto_observacion', inputFile);
        } else {
            formData.append('foto_observacion', '');
        }

        const action = idObservacion ? 'updateObservacion' : 'addObservacion';
        if (idObservacion) {
            formData.append('id', idObservacion);
        }

        fetch(`../../api/services/mis_observaciones_services.php?action=${action}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito', data.message, 'success');
                    cargarDatosTabla();
                    const myModal = bootstrap.Modal.getInstance(document.getElementById('observationModal'));
                    myModal.hide();
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al guardar la observación:', error));
    }

    function eliminarObservacion(idObservacion) {
        fetch(`../../api/services/mis_observaciones_services.php?action=deleteObservacion`, {
            method: 'DELETE',
            body: JSON.stringify({ id: idObservacion })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Eliminado', data.message, 'success');
                    cargarDatosTabla();
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al eliminar la observación:', error));
    }

    async function verificarSesion() {
        try {
            const response = await fetch('../../api/services/sesion_status.php');
            const sessionData = await response.json();
            if (sessionData.status) {
                document.getElementById('empleadoObservar').value = sessionData.id_usuario;
                document.getElementById('empleadoObservar').disabled = true;
            } else {
                window.location.href = '../../vistas/index.html';
            }
        } catch (error) {
            console.error('Error al verificar la sesión:', error);
        }
    }

    verificarSesion();
});
