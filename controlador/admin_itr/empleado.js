document.addEventListener('DOMContentLoaded', function () {
    cargarEmpleados();
    cargarEspecialidades();
    cargarCargos();

    document.getElementById('buscarEmpleado').addEventListener('input', buscarEmpleado);
    document.getElementById('filtroEspecialidad').addEventListener('change', buscarEmpleado);
    document.getElementById('formAgregarEspecialidad').addEventListener('submit', function (event) {
        event.preventDefault();
        agregarEspecialidad();
    });

    document.getElementById('formAgregarCargo').addEventListener('submit', function (event) {
        event.preventDefault();
        agregarCargo();
    });

    document.getElementById('formEditarEmpleado').addEventListener('submit', function (event) {
        event.preventDefault();
        actualizarEmpleado();
    });

    document.getElementById('formEditarEspecialidad').addEventListener('submit', function (event) {
        event.preventDefault();
        actualizarEspecialidad();
    });

    document.getElementById('formEditarCargo').addEventListener('submit', function (event) {
        event.preventDefault();
        actualizarCargo();
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
                <td>
                    <button type="button" class="btn btn-success" onclick="cargarEmpleado(${empleado.id_datos_empleado})" data-bs-toggle="modal" data-bs-target="#editarEmpleadoModal">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-warning" onclick="asignarEspecialidad(${empleado.id_datos_empleado})" data-bs-toggle="modal" data-bs-target="#asigEspecialidad">
                        <i class="fa-solid fa-award"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function cargarEspecialidades() {
        fetch('../../api/services/empleado_services.php?action=getAllEspecialidades')
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    mostrarEspecialidades(data.dataset);
                } else {
                    console.error('Error al obtener especialidades:', data.message);
                }
            })
            .catch(error => console.error('Error al obtener especialidades:', error));
    }

    function mostrarEspecialidades(especialidades) {
        const tbody = document.getElementById('tablaEspecialidades');
        tbody.innerHTML = '';
        especialidades.forEach(especialidad => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${especialidad.id_especialidad}</td>
                <td>${especialidad.nombre_especialidad}</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="cargarEspecialidad(${especialidad.id_especialidad})" data-bs-toggle="modal" data-bs-target="#editarEspecialidadModal">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="eliminarEspecialidad(${especialidad.id_especialidad})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function cargarCargos() {
        fetch('../../api/services/empleado_services.php?action=getAllCargos')
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    mostrarCargos(data.dataset);
                } else {
                    console.error('Error al obtener cargos:', data.message);
                }
            })
            .catch(error => console.error('Error al obtener cargos:', error));
    }

    function mostrarCargos(cargos) {
        const tbody = document.getElementById('tablaCargos');
        tbody.innerHTML = '';
        cargos.forEach(cargo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cargo.id_cargo}</td>
                <td>${cargo.nombre_cargo}</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="cargarCargo(${cargo.id_cargo})" data-bs-toggle="modal" data-bs-target="#editarCargoModal">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="eliminarCargo(${cargo.id_cargo})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function agregarEspecialidad() {
        const nombre = document.getElementById('nombreEspecialidad').value;

        fetch('../../api/services/empleado_services.php?action=createEspecialidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Especialidad agregada correctamente.', 'success');
                    cargarEspecialidades();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al agregar especialidad:', error));
    }

    function cargarEspecialidad(id) {
        fetch(`../../api/services/empleado_services.php?action=getEspecialidad&id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    document.getElementById('idEditarEspecialidad').value = data.dataset.id_especialidad;
                    document.getElementById('nombreEditarEspecialidad').value = data.dataset.nombre_especialidad;
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al obtener especialidad:', error));
    }

    function actualizarEspecialidad() {
        const id = document.getElementById('idEditarEspecialidad').value;
        const nombre = document.getElementById('nombreEditarEspecialidad').value;

        fetch('../../api/services/empleado_services.php?action=updateEspecialidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nombre })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Especialidad actualizada correctamente.', 'success');
                    cargarEspecialidades();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al actualizar especialidad:', error));
    }

    function eliminarEspecialidad(id) {
        fetch('../../api/services/empleado_services.php?action=deleteEspecialidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Especialidad eliminada correctamente.', 'success');
                    cargarEspecialidades();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al eliminar especialidad:', error));
    }

    function agregarCargo() {
        const nombre = document.getElementById('nombreCargo').value;

        fetch('../../api/services/empleado_services.php?action=createCargo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Cargo agregado correctamente.', 'success');
                    cargarCargos();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al agregar cargo:', error));
    }

    function cargarCargo(id) {
        fetch(`../../api/services/empleado_services.php?action=getCargo&id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    document.getElementById('idEditarCargo').value = data.dataset.id_cargo;
                    document.getElementById('nombreEditarCargo').value = data.dataset.nombre_cargo;
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al obtener cargo:', error));
    }

    function actualizarCargo() {
        const id = document.getElementById('idEditarCargo').value;
        const nombre = document.getElementById('nombreEditarCargo').value;

        fetch('../../api/services/empleado_services.php?action=updateCargo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nombre })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Cargo actualizado correctamente.', 'success');
                    cargarCargos();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al actualizar cargo:', error));
    }

    function eliminarCargo(id) {
        fetch('../../api/services/empleado_services.php?action=deleteCargo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Cargo eliminado correctamente.', 'success');
                    cargarCargos();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al eliminar cargo:', error));
    }

    function cargarEmpleado(id) {
        fetch(`../../api/services/empleado_services.php?action=getEmpleado&id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    document.getElementById('editarEmpleadoId').value = data.dataset.id_datos_empleado;
                    document.getElementById('editarNombreEmpleado').value = data.dataset.nombre_empleado;
                    document.getElementById('editarApellidoEmpleado').value = data.dataset.apellido_empleado;
                    document.getElementById('editarTelefonoEmpleado').value = data.dataset.telefono;
                    document.getElementById('editarEstadoEmpleado').value = data.dataset.estado_empleado;
                    document.getElementById('editarCorreoEmpleado').value = data.dataset.correo_electronico;
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al obtener empleado:', error));
    }

    function actualizarEmpleado() {
        const id = document.getElementById('editarEmpleadoId').value;
        const nombre = document.getElementById('editarNombreEmpleado').value;
        const apellido = document.getElementById('editarApellidoEmpleado').value;
        const telefono = document.getElementById('editarTelefonoEmpleado').value;
        const estado = document.getElementById('editarEstadoEmpleado').value;
        const correo = document.getElementById('editarCorreoEmpleado').value;

        fetch('../../api/services/empleado_services.php?action=updateEmpleado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nombre, apellido, telefono, estado, correo })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Empleado actualizado correctamente.', 'success');
                    cargarEmpleados();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al actualizar empleado:', error));
    }

    function eliminarEmpleado(id) {
        fetch('../../api/services/empleado_services.php?action=deleteEmpleado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire('Éxito!', 'Empleado eliminado correctamente.', 'success');
                    cargarEmpleados();
                } else {
                    Swal.fire('Error!', data.message, 'error');
                }
            })
            .catch(error => console.error('Error al eliminar empleado:', error));
    }

    function buscarEmpleado() {
        const searchValue = document.getElementById('buscarEmpleado').value;
        const filtroEspecialidad = document.getElementById('filtroEspecialidad').value;

        fetch(`../../api/services/empleado_services.php?action=searchEmpleados&search=${searchValue}&especialidad=${filtroEspecialidad}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    mostrarEmpleados(data.dataset);
                } else {
                    console.error('Error al buscar empleados:', data.message);
                }
            })
            .catch(error => console.error('Error al buscar empleados:', error));
    }

    window.cargarEmpleado = cargarEmpleado;
    window.cargarEspecialidad = cargarEspecialidad;
    window.cargarCargo = cargarCargo;
    window.eliminarEmpleado = eliminarEmpleado;
    window.eliminarEspecialidad = eliminarEspecialidad;
    window.eliminarCargo = eliminarCargo;
    window.asignarEspecialidad = asignarEspecialidad;
});
