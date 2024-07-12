// Modal para agregar especialidades
document.addEventListener('DOMContentLoaded', function () {
    const btnCancelar = document.getElementById('btnCancelar');

    btnCancelar.addEventListener('click', function () {
        window.location.href = '../../vistas/vistas_admin/crear_solicitud_prestamo.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `

        <!-- Modal para crear una especialidad -->
        <!-- Modal para las especialidades -->
        <div class="modal fade" id="CrearEspecialidad" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Agregar especialidad</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <!-- Texto arriba del input -->
                                <label for="especialidad" class="mb-1">Nombre de la especialidad:</label>
                                <!-- Input -->
                                <input type="text" id="especialidad" class="form-control"
                                    placeholder="Escribe una especialidad" required>
                            </div>
                            <div class="col-lg-6 mt-4">
                                <!-- Botón Arriba -->
                                <button type="button" class="btn btn-warning btnestilo mx-lg-6">Agregar
                                    especialidad
                                </button>

                            </div>
                        </div>

                        <div class="table-responsive mt-5">
                            <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Número</th>
                                <td scope="col">Nombre de la especialidad</td>
                                <dt scope="col"></td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Software</td>
                            <td>
                                <button type="button" class="btn btn-danger mt-2">
                                 <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                        </div>

                    </div>
                    <div class="modal-footer">

                    </div>
                </div>
            </div>
        </div>


        `;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnAgregarespecialidad').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('CrearEspecialidad'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#CrearEspecialidad').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });
});




// Modal para agregar especialidades
document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
<!-- Modal para asignar la especialidad a un empleado -->
<div class="modal fade" id="asigEspecialidad" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="exampleModalLabel">Asignar especialidad</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                        <!-- Texto arriba del input -->
                       
                        <label for="instructor" class="mb-1">Instructor a asignar:</label>
                        <input class="form-control" list="datalistOptions" id="exampleDataList"
                            placeholder="Buscar instructor">
                        <datalist id="datalistOptions">
                            <option value="will">
                            <option value="Carranza">
                        </datalist>
                    </div>
                    <div class="col-lg-6">
                        <!-- Texto arriba del input -->
                        <label for="especialidad" class="mb-1">Especialidad:</label>
                        <!-- Input -->
                        <input class="form-control" list="datalistOptions" id="exampleDataList"
                        placeholder="Buscar una especialidad">
                    <datalist id="datalistOptions">
                        <option value="Software">
                        <option value="Enca">
                    </datalist>
                    </div>
                    <div class="col-lg-6 mt-4"> <!-- Botón abajo -->
                        <!-- Botón Abajo -->
                        <button type="button" class="btn btn-warning mx-lg-6">Asignar especialidad</button>
                    </div>
                </div>

                <div class="table-responsive mt-5">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre del empleado</th>
                                <th scope="col">Especialidad asignada</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Will</td>
                                <td>Desarrollo de software</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-danger">
                                        <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Carranza</td>
                                <td>Desarrollo de software</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-danger">
                                        <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                                    </button>
                                </td>
                            </tr>
                            <!-- Puedes agregar más filas según sea necesario -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

`;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnAsignarEspecialidad').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('asigEspecialidad'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#asigEspecialidad').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
            <div class="modal fade" id="espaciosModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Espacios registrados correspondientes a la institución</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <!-- Buscador -->
                                <div class="col-lg-4 mb-3">
                                    <input class="form-control" type="text" placeholder="Buscar esp-acio">
                                </div>
                                <!-- Botón Seleccionar -->
                                <div class="col-lg-4 mb-8">
                                    <button type="button" class="btn btn-warning">Seleccionar espacio</button>
                                </div>
                                <!-- Botón de acción -->
                                <div class="col-lg-4 mb-8">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                            <!-- Tabla -->
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Número de laboratorio</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Encargo</th>
                                            <th scope="col">Capacidad de personas</th>
                                            <th scope="col">Tipo de espacio</th>
                                            <th scope="col">Especialidad</th>
                                            <th scope="col">Inventario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Laboratorio 1</td>
                                            <td>Encargado 1</td>
                                            <td>30</td>
                                            <td>Laboratorio</td>
                                            <td>Software</td>
                                            <td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-download"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Laboratorio 2</td>
                                            <td>Encargado 2</td>
                                            <td>25</td>
                                            <td>Sala de conferencias</td>
                                            <td>Hardware</td>
                                            <td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-download"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Laboratorio 2</td>
                                            <td>Encargado 2</td>
                                            <td>25</td>
                                            <td>Sala de conferencias</td>
                                            <td>Hardware</td>
                                            <td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-download"></i></button></td>
                                        </tr>
                                        <!-- Puedes agregar más filas según sea necesario -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnBuscarEspacio').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('espaciosModal'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#buscarEspacio').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });
});

// modal ver detalle

document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML =
            `<style>
    /* Estilo para la imagen dentro del contenedor */
    .circle img {
        width: auto; /* Establecer el ancho al 100% */
        height: auto; /* Altura automática para mantener la proporción */
        max-width: 300px; /* Ancho máximo de la imagen */
        max-height: 300px; /* Altura máxima de la imagen */
    }
</style>

<div class="modal fade" id="verObservaciones" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Detalles de la observación realizadas</h5>
            </div>
            <div class="modal-body">
                <!-- Contenedor de la fila -->
                <div class="row">
                    <!-- Columna para los campos de observaciones generales -->
                    <div class="col-lg-6 mb-3">
                        <div class="row">
                            <!-- Campo de entrada 1 -->
                            <div class="col-lg-6 mb-3">
                                <label for="fechaObservacion" class="mb-1">Fecha observación</label>
                                <input type="text" id="fechaObservacion" class="form-control" placeholder="" required>
                            </div>
                            <!-- Campo de entrada 2 -->
                            <div class="col-lg-6 mb-3">
                                <label for="TipoObservacion" class="mb-1">Tipo Observación</label>
                                <input type="text" id="tipoObservacion" class="form-control" placeholder="" required>
                            </div>

                            <!-- Campo de entrada 3 -->

                            <div class="col-lg-6 mb-3">
                            <label for="personaSolicitante" class="mb-1">Persona solicitante</label>
                            <input type="text" id="personaSolicitante" class="form-control" placeholder="" required>
                        </div>

                        <div class="col-lg-6 mb-3">
                                <label for="tipoDePrestamo" class="mb-1">Tipo de préstamo</label>
                                <input type="text" id="tipoPrestamo" class="form-control" placeholder="" required>
                            </div>

                            <div class="col-lg-6 mb-3">
                                <label for="observacion" class="mb-1">Observación</label>
                                <input type="text" id="observacion" class="form-control" placeholder="" required style="height: 100px;">
                            </div>
                            
                            <!-- Campo de entrada 4 -->
                            
                            <!-- Campo de entrada 5 -->
                            
                        </div>
                    </div>
                    <!-- Columna para la imagen -->
                    <div class="col-lg-2 mb-3">
                        <div class="p-4">
                            <div class="circle text-center" id="circleContainer">
                                <label for="inputFile" class="form-label">
                                    <img src="../../recursos/img/img_generales/fotodeperfilpredeterminada.jpg" alt="">
                                </label>
                                <div id="imagePreview" class="circle-preview"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


`
            ;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnVerDetalle').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('VerDetalle'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#verObservaciones').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
        <!-- Modal para listar los materiales disponibles -->
        <div class="modal fade" id="modal-material" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Listado de materiales disponibles</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive mt-5">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody id="tabla-materiales">
                                    <!-- Filas dinámicas -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Agregar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    // Llamar a la función para crear el modal
    createModal();

    // Función para cargar datos en la tabla
    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/material_services.php?action=getAllMateriales&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener materiales:', error));
    }

    // Función para mostrar datos en la tabla
    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tabla-materiales');
        tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla

        if (data.status === 1 && data.dataset) {
            data.dataset.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.descripcion}</td>
                `;
                // Añadir el evento de clic a cada fila
                row.addEventListener('click', function () {
                    const nombre = item.nombre;
                    const descripcion = item.descripcion;
                    agregarArticulo(nombre, descripcion);
                });
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3">No se encontraron registros</td>';
            tbody.appendChild(row);
        }
    }

    // Asegúrate de que los elementos existen antes de agregar los event listeners
    const btnAgregarMaterial = document.getElementById('btnagregarmaterial');
    const searchInput = document.getElementById('search-input');

    if (btnAgregarMaterial) {
        btnAgregarMaterial.addEventListener('click', function () {
            const myModal = new bootstrap.Modal(document.getElementById('modal-material'));
            myModal.show();

            // Cargar los datos al abrir el modal
            cargarDatosTabla();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function (event) {
            const buscar = event.target.value;
            cargarDatosTabla(buscar);
        });
    }

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#modal-material').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });

    // Función para agregar artículo a la tabla de "detalleArticulos"
    function agregarArticulo(nombre, descripcion) {
        const tablaArticulos = document.getElementById('detalleArticulos');
        if (tablaArticulos) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td></td>
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
            `;
            // Añadir el evento de clic para eliminar la fila
            row.querySelector('.btn-danger').addEventListener('click', function () {
                row.remove();
            });
            tablaArticulos.appendChild(row);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
        <!-- Modal para listar los equipos disponibles -->
        <div class="modal fade" id="modal-equipo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Listado de equipos disponibles</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive mt-5">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Espacio asignado</th>
                                    </tr>
                                </thead>
                                <tbody id="tabla-equipos">
                                    <!-- Filas dinámicas -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Agregar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Función para cargar datos en la tabla
    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/equipo_services.php?action=getAllEquipos&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener equipos:', error));
    }

    // Función para mostrar datos en la tabla
    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tabla-equipos');
        tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla

        if (data.status === 1 && data.dataset) {
            data.dataset.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.nombre_espacio}</td>
                `;
                // Añadir el evento de clic a cada fila
                row.addEventListener('click', function () {
                    const nombre = item.nombre;
                    const descripcion = item.descripcion;
                    agregarArticulo(nombre, descripcion);
                });
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4">No se encontraron registros</td>';
            tbody.appendChild(row);
        }
    }

    // Verificar que los elementos existen antes de agregar los event listeners
    function addEventListeners() {
        const btnAgregarEquipo = document.getElementById('btnagregarequipo');
        const searchInput = document.getElementById('search-input');
        const modalEquipo = document.getElementById('modal-equipo');

        if (btnAgregarEquipo) {
            btnAgregarEquipo.addEventListener('click', function () {
                const myModal = new bootstrap.Modal(modalEquipo);
                myModal.show();
                // Cargar los datos al abrir el modal
                cargarDatosTabla();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', function (event) {
                const buscar = event.target.value;
                cargarDatosTabla(buscar);
            });
        }

        if (modalEquipo) {
            modalEquipo.addEventListener('hidden.bs.modal', function (e) {
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => backdrop.remove());
            });
        }
    }

    // Llamar a la función para agregar los event listeners
    addEventListeners();

    // Función para agregar artículo a la tabla de "detalleArticulos"
    function agregarArticulo(nombre, descripcion) {
        const tablaArticulos = document.getElementById('detalleArticulos');
        if (tablaArticulos) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td></td>
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
            `;
            // Añadir el evento de clic para eliminar la fila
            row.querySelector('.btn-danger').addEventListener('click', function () {
                row.remove();
            });
            tablaArticulos.appendChild(row);
        }
    }
});



// modalHandler.js

// modalHandler.js

document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
        <!-- Modal para asignar la especialidad a un empleado -->
        <div class="modal fade" id="modal-herramienta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Listado de herramientas disponibles</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive mt-5">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Código de herramienta</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">En uso</th>
                                        <th scope="col">Institución correspondiente</th>
                                    </tr>
                                </thead>
                                <tbody id="tabla-herramientas"></tbody>
                            </table>
                        </div>
                        <!-- Campo oculto para el código de la herramienta -->
                        <input type="hidden" id="codigo_herramienta">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="agregarHerramienta" data-bs-dismiss="modal">Agregar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.appendChild(modalContainer);
    }

    // Función para cargar datos en la tabla
    function cargarDatosTabla(buscar = '', filtrar = '') {
        fetch(`../../api/services/inventario_herramienta_services.php?action=getAllHerramientas&buscar=${buscar}&filtrar=${filtrar}`)
            .then(response => response.json())
            .then(data => mostrarDatosTabla(data))
            .catch(error => console.error('Error al obtener herramientas:', error));
    }

    // Función para mostrar datos en la tabla
    function mostrarDatosTabla(data) {
        const tbody = document.getElementById('tabla-herramientas');
        tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla

        if (data.status === 1 && data.dataset) {
            data.dataset.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.codigo_herramienta}</td>
                    <td>${item.nombre_herramienta}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.stock}</td>
                    <td>${item.en_uso}</td>
                    <td>${item.nombre_institucion}</td>
                `;
                // Añadir el evento de clic a cada fila
                row.addEventListener('click', function () {
                    const nombreElement = item.nombre_herramienta;
                    const descripcionElement = item.descripcion;
                    
                    agregarArticulo(nombreElement, descripcionElement);
                });
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6">No se encontraron registros</td>';
            tbody.appendChild(row);
        }
    }

    createModal();

    const modalElement = document.getElementById('modal-herramienta');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);

        // Cargar los datos al abrir el modal
        modalElement.addEventListener('show.bs.modal', function () {
            cargarDatosTabla();
        });

        // Evento de búsqueda
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function (event) {
                const buscar = event.target.value;
                cargarDatosTabla(buscar);
            });
        }

        // Abre el modal cuando se haga clic en el botón (asegúrate de que el botón exista en tu HTML)
        const btnAgregarHerramienta = document.getElementById('btnagregarherramienta');
        if (btnAgregarHerramienta) {
            btnAgregarHerramienta.addEventListener('click', function () {
                modal.show();
            });
        }

        // Evento para agregar herramienta al presionar el botón "Agregar" del modal
        const agregarHerramientaBtn = document.getElementById('agregarHerramienta');
        if (agregarHerramientaBtn) {
            agregarHerramientaBtn.addEventListener('click', function () {
                const cantidad = document.getElementById('stock').value;
                const descripcion = document.getElementById('descripcion').value;
                const codigoHerramienta = document.getElementById('codigo_herramienta').value; // Código oculto

                if (cantidad && descripcion && codigoHerramienta) {
                    const articulo = {
                        cantidad,
                        unidad: 'unidad', // Ajusta según sea necesario
                        descripcion,
                        articulo: codigoHerramienta // Usamos el código de herramienta
                    };
                    agregarArticulo(articulo);
                }
            });
        }
    }

    // Función para agregar artículo a la tabla de "crear_solicitud_prestamousar"
    function agregarArticulo(nombre, descripcion) {
        const tablaArticulos = document.getElementById('detalleArticulos');
        if (tablaArticulos) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td></td>
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
            `;
            // Añadir el evento de clic para eliminar la fila
            row.querySelector('.btn-danger').addEventListener('click', function () {
                row.remove();
            });
            tablaArticulos.appendChild(row);
        }
    }
});






document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
        <!-- Modal para asignar la especialidad a un empleado -->
        <div class="modal fade" id="modal-detalle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Detalle sobre el periodo del prestamo</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                     <div class="modal-body">
                         <div class="row">
                         <div class="col-lg-3">
                         <div class="form-group">
                            <label for="fechaEntrega">Fecha de solicitud</label>
                            <!-- Eliminación del icono de calendario -->
                            <input type="text" class="form-control" id="fechaEntrega" placeholder="Elegir fecha">
                         </div>
                 </div>
                 <div class="col-lg-3 mb-2">
                 <!-- Contenido de la columna 1 -->
                 <label for="codigo" class="mb-1">Nombre del encargado de recibir un prestamo</label>
                 <input type="text" id="codigo" class="form-control input-short" placeholder="Ingresa el nombre"
                     required>
             </div>
                           </div>
                    </div>
                    <div class="modal-footer">

                    <div class="col-lg-3 mb-1">
                    <button id="btnCancelar" type="button" class="btn btn-primary mx-lg-3" data-bs-dismiss="modal">Cancelar</button>
                </div>
                <div class="col-lg-3 mb-1">
                <button id="btnAgregar" type="button" class="btn btn-primary mx-lg-3">Agregar</button>
            </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Inicializa el datepicker cuando el modal se muestra
    $('#modal-detalle').on('shown.bs.modal', function () {
        $('#fechaEntrega').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true
        });
    });

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnAgregar').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('modal-detalle'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#modal-detalle').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });
});



// modal de gestonar solicitudes
document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML =
            `
<div class="modal fade" id="VerSolicitud" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="exampleModalLabel">Detalles del préstamo</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Unidad</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Número de préstamo</th>
                            <th scope="col">Espacio</th>
                            <th scope="col">Equipo</th>
                            <th scope="col">Material</th>
                            <th scope="col">Herramienta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Taladro</td>
                            <td>Taladro recargable con duración de 2hrs</td>
                            <td>1</td>
                            <td>Laboratorio emca</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>Si</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <div class="col-lg-3 mb-1">
                    <button id="enegarSolicitud" type="button" class="btn btn-danger mx-lg-3">Denegar</button>
                </div>
                <div class="col-lg-3 mb-1">
                <button id="btnAceptarSolicitud" type="button" class="btn btn-info mx-lg-3" data-bs-toggle="modal" data-bs-target="#aceptarSolicitud">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

`;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnVerSolicitud').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('VerSolicitud'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#verSolicitud').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
        <!-- Modal para asignar la especialidad a un empleado -->
        <div class="modal fade" id="aceptarSolicitud" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Detalle sobre el periodo del prestamo</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                     <div class="modal-body">
                         <div class="row">
                         <div class="col-lg-6 mb-3">
                         <div class="form-group">
                             <label for="fechaEntrega">Fecha de inicio del prestamo</label>
                             <!-- Eliminación del icono de calendario -->
                             <input type="text" class="form-control" id="fechaEntrega" placeholder="Elegir fecha"
                                 readonly>
                         </div>
                 </div>
                 <div class="col-lg-6 mb-3">
                 <!-- Contenido de la columna 1 -->
                 <label for="codigo" class="mb-1">Nombre del encargado de recibir un prestamo</label>
                 <input type="text" id="codigo" class="form-control input-short" placeholder="Ingresa el nombre"
                     required>
             </div>
                           </div>
                    </div>
                    <div class="modal-footer">
                    <div class="row">
                    <div class="col-lg-6 mb-3">
                    <button id="btnCancelar" type="button" class="btn btn-primary mx-lg-3">Cancelar</button>
                </div>
                <div class="col-lg-6 mb-3">
                <button id="btnAceptar" type="button" class="btn btn-warning mx-lg-3">Enviar</button>
            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        `;
        document.body.appendChild(modalContainer);
    }

    createModal(); // Llama a la función para crear el modal

    // Abre el modal cuando se haga clic en el botón
    document.getElementById('btnAceptarSolicitud').addEventListener('click', function () {
        const myModal = new bootstrap.Modal(document.getElementById('aceptarSolicitud'));
        myModal.show();
    });

    // Elimina el fondo oscuro cuando se cierra el modal
    $('#aceptarSolicitud').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove();
    });

});

