document.addEventListener('DOMContentLoaded', function () {
    // Cargar cursos y empleados al iniciar
    cargarComboboxCursos();
    cargarComboboxHerramientas(); // Cargar herramientas
    cargarComboboxEspacios();
    cargarComboboxEmpleados();
    cargarComboboxMateriales(); // Cargar materiales
    cargarComboboxEquipos(); // Cargar equipos

    // Evento para el botón de agregar préstamo
    document.getElementById('btnSiguiente').addEventListener('click', function(event) {
        event.preventDefault();
        agregarPrestamo();
        obtenerUltimoIdPrestamo();
    });

    // Evento para el botón de guardar detalles
    document.getElementById('btnGuardarDetalles').addEventListener('click', function(event) {
        event.preventDefault();
        agregarDetallesPrestamo(); // Llama a la función para guardar los detalles del préstamo
    });
});

async function abrirModal() {
    const modal = new bootstrap.Modal(document.getElementById('detallesModal'), {
        keyboard: false
    });
    
    // Llamar a la función para obtener el último ID de préstamo
    const response = await obtenerUltimoIdPrestamo(); // Asegúrate que esta función retorne el valor correcto

    // Verifica la respuesta y asigna el ID al campo
    if (response && response.status) {
        const lastId = response.lastId; // Almacena el ID en una variable
        document.getElementById('idPrestamo').value = lastId; // Asigna el ID al campo
        console.log('ID Préstamo asignado:', lastId); // Verifica que el ID se asigne correctamente
    } else {
        console.error('Error al obtener el último ID de préstamo:', response);
    }

    modal.show(); // Muestra el modal
}






// Función para cargar cursos en el combobox
function cargarComboboxCursos() {
    fetch('../../api/services/cargar_curso_services.php?action=getAllCursos')
        .then(response => response.json())
        .then(data => {
            if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                llenarCombobox('institucion', data.dataset, 'id_curso', 'nombre_curso');
            } else {
                console.error('No se encontraron cursos o los datos no están en el formato esperado');
            }
        })
        .catch(error => console.error('Error al obtener cursos:', error));
}

// Función para cargar empleados en el combobox
function cargarComboboxEmpleados() {
    fetch('../../api/services/empleado_services.php?action=getEmpleados')
        .then(response => response.json())
        .then(data => {
            if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                llenarCombobox('empleado', data.dataset, 'id_datos_empleado', 'nombre_empleado');
            } else {
                console.error('No se encontraron empleados o los datos no están en el formato esperado');
            }
        })
        .catch(error => console.error('Error al obtener empleados:', error));
}

// Función para cargar materiales en el combobox
function cargarComboboxMateriales() {
    const buscar = ''; 
    const filtrar = '';

    fetch(`../../api/services/material_services.php?action=getAllMateriales&buscar=${buscar}&filtrar=${filtrar}`)
        .then(response => response.json())
        .then(data => {
            console.log('Materiales:', data);
            if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                llenarCombobox('material', data.dataset, 'id_material', 'nombre');
            } else {
                console.error('No se encontraron materiales o los datos no están en el formato esperado');
            }
        })
        .catch(error => console.error('Error al obtener materiales:', error));
}

// Función para cargar equipos en el combobox
function cargarComboboxEquipos() {
    const buscar = '';
    const filtrar = '';

    fetch(`../../api/services/equipo_services.php?action=getAllEquipos&buscar=${buscar}&filtrar=${filtrar}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                llenarCombobox('equipo', data.dataset, 'id_equipo', 'nombre');
            } else {
                console.error('No se encontraron equipos o los datos no están en el formato esperado');
            }
        })
        .catch(error => console.error('Error al obtener equipos:', error));
}

// Función para cargar herramientas en el combobox
function cargarComboboxHerramientas() {
    const buscar = '';
    const filtrar = '';

    fetch(`../../api/services/inventario_herramienta_services.php?action=getAllHerramientas&buscar=${buscar}&filtrar=${filtrar}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                llenarCombobox('codigoHerramienta', data.dataset, 'codigo_herramienta', 'nombre_herramienta');
            } else {
                console.error('No se encontraron herramientas o los datos no están en el formato esperado');
            }
        })
        .catch(error => console.error('Error al obtener herramientas:', error));
}

// Función reutilizable para llenar el combobox
function llenarCombobox(elementId, data, valueField, textField, addTodos = false) {
    const select = document.getElementById(elementId);
    if (!select) {
        console.error(`El elemento con ID '${elementId}' no fue encontrado.`);
        return;
    }
    select.innerHTML = addTodos ? '<option value="">Todos</option>' : '<option selected>Seleccionar</option>';

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueField]; // ID a enviar a la base de datos
        option.textContent = item[textField]; // Nombre para mostrar en el combobox
        select.appendChild(option);
    });
}

// Función para agregar un préstamo
function agregarPrestamo() {
    const fechaElemento = document.getElementById('fechaEntrega');
    const programaElemento = document.getElementById('programaformacion');
    const descripcionElemento = document.getElementById('descripcion');
    const cursoElemento = document.getElementById('institucion');
    const usuarioElemento = document.getElementById('empleado');

    if (!fechaElemento || !programaElemento || !descripcionElemento || !cursoElemento || !usuarioElemento) {
        console.error('Uno o más elementos no fueron encontrados en el DOM.');
        Swal.fire('Error!', 'Hay un problema con los elementos del formulario.', 'error');
        return;
    }

    // Obtener el valor de la fecha
    const fecha_solicitud = fechaElemento.value;

    // Validar que la fecha no esté vacía
    if (!fecha_solicitud) {
        Swal.fire('Error!', 'La fecha es obligatoria.', 'error');
        return;
    }

    // Convertir la fecha a formato YYYY-MM-DD
    const partesFecha = fecha_solicitud.split('/');
    if (partesFecha.length === 3) {
        // Formato recibido MM/DD/YYYY -> Convertir a YYYY-MM-DD
        const fechaConvertida = `${partesFecha[2]}-${partesFecha[0].padStart(2, '0')}-${partesFecha[1].padStart(2, '0')}`;

        // Validar que la fecha no sea anterior a la fecha actual
        const fechaActual = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        if (fechaConvertida < fechaActual) {
            Swal.fire('Error!', 'La fecha de solicitud no puede ser menor que la fecha actual.', 'error');
            return;
        }

        // Resto del código para agregar préstamo
        const programa_formacion = programaElemento.value;
        const observacion = descripcionElemento.value;
        const id_curso = cursoElemento.value;
        const id_usuario = usuarioElemento.value;

        const formData = new FormData();
        formData.append('fechaSolicitud', fechaConvertida); // Enviar la fecha convertida
        formData.append('programaFormacion', programa_formacion);
        formData.append('observacion', observacion);
        formData.append('idCurso', id_curso);
        formData.append('idUsuario', id_usuario);

        // Enviar el formulario al servidor
        fetch('../../api/services/prestamos_services.php?action=addPrestamo', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                Swal.fire('Éxito', 'Préstamo agregado correctamente.', 'success').then(() => {
                    document.getElementById('formAgregarMaterial').reset();
                    abrirModal(); // Mueve la apertura del modal aquí
                });
            } else {
                Swal.fire('Error!', data.message || 'Hubo un problema al agregar el préstamo.', 'error');
            }
        })
        .catch(error => {
            console.error('Error al agregar préstamo:', error);
            Swal.fire('Error!', 'Hubo un problema al agregar el préstamo.', 'error');
        });
    } else {
        Swal.fire('Error!', 'Formato de fecha inválido.', 'error');
    }
}

// Función para cargar espacios en el combobox
function cargarComboboxEspacios() {
    fetch('../../api/services/espacios_services.php?action=getAllEspacios')
        .then(response => response.json())
        .then(data => {
            if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                llenarCombobox('espacio', data.dataset, 'id_espacio', 'nombre_espacio');
            } else {
                console.error('No se encontraron espacios o los datos no están en el formato esperado');
            }
        })
        .catch(error => console.error('Error al obtener espacios:', error));
}

// Función para obtener el último ID de préstamo
async function obtenerUltimoIdPrestamo() {
    const response = await fetch('../../api/services/prestamos_services.php?action=getLastPrestamoId');
    const data = await response.json();
    if (data.status) {
        console.log('Último ID de préstamo:', data.lastId); // Cambiar aquí
        return data.lastId; // Devolver el ID correcto
    } else {
        console.error('Error al obtener el último ID de préstamo:', data.message);
        return null;
    }
}


async function agregarDetallesPrestamo() {
    const cantidadElemento = document.getElementById('cantidad');
    const unidadElemento = document.getElementById('unidad');
    const descripcionElemento = document.getElementById('descripcionDetalle');
    const espacioElemento = document.getElementById('espacio');
    const equipoElemento = document.getElementById('equipo');
    const materialElemento = document.getElementById('material');
    const codigoHerramientaElemento = document.getElementById('codigoHerramienta');

    // Validar que los campos necesarios no estén vacíos
    if (!cantidadElemento.value || !unidadElemento.value || !espacioElemento.value || !codigoHerramientaElemento.value) {
        Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    const id_prestamo = await obtenerUltimoIdPrestamo(); // Obtener el último ID de préstamo
    const formData = new FormData();
    formData.append('idPrestamo', id_prestamo);
    formData.append('cantidad', cantidadElemento.value);
    formData.append('unidad', unidadElemento.value);
    formData.append('descripcion', descripcionElemento.value);
    formData.append('idEspacio', espacioElemento.value);
    formData.append('idEquipo', equipoElemento.value);
    formData.append('idMaterial', materialElemento.value);
    formData.append('codigoHerramienta', codigoHerramientaElemento.value);

    fetch('../../api/services/prestamos_services.php?action=addDetallePrestamo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            Swal.fire('Éxito', 'Detalles del préstamo agregados correctamente.', 'success');
            // Cierra el modal después de agregar
            const modal = bootstrap.Modal.getInstance(document.getElementById('detallesModal'));
            modal.hide();
        } else {
            Swal.fire('Error!', data.message || 'Hubo un problema al agregar los detalles del préstamo.', 'error');
        }
    })
    .catch(error => {
        console.error('Error al agregar detalles del préstamo:', error);
        Swal.fire('Error!', 'Hubo un problema al agregar los detalles del préstamo.', 'error');
    });
}
