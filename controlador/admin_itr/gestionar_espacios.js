document.addEventListener('DOMContentLoaded', function() {
    cargarDatosTabla();
    cargarComboboxData();

    document.getElementById('formAgregarEspacio').addEventListener('submit', function(event) {
        event.preventDefault();
        agregarEspacio();
    });

    // Evento para mostrar la vista previa de la imagen
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

    function cargarDatosTabla() {
        fetch(`../../api/services/espacios_services.php?action=getAllEspacios`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener espacios:', error));
    }

    function cargarComboboxData() {
        fetch(`../../api/services/espacios_services.php?action=getAllEmpleados`)
            .then(response => response.json())
            .then(data => llenarCombobox('encargadoEspacio', data, 'id_datos_empleado', 'nombre_empleado'))
            .catch(error => console.error('Error al obtener empleados:', error));

        fetch(`../../api/services/espacios_services.php?action=getAllEspecialidades`)
            .then(response => response.json())
            .then(data => llenarCombobox('especialidadEspacio', data, 'id_especialidad', 'nombre_especialidad'))
            .catch(error => console.error('Error al obtener especialidades:', error));

        fetch(`../../api/services/espacios_services.php?action=getAllInstituciones`)
            .then(response => response.json())
            .then(data => llenarCombobox('institucionEspacio', data, 'id_institucion', 'nombre_institucion'))
            .catch(error => console.error('Error al obtener instituciones:', error));
    }

    function llenarCombobox(elementId, data, valueField, textField) {
        const select = document.getElementById(elementId);
        select.innerHTML = '<option selected>Seleccionar</option>'; // Limpiar opciones anteriores y añadir "Seleccionar"
        data.dataset.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            select.appendChild(option);
        });
    }

    function mostrarDatosTabla(data) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

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
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#descargarInvet" data-bs-whatever="${espacio.inventario_doc}">
                            <i class="fa-solid fa-download"></i>
                        </button>
                    </td>
                    <td class="d-flex justify-content-around">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editarEspa" data-bs-whatever="${espacio.id_espacio}" id="btnEditarEspa">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalBorar" data-bs-whatever="${espacio.id_espacio}" id="btnborrar">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
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
});
