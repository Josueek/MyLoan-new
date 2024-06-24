document.addEventListener('DOMContentLoaded', function() {
    cargarDatosTabla();
    cargarComboboxData();

    // Evento para la búsqueda
    document.getElementById('buscarCurso').addEventListener('input', function() {
        buscarCurso();
    });

    // Evento para agregar curso
    document.getElementById('formAgregarCurso').addEventListener('submit', function(event) {
        event.preventDefault();
        Swal.fire({
            title: `¿Estás seguro que deseas agregar el curso ${document.getElementById('nombreCurso').value}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, agregar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                agregarCurso();
            }
        });
    });

    // Evento para editar curso
    document.getElementById('formEditarCurso').addEventListener('submit', function(event) {
        event.preventDefault();
        Swal.fire({
            title: `¿Estás seguro que deseas editar el curso ${document.getElementById('editarNombreCurso').value}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                editarCurso();
            }
        });
    });

    function cargarDatosTabla(buscar = '') {
        fetch(`../../api/services/curso_services.php?action=getAllCursos&buscar=${buscar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener cursos:', error));
    }

    function cargarComboboxData() {
        fetch(`../../api/services/curso_services.php?action=getAllEmpleados`)
            .then(response => response.json())
            .then(data => llenarCombobox('empleadoCurso', data, 'id_datos_empleado', 'nombre_empleado'))
            .catch(error => console.error('Error al obtener empleados:', error));
        
        fetch(`../../api/services/curso_services.php?action=getAllEmpleados`)
            .then(response => response.json())
            .then(data => llenarCombobox('editarEmpleadoCurso', data, 'id_datos_empleado', 'nombre_empleado'))
            .catch(error => console.error('Error al obtener empleados:', error));
    }

    function llenarCombobox(elementId, data, valueField, textField) {
        const select = document.getElementById(elementId);
        select.innerHTML = '<option selected>Seleccionar</option>';
        data.dataset.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            select.appendChild(option);
        });
    }

    function buscarCurso() {
        const buscar = document.getElementById('buscarCurso').value;
        cargarDatosTabla(buscar);
    }

    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tablaCursos');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(curso => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${curso.nombre_curso}</td>
                    <td>${curso.fecha_inicio}</td>
                    <td>${curso.fecha_fin}</td>
                    <td>${curso.cantidad_personas}</td>
                    <td>${curso.grupo}</td>
                    <td>${curso.programa_formacion}</td>
                    <td>${curso.codigo_curso}</td>
                    <td>${curso.nombre_empleado}</td>
                    <td>${curso.estado}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-editar-curso" data-id="${curso.id_curso}" data-bs-toggle="modal" data-bs-target="#editarCursoModal">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-eliminar-curso" data-id="${curso.id_curso}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.btn-editar-curso').forEach(button => {
                button.addEventListener('click', function() {
                    const idCurso = this.getAttribute('data-id');
                    cargarCurso(idCurso);
                });
            });

            document.querySelectorAll('.btn-eliminar-curso').forEach(button => {
                button.addEventListener('click', function() {
                    const idCurso = this.getAttribute('data-id');
                    eliminarCurso(idCurso);
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

    function agregarCurso() {
        const nombre = document.getElementById('nombreCurso').value;
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;
        const cantidadPersonas = document.getElementById('cantidadPersonas').value;
        const grupo = document.getElementById('grupo').value;
        const programaFormacion = document.getElementById('programaFormacion').value;
        const codigoCurso = document.getElementById('codigoCurso').value;
        const empleado = document.getElementById('empleadoCurso').value;

        if (!nombre || !fechaInicio || !fechaFin || !cantidadPersonas || !grupo || !programaFormacion || !codigoCurso || !empleado) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        const fechaActual = new Date().toISOString().split('T')[0];
        if (fechaInicio < fechaActual) {
            Swal.fire('Error!', 'La fecha de inicio debe ser la actual o una fecha futura.', 'error');
            return;
        }

        if (fechaFin < fechaInicio) {
            Swal.fire('Error!', 'La fecha de fin debe ser mayor o igual a la fecha de inicio.', 'error');
            return;
        }

        if (isNaN(cantidadPersonas) || cantidadPersonas <= 0 || !Number.isInteger(parseFloat(cantidadPersonas))) {
            Swal.fire('Error!', 'Cantidad de personas debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('fechaInicio', fechaInicio);
        formData.append('fechaFin', fechaFin);
        formData.append('cantidadPersonas', cantidadPersonas);
        formData.append('grupo', grupo);
        formData.append('programaFormacion', programaFormacion);
        formData.append('codigoCurso', codigoCurso);
        formData.append('empleado', empleado);
        formData.append('estado', 'pendiente'); // Estado por defecto

        fetch('../../api/services/curso_services.php?action=addCurso', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'Curso agregado correctamente.', 'success').then(() => {
                    document.getElementById('formAgregarCurso').reset();
                    cargarDatosTabla();
                    $('#agregarCursoModal').modal('hide');
                });
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al agregar curso:', error);
            Swal.fire('Error!', 'Hubo un problema al agregar el curso.', 'error');
        });
    }

    function cargarCurso(idCurso) {
        fetch(`../../api/services/curso_services.php?action=getCurso&id=${idCurso}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const curso = data.dataset;
                    document.getElementById('editarIdCurso').value = curso.id_curso;
                    document.getElementById('editarNombreCurso').value = curso.nombre_curso;
                    document.getElementById('editarFechaInicio').value = curso.fecha_inicio;
                    document.getElementById('editarFechaFin').value = curso.fecha_fin;
                    document.getElementById('editarCantidadPersonas').value = curso.cantidad_personas;
                    document.getElementById('editarGrupo').value = curso.grupo;
                    document.getElementById('editarProgramaFormacion').value = curso.programa_formacion;
                    document.getElementById('editarCodigoCurso').value = curso.codigo_curso;
                    document.getElementById('editarEmpleadoCurso').value = curso.id_empleado;
                    document.getElementById('editarEstadoCurso').value = curso.estado;
                    Swal.fire('Datos cargados!', 'Se han cargado los datos del curso correctamente.', 'success');
                } else {
                    Swal.fire('Error!', 'No se pudieron obtener los datos del curso.', 'error');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del curso:', error);
                Swal.fire('Error!', 'Hubo un problema al obtener los datos del curso.', 'error');
            });
    }

    function editarCurso() {
        const id = document.getElementById('editarIdCurso').value;
        const nombre = document.getElementById('editarNombreCurso').value;
        const fechaInicio = document.getElementById('editarFechaInicio').value;
        const fechaFin = document.getElementById('editarFechaFin').value;
        const cantidadPersonas = document.getElementById('editarCantidadPersonas').value;
        const grupo = document.getElementById('editarGrupo').value;
        const programaFormacion = document.getElementById('editarProgramaFormacion').value;
        const codigoCurso = document.getElementById('editarCodigoCurso').value;
        const empleado = document.getElementById('editarEmpleadoCurso').value;
        const estado = document.getElementById('editarEstadoCurso').value;

        if (!nombre || !fechaInicio || !fechaFin || !cantidadPersonas || !grupo || !programaFormacion || !codigoCurso || !empleado || !estado) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        const fechaActual = new Date().toISOString().split('T')[0];
        if (fechaInicio < fechaActual) {
            Swal.fire('Error!', 'La fecha de inicio debe ser la actual o una fecha futura.', 'error');
            return;
        }

        if (fechaFin < fechaInicio) {
            Swal.fire('Error!', 'La fecha de fin debe ser mayor o igual a la fecha de inicio.', 'error');
            return;
        }

        if (isNaN(cantidadPersonas) || cantidadPersonas <= 0 || !Number.isInteger(parseFloat(cantidadPersonas))) {
            Swal.fire('Error!', 'Cantidad de personas debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        formData.append('nombre', nombre);
        formData.append('fechaInicio', fechaInicio);
        formData.append('fechaFin', fechaFin);
        formData.append('cantidadPersonas', cantidadPersonas);
        formData.append('grupo', grupo);
        formData.append('programaFormacion', programaFormacion);
        formData.append('codigoCurso', codigoCurso);
        formData.append('empleado', empleado);
        formData.append('estado', estado);

        fetch('../../api/services/curso_services.php?action=updateCurso', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'Curso actualizado correctamente.', 'success').then(() => {
                    cargarDatosTabla();
                    $('#editarCursoModal').modal('hide');
                });
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al actualizar curso:', error);
            Swal.fire('Error!', 'Hubo un problema al actualizar el curso.', 'error');
        });
    }

    function eliminarCurso(idCurso) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`../../api/services/curso_services.php?action=deleteCurso`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idCurso })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        Swal.fire('¡Eliminado!', 'El curso ha sido eliminado.', 'success');
                        cargarDatosTabla();
                    } else {
                        Swal.fire('Error!', data.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar curso:', error);
                    Swal.fire('Error!', 'Hubo un problema al eliminar el curso.', 'error');
                });
            }
        });
    }
});
