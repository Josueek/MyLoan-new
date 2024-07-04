$(document).ready(function () {

    // Función para cargar todas las observaciones
    function cargarObservaciones(buscar = '') {
        $.ajax({
            url: '../../api/services/observacion_services.php',
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'getAllObservaciones',
                buscar: buscar
            },
            success: function (response) {
                if (response.status == 1) {
                    mostrarObservaciones(response.dataset);
                } else {
                    mostrarMensaje('No se encontraron observaciones.');
                }
            },
            error: function () {
                mostrarMensaje('Error al cargar las observaciones.');
            }
        });
    }

    // Función para mostrar las observaciones en una tabla
    function mostrarObservaciones(observaciones) {
        $('#tablaObservaciones tbody').empty();
        observaciones.forEach(function (observacion) {
            let fila = `<tr>
                            <td>${observacion.id_observacion}</td>
                            <td>${observacion.fecha_observacion}</td>
                            <td>${observacion.observacion}</td>
                            <td>${observacion.tipo_observacion}</td>
                            <td>${observacion.tipo_prestamo}</td>
                            <td>${observacion.id_espacio}</td>
                            <td>${observacion.id_usuario}</td>
                            <td>${observacion.id_prestamo}</td>
                            <td>
                                <button class="btn btn-info btn-sm btnEditar" data-id="${observacion.id_observacion}">Editar</button>
                                <button class="btn btn-danger btn-sm btnEliminar" data-id="${observacion.id_observacion}">Eliminar</button>
                            </td>
                        </tr>`;
            $('#tablaObservaciones tbody').append(fila);
        });
    }

    // Función para mostrar mensajes de alerta
    function mostrarMensaje(mensaje) {
        $('#alerta').text(mensaje).fadeIn();
        setTimeout(function () {
            $('#alerta').fadeOut();
        }, 3000);
    }

    // Cargar las observaciones al cargar la página
    cargarObservaciones();

    // Filtrar observaciones al escribir en el campo de búsqueda
    $('#buscarObservacion').on('keyup', function () {
        let buscar = $(this).val();
        cargarObservaciones(buscar);
    });

    // Mostrar modal para agregar observación
    $('#btnAgregarObservacion').click(function () {
        $('#modalTitulo').text('Agregar Observación');
        $('#formObservacion')[0].reset();
        $('#idObservacion').val('');
        $('#modalObservacion').modal('show');
    });

    // Mostrar modal para editar observación
    $('#tablaObservaciones').on('click', '.btnEditar', function () {
        let idObservacion = $(this).data('id');
        $('#modalTitulo').text('Editar Observación');
        $('#formObservacion')[0].reset();
        $.ajax({
            url: '../../api/services/observacion_services.php',
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'getObservacion',
                id: idObservacion
            },
            success: function (response) {
                if (response.status == 1) {
                    $('#idObservacion').val(response.dataset.id_observacion);
                    $('#fecha').val(response.dataset.fecha_observacion);
                    $('#observacion').val(response.dataset.observacion);
                    $('#tipoObservacion').val(response.dataset.tipo_observacion);
                    $('#tipoPrestamo').val(response.dataset.tipo_prestamo);
                    $('#idEspacio').val(response.dataset.id_espacio);
                    $('#idUsuario').val(response.dataset.id_usuario);
                    $('#idPrestamo').val(response.dataset.id_prestamo);
                    $('#modalObservacion').modal('show');
                } else {
                    mostrarMensaje('No se pudo cargar la observación.');
                }
            },
            error: function () {
                mostrarMensaje('Error al cargar la observación.');
            }
        });
    });

    // Guardar observación al enviar el formulario
    $('#formObservacion').submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: '../../api/services/observacion_services.php',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize() + '&action=' + ($('#idObservacion').val() ? 'updateObservacion' : 'addObservacion'),
            success: function (response) {
                if (response.status == 1) {
                    $('#modalObservacion').modal('hide');
                    mostrarMensaje(response.message);
                    cargarObservaciones();
                } else {
                    mostrarMensaje(response.message);
                }
            },
            error: function () {
                mostrarMensaje('Error al guardar la observación.');
            }
        });
    });

    // Eliminar observación al hacer clic en el botón eliminar
    $('#tablaObservaciones').on('click', '.btnEliminar', function () {
        if (confirm('¿Está seguro de eliminar esta observación?')) {
            let idObservacion = $(this).data('id');
            $.ajax({
                url: '../../api/services/observacion_services.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    action: 'deleteObservacion',
                    id: idObservacion
                },
                success: function (response) {
                    if (response.status == 1) {
                        mostrarMensaje(response.message);
                        cargarObservaciones();
                    } else {
                        mostrarMensaje(response.message);
                    }
                },
                error: function () {
                    mostrarMensaje('Error al eliminar la observación.');
                }
            });
        }
    });

});
