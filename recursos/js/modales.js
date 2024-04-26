// Modal para agregar especialidades
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
                                    <input class="form-control" type="text" placeholder="Buscar espacio">
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

document.addEventListener('DOMContentLoaded', function () {
    // Función para crear el modal
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML =
`<div class="modal fade" id="verObservaciones" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <label for="fechaObservacion1" class="mb-1">Fecha observación</label>
                            <input type="email" id="fechaObservacion1" class="form-control" placeholder="" required>
                        </div>
                        <!-- Campo de entrada 2 -->
                        <div class="col-lg-6 mb-3">
                            <label for="TipoObservacion" class="mb-1">Tipo Observación</label>
                            <input type="email" id="fechaObservacion2" class="form-control" placeholder="" required>
                        </div>
                        <!-- Campo de entrada 3 -->
                        <div class="col-lg-6 mb-3">
                            <label for="observacion" class="mb-1">Observación</label>
                            <input type="email" id="correo4" class="form-control" placeholder="" required style="height: 100px;">
                        </div>
                        <!-- Campo de entrada 4 -->
                        <div class="col-lg-6 mb-3">
                            <label for="tipoDePrestamo" class="mb-1">Tipo de préstamo a observar</label>
                            <input type="email" id="correo5" class="form-control" placeholder="" required>
                        </div>
                        <!-- Campo de entrada 5 -->
                        <div class="col-lg-6 mb-3">
                            <label for="personaSolicitante" class="mb-1">Persona solicitante</label>
                            <input type="email" id="correo6" class="form-control" placeholder="" required>
                        </div>
                    </div>
                </div>
                <!-- Columna para la imagen -->
                <div class="col-lg-6 mb-3">
                    <div class="p-8">
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

`;
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