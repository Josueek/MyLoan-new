document.addEventListener('DOMContentLoaded', function () {
    cargarDatosTabla();
    cargarComboboxData();

    // Evento para la búsqueda
    document.getElementById('buscarEquipo').addEventListener('input', function () {
        buscarEquipo();
    });

    // Evento para el filtro
    document.getElementById('filtroCantidad').addEventListener('change', function () {
        buscarEquipo();
    });

    // Evento para agregar equipo
    document.getElementById('formAgregarEquipo').addEventListener('submit', function (event) {
        event.preventDefault();
        agregarEquipo();
    });

    // Evento para manejar el envío del formulario
    document.getElementById('formReporteEspacios').addEventListener('submit', function (event) {
        event.preventDefault();  // Evitar el comportamiento predeterminado del formulario
        generarReporteEquipos();  // Llamar a la función que valida y genera el reporte
    });

 

    // Evento para editar equipo
    document.getElementById('formEditarEquipo').addEventListener('submit', function (event) {
        event.preventDefault();
        editarEquipo();
    });

    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/equipo_services.php?action=getAllEquipos&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener equipos:', error));
    }

    function cargarComboboxData() {
        fetch(`../../api/services/equipo_services.php?action=getAllInstituciones`)
            .then(response => response.json())
            .then(data => {
                llenarCombobox('institucionEquipo', data, 'id_institucion', 'nombre_institucion');
                llenarCombobox('editarInstitucionEquipo', data, 'id_institucion', 'nombre_institucion');
            })
            .catch(error => console.error('Error al obtener instituciones:', error));

        fetch(`../../api/services/equipo_services.php?action=getAllEspacios`)
            .then(response => response.json())
            .then(data => {
                llenarCombobox('espacioEquipo', data, 'id_espacio', 'nombre_espacio');
                llenarCombobox('editarEspacioEquipo', data, 'id_espacio', 'nombre_espacio');

                llenarCombobox('ReporteEspacioEquipo', data, 'id_espacio', 'nombre_espacio');
            })
            .catch(error => console.error('Error al obtener espacios:', error));
    }

    function llenarCombobox(elementId, data, valueField, textField) {
        const select = document.getElementById(elementId);
        if (elementId === 'filtroCantidad') {
            select.innerHTML = '<option value="">Todos</option>';
        } else {
            select.innerHTML = '<option selected>Seleccionar</option>';
        }
        data.dataset.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            select.appendChild(option);
        });
    }

    function buscarEquipo() {
        const buscar = document.getElementById('buscarEquipo').value;
        const filtrar = document.getElementById('filtroCantidad').value;
        cargarDatosTabla(buscar, filtrar);
    }

    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tablaEquipos');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(equipo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${equipo.nombre}</td>
                    <td>${equipo.cantidad}</td>
                    <td>${equipo.nombre_espacio}</td>
                    <td>${equipo.nombre_institucion}</td>
                    <td>${equipo.descripcion}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-editar-equipo" data-id="${equipo.id_equipo}" data-bs-toggle="modal" data-bs-target="#editarEquipoModal">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-eliminar-equipo" data-id="${equipo.id_equipo}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.btn-editar-equipo').forEach(button => {
                button.addEventListener('click', function () {
                    const idEquipo = this.getAttribute('data-id');
                    cargarEquipo(idEquipo);
                });
            });

            document.querySelectorAll('.btn-eliminar-equipo').forEach(button => {
                button.addEventListener('click', function () {
                    const idEquipo = this.getAttribute('data-id');
                    eliminarEquipo(idEquipo);
                });
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 6;
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }
    }

    function agregarEquipo() {
        const nombre = document.getElementById('nombreEquipo').value;
        const cantidad = document.getElementById('cantidadEquipo').value;
        const espacio = document.getElementById('espacioEquipo').value;
        const institucion = document.getElementById('institucionEquipo').value;
        const descripcion = document.getElementById('descripcionEquipo').value;

        if (!nombre || !cantidad || !espacio || !institucion) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0 || !Number.isInteger(parseFloat(cantidad))) {
            Swal.fire('Error!', 'Cantidad debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('cantidad', cantidad);
        formData.append('espacio', espacio);
        formData.append('institucion', institucion);
        formData.append('descripcion', descripcion);

        fetch('../../api/services/equipo_services.php?action=addEquipo', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Equipo agregado correctamente.', 'success').then(() => {
                        document.getElementById('formAgregarEquipo').reset();
                        $('#agregarEquipoModal').modal('hide'); // Cerrar el modal
                        cargarDatosTabla();
                    });
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error al agregar equipo:', error);
                Swal.fire('Error!', 'Hubo un problema al agregar el equipo.', 'error');
            });
    }

    /**
     * Funcion para generar reporte sobre los equipos  registrados en cada espacio
     */
    const generarReporteEquipos = () => {
        // Obtener el estado seleccionado por el usuario
        const estadoSeleccionado = document.getElementById('ReporteEspacioEquipo').value;

        if (estadoSeleccionado) {
            // Definir la ruta del reporte, incluyendo el estado como parámetro
            const PATH = new URL(`${SERVER_URL}reportes/equipo_espacio.php?estado=${estadoSeleccionado}`);

            // Abrir el reporte en una nueva pestaña
            window.open(PATH.href);
        } else {
            alert('Por favor, seleccione un espacio para generar el reporte.');
        }
    };


    function cargarEquipo(idEquipo) {
        fetch(`../../api/services/equipo_services.php?action=getEquipo&id=${idEquipo}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const equipo = data.dataset;
                    document.getElementById('editarIdEquipo').value = equipo.id_equipo;
                    document.getElementById('editarNombreEquipo').value = equipo.nombre;
                    document.getElementById('editarCantidadEquipo').value = equipo.cantidad;
                    document.getElementById('editarEspacioEquipo').value = equipo.id_espacio;
                    document.getElementById('editarInstitucionEquipo').value = equipo.id_institucion;
                    document.getElementById('editarDescripcionEquipo').value = equipo.descripcion;
                    Swal.fire('Datos cargados!', 'Se han cargado los datos del equipo correctamente.', 'success');
                } else {
                    Swal.fire('Error!', 'No se pudieron obtener los datos del equipo.', 'error');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del equipo:', error);
                Swal.fire('Error!', 'Hubo un problema al obtener los datos del equipo.', 'error');
            });
    }

    function editarEquipo() {
        const id = document.getElementById('editarIdEquipo').value;
        const nombre = document.getElementById('editarNombreEquipo').value;
        const cantidad = document.getElementById('editarCantidadEquipo').value;
        const espacio = document.getElementById('editarEspacioEquipo').value;
        const institucion = document.getElementById('editarInstitucionEquipo').value;
        const descripcion = document.getElementById('editarDescripcionEquipo').value;

        if (!nombre || !cantidad || !espacio || !institucion) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0 || !Number.isInteger(parseFloat(cantidad))) {
            Swal.fire('Error!', 'Cantidad debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        formData.append('nombre', nombre);
        formData.append('cantidad', cantidad);
        formData.append('espacio', espacio);
        formData.append('institucion', institucion);
        formData.append('descripcion', descripcion);

        fetch('../../api/services/equipo_services.php?action=updateEquipo', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Equipo actualizado correctamente.', 'success').then(() => {
                        cargarDatosTabla();
                        $('#editarEquipoModal').modal('hide'); // Cerrar el modal
                    });
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error al actualizar equipo:', error);
                Swal.fire('Error!', 'Hubo un problema al actualizar el equipo.', 'error');
            });
    }

    function eliminarEquipo(idEquipo) {
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
                fetch(`../../api/services/equipo_services.php?action=deleteEquipo`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idEquipo })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status) {
                            Swal.fire('¡Eliminado!', 'El equipo ha sido eliminado.', 'success');
                            cargarDatosTabla();
                        } else {
                            Swal.fire('Error!', data.message, 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Error al eliminar equipo:', error);
                        Swal.fire('Error!', 'Hubo un problema al eliminar el equipo.', 'error');
                    });
            }
        });
    }
});
