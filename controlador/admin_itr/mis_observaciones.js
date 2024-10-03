document.addEventListener('DOMContentLoaded', function () {
    cargarDatosTabla();
    cargarOpciones(); // Asegúrate de cargar las opciones solo cuando el DOM esté listo


    document.getElementById('search-input').addEventListener('input', function () {
        buscarObservacion();
    });

    document.getElementById('filter-select').addEventListener('change', function () {
        buscarObservacion();
    });

    document.getElementById('guardarObservacion').addEventListener('click', function () {
        guardarObservacion();
    });

    document.getElementById('editarGuardarObservacion').addEventListener('click', function () {
        actualizarObservacion();
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
                    <td>${observacion.nombre_empleado}</td>
                    <td>
                        <button type="button" class="btn btn-primary editar-observacion" data-id="${observacion.id_observacion}" data-imagen="${observacion.foto_observacion}">Editar</button>
                        <button type="button" class="btn btn-danger eliminar-observacion" data-id="${observacion.id_observacion}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 9; // Ajusta según el número de columnas
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }
    
        // Reasignar eventos para los botones después de agregar el contenido dinámicamente
        gestionarModales();
    }
    
    function cargarOpciones() { 
        fetch(`../../api/services/mis_observaciones_services.php?action=getOpciones`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    // Verificamos si los elementos existen antes de intentar modificar sus propiedades
                    const tipoObservacionSelect = document.getElementById('tipoObservacion');
                    const tipoPrestamoSelect = document.getElementById('tipoPrestamo');
                    const espacioSelect = document.getElementById('espacioObservar');
                    const prestamoSelect = document.getElementById('prestamoObservar');
                    const empleadoSelect = document.getElementById('empleadoObservar');
                    const editarTipoObservacionSelect = document.getElementById('editarTipoObservacion');
                    const editarTipoPrestamoSelect = document.getElementById('editarTipoPrestamo');
                    const editarEspacioSelect = document.getElementById('editarEspacioObservar');
                    const editarPrestamoSelect = document.getElementById('editarPrestamoObservar');
                    const editarEmpleadoSelect = document.getElementById('editarEmpleadoObservar');
    
                    // Valida que cada select existe antes de intentar acceder a él
                    if (tipoObservacionSelect) {
                        tipoObservacionSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
                        data.dataset.tiposObservacion.forEach(option => {
                            tipoObservacionSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (tipoPrestamoSelect) {
                        tipoPrestamoSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
                        data.dataset.tiposPrestamo.forEach(option => {
                            tipoPrestamoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (espacioSelect) {
                        espacioSelect.innerHTML = '<option value="">Selecciona un espacio</option>';
                        data.dataset.espacios.forEach(option => {
                            espacioSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (prestamoSelect) {
                        prestamoSelect.innerHTML = '<option value="">Selecciona un préstamo</option>';
                        data.dataset.prestamos.forEach(option => {
                            prestamoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (empleadoSelect) {
                        empleadoSelect.innerHTML = '<option value="">Selecciona un empleado</option>';
                        data.dataset.empleados.forEach(option => {
                            empleadoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    // Repite el proceso para los elementos de edición
                    if (editarTipoObservacionSelect) {
                        editarTipoObservacionSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
                        data.dataset.tiposObservacion.forEach(option => {
                            editarTipoObservacionSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (editarTipoPrestamoSelect) {
                        editarTipoPrestamoSelect.innerHTML = '<option value="">Selecciona un tipo</option>';
                        data.dataset.tiposPrestamo.forEach(option => {
                            editarTipoPrestamoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (editarEspacioSelect) {
                        editarEspacioSelect.innerHTML = '<option value="">Selecciona un espacio</option>';
                        data.dataset.espacios.forEach(option => {
                            editarEspacioSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (editarPrestamoSelect) {
                        editarPrestamoSelect.innerHTML = '<option value="">Selecciona un préstamo</option>';
                        data.dataset.prestamos.forEach(option => {
                            editarPrestamoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
    
                    if (editarEmpleadoSelect) {
                        editarEmpleadoSelect.innerHTML = '<option value="">Selecciona un empleado</option>';
                        data.dataset.empleados.forEach(option => {
                            editarEmpleadoSelect.innerHTML += `<option value="${option.id}">${option.nombre}</option>`;
                        });
                    }
                }
            })
            .catch(error => console.error('Error al obtener opciones:', error));
    }

    function gestionarModales() {
        // Evento para los botones de editar
        document.querySelectorAll('button.editar-observacion').forEach(button => {
            button.addEventListener('click', function () {
                const idObservacion = this.getAttribute('data-id'); // Obtiene el ID
                const imagenObservacion = this.getAttribute('data-imagen');
                cargarDetalleObservacion(idObservacion, imagenObservacion); // Asegúrate de que se llama correctamente
            });
        });

         // Aquí está la función para eliminar observaciones
    function eliminarObservacion(idObservacion) {
        console.log("Eliminando observación con ID:", idObservacion); // Verifica que el ID se envía correctamente
        
        fetch(`../../api/services/mis_observaciones_services.php?action=deleteObservacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idObservacion })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.status) {
                Swal.fire('Eliminado', data.message, 'success');
                cargarDatosTabla(); // Recarga la tabla tras eliminar
            } else {
                Swal.fire('Error', data.message, 'error');
            }
        })
        .catch(error => console.error('Error al eliminar la observación:', error));
    }

    // Evento para los botones de eliminar
    document.querySelectorAll('button.eliminar-observacion').forEach(button => {
        button.addEventListener('click', function () {
            const idObservacion = this.getAttribute('data-id'); // Verifica que el ID es el correcto
            console.log("ID de observación a eliminar:", idObservacion);
            Swal.fire({
                title: '¿Estás seguro que quieres eliminar la observación?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarObservacion(idObservacion); // Llama la función de eliminación
                }
            });
        });
    });
}

    // Función para cargar detalles de la observación
function cargarDetalleObservacion(idObservacion, imagenObservacion) {
    console.log("Cargando detalles de la observación con ID:", idObservacion); // Verifica que el ID se recibe correctamente
    fetch(`../../api/services/mis_observaciones_services.php?action=getObservacion&id=${idObservacion}`)
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                document.getElementById('editarFechaObservacion').value = data.dataset.fecha_observacion;
                document.getElementById('editarObservacion').value = data.dataset.observacion;
                document.getElementById('editarTipoObservacion').value = data.dataset.tipo_observacion;
                document.getElementById('editarTipoPrestamo').value = data.dataset.tipo_prestamo;
                document.getElementById('editarEspacioObservar').value = data.dataset.id_espacio;
                document.getElementById('editarEmpleadoObservar').value = data.dataset.id_usuario;
                document.getElementById('editarInputFile').value = '';

                // Guardamos la imagen actual en un atributo de datos del modal
                document.getElementById('editarGuardarObservacion').setAttribute('data-imagen', imagenObservacion);
                
                const myModal = new bootstrap.Modal(document.getElementById('editarModal'));
                myModal.show();

                document.getElementById('editarGuardarObservacion').setAttribute('data-id', idObservacion); // Asegúrate de que se configura correctamente
            } else {
                Swal.fire('Error', 'No se pudieron obtener los detalles de la observación', 'error');
            }
        })
        .catch(error => console.error('Error al obtener detalles de la observación:', error));
}

    function guardarObservacion() {
        const idObservacion = document.getElementById('guardarObservacion') ? document.getElementById('guardarObservacion').getAttribute('data-id') : null;
        const fechaObservacion = document.getElementById('fechaObservacion') ? document.getElementById('fechaObservacion').value : null;
        const observacion = document.getElementById('observacion') ? document.getElementById('observacion').value : null;
        const tipoObservacion = document.getElementById('tipoObservacion') ? document.getElementById('tipoObservacion').value : null;
        const tipoPrestamo = document.getElementById('tipoPrestamo') ? document.getElementById('tipoPrestamo').value : null;
        const idEspacio = document.getElementById('espacioObservar') ? document.getElementById('espacioObservar').value : null;
        const idUsuario = document.getElementById('empleadoObservar') ? document.getElementById('empleadoObservar').value : null;
        const inputFile = document.getElementById('inputFile') ? document.getElementById('inputFile').files[0] : null;
    
        // Validar que todos los campos requeridos estén completos
        if (!fechaObservacion || !observacion || !tipoObservacion || !tipoPrestamo || !idEspacio || !idUsuario) {
            Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
    
        // Validar la fecha
        const fechaActual = new Date();
        const fechaSeleccionada = new Date(fechaObservacion);
    
        if (fechaSeleccionada > fechaActual) {
            Swal.fire('Error', 'La fecha de observación no puede ser superior a la fecha actual.', 'error');
            return;
        }
    
        // Crear el objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append('fecha_observacion', fechaObservacion);
        formData.append('observacion', observacion);
        formData.append('tipo_observacion', tipoObservacion);
        formData.append('tipo_prestamo', tipoPrestamo);
        formData.append('id_espacio', idEspacio);
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
    
        // Realizar la petición para guardar o actualizar la observación
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
    
    

    function actualizarObservacion() {
        const idObservacion = document.getElementById('editarGuardarObservacion').getAttribute('data-id');
        const fechaObservacion = document.getElementById('editarFechaObservacion').value;
        const observacion = document.getElementById('editarObservacion').value;
        const tipoObservacion = document.getElementById('editarTipoObservacion').value;
        const tipoPrestamo = document.getElementById('editarTipoPrestamo').value;
        const idEspacio = document.getElementById('editarEspacioObservar').value;
        const idPrestamo = document.getElementById('editarPrestamoObservar').value;
        const idUsuario = document.getElementById('editarEmpleadoObservar').value;
        const inputFile = document.getElementById('editarInputFile').files[0];

        const imagenActual = document.getElementById('editarGuardarObservacion').getAttribute('data-imagen');

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
            formData.append('foto_observacion', imagenActual);
        }

        formData.append('id', idObservacion);

        fetch(`../../api/services/mis_observaciones_services.php?action=updateObservacion`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito', data.message, 'success');
                    cargarDatosTabla();
                    const myModal = bootstrap.Modal.getInstance(document.getElementById('editarModal'));
                    myModal.hide();
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al actualizar la observación:', error));
    }
    
    
});
