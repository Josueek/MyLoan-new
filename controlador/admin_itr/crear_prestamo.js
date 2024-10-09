document.addEventListener('DOMContentLoaded', function () {
    // Cargar cursos y empleados al iniciar
    cargarComboboxCursos();
    cargarComboboxEmpleados();

    // Evento para el botón de agregar préstamo
    document.getElementById('btnSiguiente').addEventListener('click', function(event) {
        event.preventDefault();
        AgregarPrestamo();
    });
});

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

// Reutilizable: Llenar el combobox con los datos recibidos
function llenarCombobox(elementId, data, valueField, textField, addTodos = false) {
    const select = document.getElementById(elementId);
    if (!select) {
        console.error(`El elemento con ID '${elementId}' no fue encontrado.`);
        return;
    }
    select.innerHTML = addTodos ? '<option value="">Todos</option>' : '<option selected>Seleccionar</option>';

    // Recorrer los datos y llenar el select
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueField];
        option.textContent = item[textField];
        select.appendChild(option);
    });
}

function AgregarPrestamo() {
    const fecha_solicitud = document.getElementById('fechaEntrega').value; // Obtén el valor de la fecha
    const programa_formacion = document.getElementById('programaformacion').value;
    const observacion = document.getElementById('descripcion').value;
    const id_curso = document.getElementById('institucion').value;
    const id_usuario = document.getElementById('empleado').value;

    // Validación
    if (!fecha_solicitud || programa_formacion === "0" || !observacion || id_curso === "0" || id_usuario === "0") {
        Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    // Convertir fecha de DD/MM/YYYY a YYYY-MM-DD
    const partesFecha = fecha_solicitud.split('/'); // Divide la fecha en partes
    const fechaConvertida = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`; // Formato YYYY-MM-DD

    // Validación de la fecha
    const fechaActual = new Date();
    const fechaActualString = fechaActual.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Comprobación de la fecha de solicitud
    if (fechaConvertida < fechaActualString) {
        Swal.fire('Error!', 'La fecha de solicitud no puede ser menor que la fecha actual.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('fechaSolicitud', fechaConvertida); // Usar la fecha convertida
    formData.append('programaFormacion', programa_formacion);
    formData.append('observacion', observacion);
    formData.append('idCurso', id_curso);
    formData.append('idUsuario', id_usuario);


    fetch('../../api/services/prestamos_services.php?action=addPrestamo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            // Muestra el alert de éxito
            Swal.fire('Éxito', 'Préstamo agregado correctamente.', 'success').then(() => {
                // Restablecer el formulario después de que el usuario haga clic en "OK"
                document.getElementById('formAgregarMaterial').reset();
                
                // Guardar el último ID de préstamo en sessionStorage
                sessionStorage.setItem('ultimo_prestamo_id', data.lastPrestamoId);
    
                // Redirigir a otra pantalla
                window.location.href = 'crear_solicitud_prestamousar.html'; // Cambia esto a la URL deseada
            });
        }
     else {
            Swal.fire('Error!', data.message || 'Hubo un problema al agregar el préstamo.', 'error');
        }
    })
    .catch(error => {
        console.error('Error al agregar préstamo:', error);
        Swal.fire('Error!', 'Hubo un problema al agregar el préstamo.', 'error');
    });
}





// Función para obtener el último id de préstamo y guardarlo en sessionStorage
function obtenerUltimoIdPrestamo() {
    fetch('../../api/services/prestamos_services.php?action=getLastPrestamoId')
        .then(response => response.json())
        .then(data => {
            if (data.status === 1 && data.dataset && data.dataset.id_prestamo) {
                const ultimoId = data.dataset.id_prestamo;
                sessionStorage.setItem('ultimo_prestamo_id', ultimoId);
                console.log('Último id de préstamo guardado en sessionStorage:', ultimoId);
            } else {
                console.error('Error al obtener el último id de préstamo:', data.message);
            }
        })
        .catch(error => console.error('Error al obtener el último id de préstamo:', error));
}
