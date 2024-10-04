    // Añadir evento click al botón
    document.getElementById('btnSiguiente').addEventListener('click', function() {
        event.preventDefault();
        AgregarPrestamo();
        // Redirigir a la nueva página
    });


    function cargarComboboxCursos() {
        fetch(`../../api/services/cargar_curso_services.php?action=getAllCursos`)
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

    const fecha_solicitud = document.getElementById('fechaEntrega').value;
    const programa_formacion = document.getElementById('programaformacion').value;
    const observacion = document.getElementById('descripcion').value;
    const id_curso = document.getElementById('institucion').value;
    const id_usuario = document.getElementById('usuarioPrestamos').value;

    if(!fecha_solicitud || !programa_formacion || !observacion || !id_curso || !id_usuario){
        Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
        return;
    }

   const formData = new formData();
   FormData.append('fecha_solicitud', fecha_solicitud);
   FormData.append('programa_formacion', programa_formacion);
   FormData.append('observacion', observacion);
   FormData.append('id_curso', id_curso);
   FormData.append('id_usuario', id_usario);

  fetch('../../api/services/prestamos_services.php?action=addPrestamo',{
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  -then(data => {
    if(data.status){
        Swal.fire('Exito', 'Material agregado correctamente.', 'succes')
        document.getElementById('formAgregarMaterial').reset();
        document.getElementById('agregar')
    }
  })
  .catch(error => {
    console.error('Error al agregar herramienta:', error);
    Swal.fire('Error!', 'Hubo un problema al agregar la herramienta.', 'error');
  })

}