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

        const inputImage = document.getElementById('editarInputFile');
        const imagePreviewContainer = document.getElementById('editarImagePreview');
    
        // Evento que se activa cuando se selecciona un archivo
        inputImage.addEventListener('change', function(event) {
            // Verificar si se seleccionó un archivo
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
    
                // Leer el archivo y mostrarlo en la vista previa
                reader.onload = function(e) {
                    // Crear una nueva imagen
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.alt = 'Vista previa';
                    imgElement.style.maxWidth = '100%'; // Ajustar al contenedor
                    imgElement.style.height = 'auto';
    
                    // Limpiar el contenedor antes de añadir la nueva imagen
                    imagePreviewContainer.innerHTML = ''; 
                    imagePreviewContainer.appendChild(imgElement); // Añadir la nueva imagen
                };
    
                // Leer el archivo como Data URL
                reader.readAsDataURL(file);
            } else {
                // Limpiar la vista previa si no hay archivo
                imagePreviewContainer.innerHTML = ''; 
            }
        });
    
        // Limpiar la vista previa al abrir el modal
        const myModal = new bootstrap.Modal(document.getElementById('editarModal'));
    
        document.getElementById('editarModal').addEventListener('show.bs.modal', function () {
            inputImage.value = ''; // Resetear el input
            imagePreviewContainer.innerHTML = ''; // Limpiar la vista previa
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
      <button type="button" class="btn btn-danger eliminar-observacion" data-id="${observacion.id_observacion}">Eliminar</button> <!-- Aquí debe estar el data-id -->
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
                    const empleadoSelect = document.getElementById('empleadoObservar');
                    const editarTipoObservacionSelect = document.getElementById('editarTipoObservacion');
                    const editarTipoPrestamoSelect = document.getElementById('editarTipoPrestamo');
                    const editarEspacioSelect = document.getElementById('editarEspacioObservar');
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
        
        fetch(`../../api/services/mis_observaciones_services.php?action=deleteObservacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idObservacion })
        })
        .then(response => response.json())
        .then(data => {
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

                // Guardar la imagen actual en un atributo de datos del botón de guardar
                document.getElementById('editarGuardarObservacion').setAttribute('data-imagen', imagenObservacion);

                // Mostrar el nombre de la imagen actual en una etiqueta
                const labelArchivo = document.querySelector('label[for="editarInputFile"]');
                labelArchivo.textContent = imagenObservacion ? `Imagen actual: ${imagenObservacion}` : 'Sin archivo seleccionado';

                // Limpiar el campo de archivo (por si acaso se había seleccionado algo antes)
                document.getElementById('editarInputFile').value = '';

                // Cargar y mostrar la imagen actual
                const currentImage = document.getElementById('currentImage');
                if (imagenObservacion) {
                    const urlImagenActual = `../../api/images/observaciones/${imagenObservacion}`;
                    currentImage.src = urlImagenActual; // Establecer la URL de la imagen
                    currentImage.style.display = 'block'; // Hacer visible la imagen
                } else {
                    currentImage.style.display = 'none'; // Ocultar la imagen si no hay
                }

                const myModal = new bootstrap.Modal(document.getElementById('editarModal'));
                myModal.show();

                // Asignar el id de la observación al botón de guardar
                document.getElementById('editarGuardarObservacion').setAttribute('data-id', idObservacion);
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
        const idUsuario = document.getElementById('editarEmpleadoObservar').value;
    
        // Obtener el archivo seleccionado y la imagen actual
        const inputFile = document.getElementById('editarInputFile').files[0];
        const imagenActual = document.getElementById('editarGuardarObservacion').getAttribute('data-imagen');
    
        // Verificar que todos los campos requeridos están llenos
        if (!fechaObservacion || !observacion || !tipoObservacion || !tipoPrestamo || !idEspacio || !idUsuario) {
            Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
    
        const formData = new FormData();
        formData.append('fecha_observacion', fechaObservacion);
        formData.append('observacion', observacion);
        formData.append('tipo_observacion', tipoObservacion);
        formData.append('tipo_prestamo', tipoPrestamo);
        formData.append('id_espacio', idEspacio);
        formData.append('id_usuario', idUsuario);
    
        // Verificar si el usuario seleccionó un nuevo archivo de imagen
        if (inputFile) {
            formData.append('foto_observacion', inputFile);
        } else {
            formData.append('foto_observacion', imagenActual); // Enviar la imagen actual si no se seleccionó una nueva
        }
    
        // Enviar el ID de la observación
        formData.append('id', idObservacion);
    
        // Hacer la petición fetch para actualizar los datos
        fetch(`../../api/services/mis_observaciones_services.php?action=updateObservacion`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito', data.message, 'success');
                    cargarDatosTabla(); // Refrescar la tabla de observaciones
                    const myModal = bootstrap.Modal.getInstance(document.getElementById('editarModal'));
                    myModal.hide(); // Ocultar el modal de edición
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al actualizar la observación:', error));
    }
    
    
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el elemento de entrada de archivo y el contenedor de vista previa
    const inputFile = document.getElementById('inputFile');
    const imagePreview = document.getElementById('imagePreview');

    // Agregar un listener para el evento 'change' del input de archivo
    inputFile.addEventListener('change', function (event) {
        // Limpiar la vista previa anterior
        imagePreview.innerHTML = '';

        // Obtener el archivo de imagen
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            // Definir la función que se ejecuta cuando la lectura de la imagen se completa
            reader.onload = function (e) {
                // Crear un elemento de imagen y establecer su fuente
                const img = document.createElement('img');
                img.src = e.target.result; // URL de la imagen
                img.alt = 'Vista previa de la imagen';
                img.style.maxWidth = '100%'; // Asegúrate de que la imagen no exceda el ancho del contenedor
                img.style.height = 'auto'; // Mantener la relación de aspecto

                // Agregar la imagen al contenedor de vista previa
                imagePreview.appendChild(img);
            };

            // Leer el archivo como una URL de datos
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Escuchar el cambio en el campo de entrada de archivo para editar
    document.getElementById('editarInputFile').addEventListener('change', function (event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        const previewContainer = document.getElementById('editarImagePreview'); // Contenedor de vista previa
        const currentImage = document.getElementById('currentImage'); // Imagen actual

        // Limpiar la vista previa de la imagen actual
        if (currentImage) {
            currentImage.style.display = 'none'; // Ocultar la imagen actual
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewContainer.innerHTML = `<img src="${e.target.result}" alt="Vista previa" style="max-width: 100%; height: auto;">`;
            };
            reader.readAsDataURL(file); // Leer el archivo seleccionado
        } else {
            previewContainer.innerHTML = ''; // Limpiar la vista previa si no hay archivo
        }
    });
});


