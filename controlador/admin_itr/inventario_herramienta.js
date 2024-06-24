document.addEventListener('DOMContentLoaded', function() {
    cargarDatosTabla();
    cargarComboboxData();

    // Evento para la búsqueda
    document.getElementById('buscarHerramienta').addEventListener('input', function() {
        buscarHerramienta();
    });

    // Evento para el filtro
    document.getElementById('filtroInstitucion').addEventListener('change', function() {
        buscarHerramienta();
    });

    // Evento para agregar herramienta
    document.getElementById('formAgregarHerramienta').addEventListener('submit', function(event) {
        event.preventDefault();
        agregarHerramienta();
    });

    // Evento para editar herramienta
    document.getElementById('formEditarHerramienta').addEventListener('submit', function(event) {
        event.preventDefault();
        editarHerramienta();
    });

    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/inventario_herramienta_services.php?action=getAllHerramientas&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener herramientas:', error));
    }

    function cargarComboboxData() {
        fetch(`../../api/services/inventario_herramienta_services.php?action=getAllInstituciones`)
            .then(response => response.json())
            .then(data => {
                llenarCombobox('institucionHerramienta', data, 'id_institucion', 'nombre_institucion');
                llenarCombobox('editarInstitucionHerramienta', data, 'id_institucion', 'nombre_institucion');
                llenarCombobox('filtroInstitucion', data, 'id_institucion', 'nombre_institucion', true);
            })
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

    function buscarHerramienta() {
        const buscar = document.getElementById('buscarHerramienta').value;
        const filtrar = document.getElementById('filtroInstitucion').value;
        cargarDatosTabla(buscar, filtrar);
    }

    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tablaHerramientas');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(herramienta => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${herramienta.codigo_herramienta}</td>
                    <td>${herramienta.nombre_herramienta}</td>
                    <td>${herramienta.stock}</td>
                    <td>${herramienta.nombre_institucion}</td>
                    <td>${herramienta.descripcion}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-editar-herramienta" data-codigo="${herramienta.codigo_herramienta}" data-bs-toggle="modal" data-bs-target="#editarHerramientaModal">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-eliminar-herramienta" data-codigo="${herramienta.codigo_herramienta}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.btn-editar-herramienta').forEach(button => {
                button.addEventListener('click', function() {
                    const codigoHerramienta = this.getAttribute('data-codigo');
                    cargarHerramienta(codigoHerramienta);
                });
            });

            document.querySelectorAll('.btn-eliminar-herramienta').forEach(button => {
                button.addEventListener('click', function() {
                    const codigoHerramienta = this.getAttribute('data-codigo');
                    eliminarHerramienta(codigoHerramienta);
                });
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 6; // Incremented to match the new column count
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }
    }

    function agregarHerramienta() {
        const codigo = document.getElementById('codigoHerramienta').value;
        const nombre = document.getElementById('nombreHerramienta').value;
        const stock = document.getElementById('stockHerramienta').value;
        const institucion = document.getElementById('institucionHerramienta').value;
        const descripcion = document.getElementById('descripcionHerramienta').value;

        if (!codigo || !nombre || !stock || !institucion) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        if (isNaN(stock) || stock <= 0 || !Number.isInteger(parseFloat(stock))) {
            Swal.fire('Error!', 'Stock debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('codigo', codigo);
        formData.append('nombre', nombre);
        formData.append('stock', stock);
        formData.append('institucion', institucion);
        formData.append('descripcion', descripcion);

        fetch('../../api/services/inventario_herramienta_services.php?action=addHerramienta', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'Herramienta agregada correctamente.', 'success').then(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('agregarHerramientaModal'));
                    modal.hide();
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al agregar herramienta:', error);
            Swal.fire('Error!', 'Hubo un problema al agregar la herramienta.', 'error');
        });
    }

    function cargarHerramienta(codigoHerramienta) {
        fetch(`../../api/services/inventario_herramienta_services.php?action=getHerramienta&codigo=${codigoHerramienta}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const herramienta = data.dataset;
                    document.getElementById('editarCodigoHerramienta').value = herramienta.codigo_herramienta;
                    document.getElementById('editarNombreHerramienta').value = herramienta.nombre_herramienta;
                    document.getElementById('editarStockHerramienta').value = herramienta.stock;
                    document.getElementById('editarInstitucionHerramienta').value = herramienta.id_institucion;
                    document.getElementById('editarDescripcionHerramienta').value = herramienta.descripcion;
                    Swal.fire('Cargado!', 'Los datos de la herramienta se han cargado correctamente.', 'success');
                } else {
                    Swal.fire('Error!', 'No se pudieron obtener los datos de la herramienta.', 'error');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos de la herramienta:', error);
                Swal.fire('Error!', 'Hubo un problema al obtener los datos de la herramienta.', 'error');
            });
    }

    function editarHerramienta() {
        const codigo = document.getElementById('editarCodigoHerramienta').value;
        const nombre = document.getElementById('editarNombreHerramienta').value;
        const stock = document.getElementById('editarStockHerramienta').value;
        const institucion = document.getElementById('editarInstitucionHerramienta').value;
        const descripcion = document.getElementById('editarDescripcionHerramienta').value;

        if (!codigo || !nombre || !stock || !institucion) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        if (isNaN(stock) || stock <= 0 || !Number.isInteger(parseFloat(stock))) {
            Swal.fire('Error!', 'Stock debe ser un número entero positivo.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('codigo', codigo);
        formData.append('nombre', nombre);
        formData.append('stock', stock);
        formData.append('institucion', institucion);
        formData.append('descripcion', descripcion);

        fetch('../../api/services/inventario_herramienta_services.php?action=updateHerramienta', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'Herramienta actualizada correctamente.', 'success').then(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('editarHerramientaModal'));
                    modal.hide();
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al actualizar herramienta:', error);
            Swal.fire('Error!', 'Hubo un problema al actualizar la herramienta.', 'error');
        });
    }

    function eliminarHerramienta(codigoHerramienta) {
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
                fetch(`../../api/services/inventario_herramienta_services.php?action=deleteHerramienta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ codigoHerramienta: codigoHerramienta })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        Swal.fire('¡Eliminada!', 'La herramienta ha sido eliminada.', 'success');
                        cargarDatosTabla();
                    } else {
                        Swal.fire('Error!', data.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar herramienta:', error);
                    Swal.fire('Error!', 'Hubo un problema al eliminar la herramienta.', 'error');
                });
            }
        });
    }
});
