document.addEventListener('DOMContentLoaded', function() {
    cargarDatosTabla();
    cargarComboboxData();

    // Evento para la búsqueda
    document.getElementById('buscarEspacio').addEventListener('input', function() {
        buscarEspacio();
    });

    // Evento para el filtro
    document.getElementById('filtrarEspecialidad').addEventListener('change', function() {
        buscarEspacio();
    });

    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/espacios_services.php?action=getAllEspacios&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener espacios:', error));
    }

    document.getElementById('formAgregarEspacio').addEventListener('submit', function(event) {
        event.preventDefault();
        agregarEspacio();
    });

    document.getElementById('imagenEspacio').addEventListener('change', function(event) {
        const input = event.target;
        const preview = document.getElementById('previewImagenEspacio');

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            preview.src = '';
            preview.style.display = 'none';
        }
    });

    document.getElementById('editarImagenEspacio').addEventListener('change', function(event) {
        const input = event.target;
        const preview = document.getElementById('previewImagenEspacioEditar');

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            preview.src = '';
            preview.style.display = 'none';
        }
    });

    function cargarComboboxData() {
        fetch(`../../api/services/espacios_services.php?action=getAllEmpleados`)
            .then(response => response.json())
            .then(data => llenarCombobox('encargadoEspacio', data, 'id_datos_empleado', 'nombre_empleado'))
            .catch(error => console.error('Error al obtener empleados:', error));

        fetch(`../../api/services/espacios_services.php?action=getAllEspecialidades`)
            .then(response => response.json())
            .then(data => {
                llenarCombobox('especialidadEspacio', data, 'id_especialidad', 'nombre_especialidad');
                llenarCombobox('filtrarEspecialidad', data, 'id_especialidad', 'nombre_especialidad', true); // Añadir la opción "Todos" aquí
            })
            .catch(error => console.error('Error al obtener especialidades:', error));

        fetch(`../../api/services/espacios_services.php?action=getAllInstituciones`)
            .then(response => response.json())
            .then(data => llenarCombobox('institucionEspacio', data, 'id_institucion', 'nombre_institucion'))
            .catch(error => console.error('Error al obtener instituciones:', error));
    }

    function llenarCombobox(elementId, data, valueField, textField, addTodos = false) {
        const select = document.getElementById(elementId);
        select.innerHTML = addTodos ? '<option value="">Todos</option>' : '<option selected>Seleccionar</option>';
        data.dataset.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            select.appendChild(option);
        });
    }

    function buscarEspacio() {
        const buscar = document.getElementById('buscarEspacio').value;
        const filtrar = document.getElementById('filtrarEspecialidad').value;
        cargarDatosTabla(buscar, filtrar);
    }
    
    function mostrarDatosTabla(data) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(espacio => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${espacio.id_espacio}</th>
                    <td>${espacio.nombre_espacio}</td>
                    <td>${espacio.capacidad_personas}</td>
                    <td>${espacio.tipo_espacio}</td>
                    <td>${espacio.nombre_empleado}</td>
                    <td>${espacio.foto_espacio ? `<img src="../../api/images/espacios/${espacio.foto_espacio}" alt="Foto del espacio" width="50" height="50">` : ''}</td>
                    <td>${espacio.nombre_especialidad}</td>
                    <td>${espacio.nombre_institucion}</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-primary btn-descargar-inventario" data-inventario="${espacio.inventario_doc}">
                            <i class="fa-solid fa-download"></i>
                        </button>
                    </td>
                    <td class="d-flex justify-content-around">
                        <button type="button" class="btn btn-success btn-editar-espacio" data-id="${espacio.id_espacio}" data-bs-toggle="modal" data-bs-target="#editarEspacio">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-eliminar-espacio" data-id="${espacio.id_espacio}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.btn-descargar-inventario').forEach(button => {
                button.addEventListener('click', function() {
                    const inventario = this.getAttribute('data-inventario');
                    Swal.fire({
                        title: '¿Quieres descargar el inventario de este espacio?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, descargar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`../../api/inventario/${inventario}`, {
                                method: 'HEAD'
                            }).then(response => {
                                if (response.ok) {
                                    window.location.href = `../../api/inventario/${inventario}`;
                                } else {
                                    Swal.fire('Error!', 'No se ha encontrado el inventario de este espacio.', 'error');
                                }
                            }).catch(() => {
                                Swal.fire('Error!', 'No se ha encontrado el inventario de este espacio.', 'error');
                            });
                        }
                    });
                });
            });

            document.querySelectorAll('.btn-eliminar-espacio').forEach(button => {
                button.addEventListener('click', function() {
                    const idEspacio = this.getAttribute('data-id');
                    Swal.fire({
                        title: '¿Estas seguro que quieres eliminar este espacio?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarEspacio(idEspacio);
                        }
                    });
                });
            });

            document.querySelectorAll('.btn-editar-espacio').forEach(button => {
                button.addEventListener('click', function() {
                    const idEspacio = this.getAttribute('data-id');
                    cargarEspacio(idEspacio);
                });
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 10;
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }
    }

    function agregarEspacio() {
        const nombreEspacio = document.getElementById('nombreEspacio').value;
        const capacidadPersonas = document.getElementById('capacidadPersonas').value;
        const tipoEspacio = document.getElementById('tipoEspacio').value;
        const encargadoEspacio = document.getElementById('encargadoEspacio').value;
        const especialidadEspacio = document.getElementById('especialidadEspacio').value;
        const institucionEspacio = document.getElementById('institucionEspacio').value;
        const imagenEspacio = document.getElementById('imagenEspacio').files[0];
        const inventarioEspacio = document.getElementById('inventarioEspacio').files[0];

        if (!nombreEspacio || !capacidadPersonas || !tipoEspacio || !encargadoEspacio || !especialidadEspacio || !institucionEspacio || !imagenEspacio || !inventarioEspacio) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        if (isNaN(capacidadPersonas) || capacidadPersonas <= 0 || !Number.isInteger(parseFloat(capacidadPersonas))) {
            Swal.fire('Error!', 'Capacidad de Personas debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('nombreEspacio', nombreEspacio);
        formData.append('capacidadPersonas', capacidadPersonas);
        formData.append('tipoEspacio', tipoEspacio);
        formData.append('encargadoEspacio', encargadoEspacio);
        formData.append('especialidadEspacio', especialidadEspacio);
        formData.append('institucionEspacio', institucionEspacio);
        formData.append('imagenEspacio', imagenEspacio);
        formData.append('inventarioEspacio', inventarioEspacio);

        fetch('../../api/services/espacios_services.php?action=addEspacio', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'El espacio se ha agregado correctamente.', 'success').then(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('AgregarEspacio'));
                    modal.hide();
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message || 'Hubo un problema al agregar el espacio.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error!', 'Hubo un problema al agregar el espacio.', 'error');
            console.error('Error al agregar espacio:', error);
        });
    }

    function eliminarEspacio(idEspacio) {
        fetch(`../../api/services/espacios_services.php?action=deleteEspacio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idEspacio: idEspacio })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'El espacio ha sido eliminado correctamente.', 'success').then(() => {
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message || 'Hubo un problema al eliminar el espacio.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error!', 'Hubo un problema al eliminar el espacio.', 'error');
            console.error('Error al eliminar espacio:', error);
        });
    }

    let originalNombreEspacio, originalCapacidadPersonas, originalTipoEspacio, originalEncargadoEspacio, originalEspecialidadEspacio, originalInstitucionEspacio;

    function cargarEspacio(idEspacio) {
        // Limpiar los labels de archivo existentes
        const archivoImagenLabel = document.getElementById('archivoImagenLabel');
        if (archivoImagenLabel) archivoImagenLabel.remove();

        const archivoInventarioLabel = document.getElementById('archivoInventarioLabel');
        if (archivoInventarioLabel) archivoInventarioLabel.remove();

        fetch(`../../api/services/espacios_services.php?action=getEspacioById`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idEspacio: idEspacio })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status && data.dataset) {
                const espacio = data.dataset;
                document.getElementById('editarIdEspacio').value = idEspacio;
                originalNombreEspacio = espacio.nombre_espacio;
                originalCapacidadPersonas = espacio.capacidad_personas;
                originalTipoEspacio = espacio.tipo_espacio;
                originalEncargadoEspacio = espacio.id_empleado;
                originalEspecialidadEspacio = espacio.id_especialidad;
                originalInstitucionEspacio = espacio.id_institucion;
    
                document.getElementById('editarNombreEspacio').value = originalNombreEspacio;
                document.getElementById('editarCapacidadPersonas').value = originalCapacidadPersonas;
                document.getElementById('editarTipoEspacio').value = originalTipoEspacio;
                document.getElementById('editarEncargadoEspacio').value = originalEncargadoEspacio;
                document.getElementById('editarEspecialidadEspacio').value = originalEspecialidadEspacio;
                document.getElementById('editarInstitucionEspacio').value = originalInstitucionEspacio;
                document.getElementById('previewImagenEspacioEditar').src = `../../api/images/espacios/${espacio.foto_espacio}`;
                document.getElementById('previewImagenEspacioEditar').style.display = 'block';
    
                const nuevoArchivoImagenLabel = document.createElement('label');
                nuevoArchivoImagenLabel.textContent = espacio.foto_espacio;
                nuevoArchivoImagenLabel.id = 'archivoImagenLabel';
                document.getElementById('editarImagenEspacio').parentNode.appendChild(nuevoArchivoImagenLabel);
    
                const nuevoArchivoInventarioLabel = document.createElement('label');
                nuevoArchivoInventarioLabel.textContent = espacio.inventario_doc;
                nuevoArchivoInventarioLabel.id = 'archivoInventarioLabel';
                document.getElementById('editarInventarioEspacio').parentNode.appendChild(nuevoArchivoInventarioLabel);
    
                fetchComboboxDataEditar(espacio.id_empleado, espacio.id_especialidad, espacio.id_institucion);
    
                Swal.fire('Cargado!', 'Los datos del espacio se han cargado correctamente.', 'success');
                new bootstrap.Modal(document.getElementById('editarEspacio')).show();
            } else {
                Swal.fire('Error!', 'Hubo un problema al obtener los datos del espacio.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error!', 'Hubo un problema al obtener los datos del espacio.', 'error');
            console.error('Error al obtener espacio:', error);
        });
    }

    function fetchComboboxDataEditar(selectedEmpleado, selectedEspecialidad, selectedInstitucion) {
        fetch(`../../api/services/espacios_services.php?action=getAllEmpleados`)
            .then(response => response.json())
            .then(data => llenarComboboxEditar('editarEncargadoEspacio', data, 'id_datos_empleado', 'nombre_empleado', selectedEmpleado))
            .catch(error => console.error('Error al obtener empleados:', error));

        fetch(`../../api/services/espacios_services.php?action=getAllEspecialidades`)
            .then(response => response.json())
            .then(data => llenarComboboxEditar('editarEspecialidadEspacio', data, 'id_especialidad', 'nombre_especialidad', selectedEspecialidad))
            .catch(error => console.error('Error al obtener especialidades:', error));

        fetch(`../../api/services/espacios_services.php?action=getAllInstituciones`)
            .then(response => response.json())
            .then(data => llenarComboboxEditar('editarInstitucionEspacio', data, 'id_institucion', 'nombre_institucion', selectedInstitucion))
            .catch(error => console.error('Error al obtener instituciones:', error));
    }

    function llenarComboboxEditar(elementId, data, valueField, textField, selectedValue) {
        const select = document.getElementById(elementId);
        select.innerHTML = '<option selected>Seleccionar</option>';
        data.dataset.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            if (item[valueField] == selectedValue) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    function editarEspacio() {
        const idEspacio = document.getElementById('editarIdEspacio').value;
        const nombreEspacio = document.getElementById('editarNombreEspacio').value;
        const capacidadPersonas = document.getElementById('editarCapacidadPersonas').value;
        const tipoEspacio = document.getElementById('editarTipoEspacio').value;
        const encargadoEspacio = document.getElementById('editarEncargadoEspacio').value;
        const especialidadEspacio = document.getElementById('editarEspecialidadEspacio').value;
        const institucionEspacio = document.getElementById('editarInstitucionEspacio').value;
        const imagenEspacio = document.getElementById('editarImagenEspacio').files[0];
        const inventarioEspacio = document.getElementById('editarInventarioEspacio').files[0];

        const originalNombre = originalNombreEspacio;
        const originalCapacidad = originalCapacidadPersonas;
        const originalTipo = originalTipoEspacio;
        const originalEncargado = originalEncargadoEspacio;
        const originalEspecialidad = originalEspecialidadEspacio;
        const originalInstitucion = originalInstitucionEspacio;
        const originalImagen = document.getElementById('archivoImagenLabel').textContent;
        const originalInventario = document.getElementById('archivoInventarioLabel').textContent;
    
        if (nombreEspacio === originalNombre && 
            capacidadPersonas === originalCapacidad && 
            tipoEspacio === originalTipo && 
            encargadoEspacio === originalEncargado && 
            especialidadEspacio === originalEspecialidad && 
            institucionEspacio === originalInstitucion && 
            !imagenEspacio && 
            !inventarioEspacio) {
            Swal.fire('Error!', 'No se puede actualizar porque no has hecho ningún cambio.', 'error');
            return;
        }
    
        if (!nombreEspacio || !capacidadPersonas || !tipoEspacio || !encargadoEspacio || !especialidadEspacio || !institucionEspacio) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }
    
        if (isNaN(capacidadPersonas) || capacidadPersonas <= 0 || !Number.isInteger(parseFloat(capacidadPersonas))) {
            Swal.fire('Error!', 'Capacidad de Personas debe ser un número entero positivo.', 'error');
            return;
        }
    
        const formData = new FormData();
        formData.append('idEspacio', idEspacio);
        formData.append('nombreEspacio', nombreEspacio);
        formData.append('capacidadPersonas', capacidadPersonas);
        formData.append('tipoEspacio', tipoEspacio);
        formData.append('encargadoEspacio', encargadoEspacio);
        formData.append('especialidadEspacio', especialidadEspacio);
        formData.append('institucionEspacio', institucionEspacio);
    
        if (imagenEspacio) {
            formData.append('imagenEspacio', imagenEspacio);
        } else {
            formData.append('imagenEspacio', originalImagen);
        }
    
        if (inventarioEspacio) {
            formData.append('inventarioEspacio', inventarioEspacio);
        } else {
            formData.append('inventarioEspacio', originalInventario);
        }
    
        fetch('../../api/services/espacios_services.php?action=updateEspacio', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Actualizado!', 'El espacio ha sido actualizado correctamente.', 'success').then(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('editarEspacio'));
                    modal.hide();
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message || 'Hubo un problema al actualizar el espacio.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error!', 'Hubo un problema al actualizar el espacio.', 'error');
            console.error('Error al actualizar espacio:', error);
        });
    }

    document.getElementById('formEditarEspacio').addEventListener('submit', function(event) {
        event.preventDefault();
        editarEspacio();
    });

    const modalElement = document.getElementById('editarEspacio');
    modalElement.addEventListener('hidden.bs.modal', function () {
        const form = document.getElementById('formEditarEspacio');
        form.reset();
        const preview = document.getElementById('previewImagenEspacioEditar');
        preview.src = '';
        preview.style.display = 'none';
        const archivoImagenLabel = document.getElementById('archivoImagenLabel');
        if (archivoImagenLabel) archivoImagenLabel.remove();
        const archivoInventarioLabel = document.getElementById('archivoInventarioLabel');
        if (archivoInventarioLabel) archivoInventarioLabel.remove();

        document.body.classList.remove('modal-open');
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
    });
});
