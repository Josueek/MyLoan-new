    // Añadir evento click al botón
    document.getElementById('btnSiguiente').addEventListener('click', function() {
        // Redirigir a la nueva página
        window.location.href = '../../vistas/vistas_admin/crear_solicitud_prestamousar.html';
    });


    function cargarComboboxCursos() {
        fetch(`../../api/services/prestamo_services.php?action=getAllCursos`)
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos:", data); // Verifica si los datos llegan correctamente
                if (data.status === 1 && Array.isArray(data.dataset) && data.dataset.length > 0) {
                    console.log("Cargando cursos en el combobox..."); // Mensaje de depuración
                    llenarCombobox('institucion', data.dataset, 'id_curso', 'nombre_curso');
                } else {
                    console.error('No se encontraron cursos o los datos no están en el formato esperado');
                }
            })
            .catch(error => console.error('Error al obtener cursos:', error));
    }
    
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
    
    document.addEventListener('DOMContentLoaded', function () {
        cargarComboboxCursos();
    });

document.addEventListener('DOMContentLoaded', function () {
    // Guardar los datos del préstamo en localStorage al hacer clic en "Siguiente"
    document.getElementById('btnAgregarequipo').addEventListener('click', function () {
        // Obtener los datos del préstamo
        const fechaSolicitud = document.getElementById('fechaEntrega').value;
        const programaFormacion = document.getElementById('programaformacion').value;
        const usuarioSolicitante = document.getElementById('usuarioPrestamos').value;
        const curso = document.getElementById('institucion').value;
        const observacion = document.getElementById('descripcion').value;

        // Validar que todos los campos estén llenos
        if (!fechaSolicitud || programaFormacion === "0" || !usuarioSolicitante || curso === "0" || !observacion) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos antes de continuar.',
            });
            return;
        }

        // Crear un objeto de préstamo
        const prestamo = {
            fechaSolicitud,
            programaFormacion,
            usuarioSolicitante,
            curso,
            observacion,
            articulos: [] // Inicialmente vacío, se llenará en la segunda página
        };

        // Guardar el préstamo en localStorage
        localStorage.setItem('prestamo', JSON.stringify(prestamo));

        // Redirigir a la segunda página
        window.location.href = 'crear_solicitud_prestamousar.html';
    });

    // Inicializar datepicker
    $('#fechaEntrega').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    // Cargar empleados
    cargarEmpleados();
});

function cargarEmpleados() {
    fetch('../../api/services/empleado_services.php?action=getEmpleados')
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                mostrarEmpleados(data.dataset);
            } else {
                console.error('Error al obtener empleados:', data.message);
            }
        })
        .catch(error => console.error('Error al obtener empleados:', error));
}

function mostrarEmpleados(empleados) {
    const tbody = document.getElementById('tablaEmpleados');
    tbody.innerHTML = '';
    if (empleados.length > 0) {
        empleados.forEach(empleado => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${empleado.nombre_empleado}</td>
                <td>${empleado.apellido_empleado}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.estado_empleado}</td>
                <td>${empleado.correo_electronico}</td>
                <td>${empleado.cargo}</td>
                <td>${empleado.especialidad}</td>
            `;
            tr.addEventListener('click', () => {
                seleccionarUsuario(empleado.nombre_empleado);
            });
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="7" class="text-center">No se encontraron registros</td>`;
        tbody.appendChild(tr);
    }
}

function seleccionarUsuario(nombre) {
    const usuarioPrestamos = document.getElementById('usuarioPrestamos');
    usuarioPrestamos.value = nombre;
}

function AgregarPrestamo(){
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const programaformacion = document.getElementById('programaformacion').value;
    const usuarioPrestamos = document.getElementById('usuarioPrestamos').value;
    const institucion = document.getElementById('institucion').value;
    const descripcion = document.getElementById('descripcion').value;

  //Validaciones
  if(!fechaEntrega || !programaformacion || !usuarioPrestamos || !institucion || !descripcion){
    Swal.fire('Error!', 'Todos los campos son obligatorios', 'Error');
    return;
  }

  const formData = new FormData();
  formData.append('fechaEntrega', fechaEntrega);
  formData.append('programaformacion', programaformacion);
  formData.append('usuarioPrestamos', usuarioPrestamos);
  formData.append('institucion', institucion);
  formData.append('descripcion', descripcion);
  
  fetch('')
  
}