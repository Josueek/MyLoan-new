document.addEventListener('DOMContentLoaded', function() {
    cargarDatosTabla();
    agregarEventos();

    // Función para cargar datos en la tabla
    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/material_services.php?action=getAllMateriales&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener materiales:', error));
    }

    // Función para agregar los eventos a los elementos del DOM
    function agregarEventos() {
        // Evento para la búsqueda
        document.getElementById('buscarMaterial').addEventListener('input', function() {
            buscarMaterial();
        });

        // Evento para el filtro
        document.getElementById('filtrarCantidad').addEventListener('change', function() {
            buscarMaterial();
        });

        // Evento para agregar material
        document.getElementById('formAgregarMaterial').addEventListener('submit', function(event) {
            event.preventDefault();
            agregarMaterial();
        });

        // Evento para editar material
        document.getElementById('formEditarMaterial').addEventListener('submit', function(event) {
            event.preventDefault();
            editarMaterial();
        });
    }

    // Función para buscar materiales
    function buscarMaterial() {
        const buscar = document.getElementById('buscarMaterial').value;
        const filtrar = document.getElementById('filtrarCantidad').value;
        cargarDatosTabla(buscar, filtrar);
    }

    // Función para mostrar datos en la tabla
    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tablaMateriales');
        tbody.innerHTML = '';

        if (data.status && data.dataset.length > 0) {
            data.dataset.forEach(material => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${material.nombre}</td>
                    <td>${material.cantidad}</td>
                    <td>${material.descripcion}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-editar-material" data-id="${material.id_material}" data-bs-toggle="modal" data-bs-target="#editarMaterialModal">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-eliminar-material" data-id="${material.id_material}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Añadir eventos a los botones de editar y eliminar
            document.querySelectorAll('.btn-editar-material').forEach(button => {
                button.addEventListener('click', function() {
                    const idMaterial = this.getAttribute('data-id');
                    cargarMaterial(idMaterial);
                });
            });

            document.querySelectorAll('.btn-eliminar-material').forEach(button => {
                button.addEventListener('click', function() {
                    const idMaterial = this.getAttribute('data-id');
                    eliminarMaterial(idMaterial);
                });
            });
        } else {
            const noRecordsRow = document.createElement('tr');
            const noRecordsCell = document.createElement('td');
            noRecordsCell.colSpan = 4;
            noRecordsCell.textContent = 'No se encontraron registros';
            noRecordsRow.appendChild(noRecordsCell);
            tbody.appendChild(noRecordsRow);
        }
    }

    // Función para agregar material
    function agregarMaterial() {
        const nombre = document.getElementById('nombreMaterial').value;
        const cantidad = document.getElementById('cantidadMaterial').value;
        const descripcion = document.getElementById('descripcionMaterial').value;

        // Validaciones
        if (!nombre || !cantidad) {
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
        formData.append('descripcion', descripcion);

        fetch('../../api/services/material_services.php?action=addMaterial', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'Material agregado correctamente.', 'success').then(() => {
                    document.getElementById('formAgregarMaterial').reset();
                    document.getElementById('agregarMaterialModal').querySelector('.btn-close').click();
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al agregar material:', error);
            Swal.fire('Error!', 'Hubo un problema al agregar el material.', 'error');
        });
    }

    // Función para cargar material en el formulario de edición
    function cargarMaterial(idMaterial) {
        fetch(`../../api/services/material_services.php?action=getMaterial&id=${idMaterial}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const material = data.dataset;
                    document.getElementById('editarIdMaterial').value = material.id_material;
                    document.getElementById('editarNombreMaterial').value = material.nombre;
                    document.getElementById('editarCantidadMaterial').value = material.cantidad;
                    document.getElementById('editarDescripcionMaterial').value = material.descripcion;
                    Swal.fire('Éxito!', 'Datos cargados correctamente.', 'success');
                } else {
                    Swal.fire('Error!', 'No se pudieron obtener los datos del material.', 'error');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del material:', error);
                Swal.fire('Error!', 'Hubo un problema al obtener los datos del material.', 'error');
            });
    }

    // Función para editar material
    function editarMaterial() {
        const id = document.getElementById('editarIdMaterial').value;
        const nombre = document.getElementById('editarNombreMaterial').value;
        const cantidad = document.getElementById('editarCantidadMaterial').value;
        const descripcion = document.getElementById('editarDescripcionMaterial').value;

        // Validaciones
        if (!nombre || !cantidad) {
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
        formData.append('descripcion', descripcion);

        fetch('../../api/services/material_services.php?action=updateMaterial', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito!', 'Material actualizado correctamente.', 'success').then(() => {
                    document.getElementById('editarMaterialModal').querySelector('.btn-close').click();
                    cargarDatosTabla();
                });
            } else {
                Swal.fire('Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al actualizar material:', error);
            Swal.fire('Error!', 'Hubo un problema al actualizar el material.', 'error');
        });
    }

    // Función para eliminar material
    function eliminarMaterial(idMaterial) {
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
                fetch(`../../api/services/material_services.php?action=deleteMaterial`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idMaterial })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        Swal.fire('¡Eliminado!', 'El material ha sido eliminado.', 'success');
                        cargarDatosTabla();
                    } else {
                        Swal.fire('Error!', data.message, 'error');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar material:', error);
                    Swal.fire('Error!', 'Hubo un problema al eliminar el material.', 'error');
                });
            }
        });
    }
});
