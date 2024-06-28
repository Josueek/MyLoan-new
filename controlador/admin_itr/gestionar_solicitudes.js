$(document).ready(function() {
    // Obtener y mostrar las solicitudes
    function obtenerSolicitudes() {
        $.ajax({
            url: '../models/handler/prestamo_handler.php',
            type: 'GET',
            data: { accion: 'getAll' },
            success: function(response) {
                let solicitudes = JSON.parse(response).dataset;
                let tablaSolicitudes = '';
                solicitudes.forEach(function(solicitud) {
                    tablaSolicitudes += `
                        <tr>
                            <td>${solicitud.id_prestamo}</td>
                            <td>${solicitud.fecha_solicitud}</td>
                            <td>${solicitud.programa_formacion}</td>
                            <td>${solicitud.estado_prestamo}</td>
                            <td>${solicitud.observacion}</td>
                            <td>${solicitud.id_curso}</td>
                            <td>${solicitud.id_usuario}</td>
                            <td>
                                <button class="btn btn-primary btnEditar" data-id="${solicitud.id_prestamo}">Editar</button>
                                <button class="btn btn-danger btnEliminar" data-id="${solicitud.id_prestamo}">Eliminar</button>
                            </td>
                        </tr>`;
                });
                $('#tablaSolicitudes').html(tablaSolicitudes);
            }
        });
    }
    obtenerSolicitudes();

    // Mostrar modal para agregar solicitud
    $('#btnAgregarSolicitud').click(function() {
        $('#formSolicitud')[0].reset();
        $('#modalSolicitudLabel').text('Agregar Solicitud');
        $('#btnGuardarSolicitud').text('Agregar');
        $('#modalSolicitud').modal('show');
    });

    // Guardar solicitud (agregar o editar)
    $('#formSolicitud').submit(function(e) {
        e.preventDefault();
        let accion = $('#btnGuardarSolicitud').text() === 'Agregar' ? 'add' : 'update';
        let solicitud = {
            id_prestamo: $('#inputId').val(),
            fecha_solicitud: $('#inputFechaSolicitud').val(),
            programa_formacion: $('#inputProgramaFormacion').val(),
            estado_prestamo: $('#inputEstadoPrestamo').val(),
            observacion: $('#inputObservacion').val(),
            id_curso: $('#inputIdCurso').val(),
            id_usuario: $('#inputIdUsuario').val(),
            accion: accion
        };

        $.ajax({
            url: '../models/handler/prestamo_handler.php',
            type: 'POST',
            data: solicitud,
            success: function(response) {
                Swal.fire('Éxito', response.message, 'success');
                $('#modalSolicitud').modal('hide');
                obtenerSolicitudes();
            },
            error: function(xhr, status, error) {
                Swal.fire('Error', xhr.responseText, 'error');
            }
        });
    });

    // Mostrar modal para editar solicitud
    $(document).on('click', '.btnEditar', function() {
        let id = $(this).data('id');
        $.ajax({
            url: '../models/handler/prestamo_handler.php',
            type: 'GET',
            data: { accion: 'getById', id: id },
            success: function(response) {
                let solicitud = JSON.parse(response).dataset;
                $('#inputId').val(solicitud.id_prestamo);
                $('#inputFechaSolicitud').val(solicitud.fecha_solicitud);
                $('#inputProgramaFormacion').val(solicitud.programa_formacion);
                $('#inputEstadoPrestamo').val(solicitud.estado_prestamo);
                $('#inputObservacion').val(solicitud.observacion);
                $('#inputIdCurso').val(solicitud.id_curso);
                $('#inputIdUsuario').val(solicitud.id_usuario);
                $('#modalSolicitudLabel').text('Editar Solicitud');
                $('#btnGuardarSolicitud').text('Actualizar');
                $('#modalSolicitud').modal('show');
            }
        });
    });

    // Eliminar solicitud
    $(document).on('click', '.btnEliminar', function() {
        let id = $(this).data('id');
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '../models/handler/prestamo_handler.php',
                    type: 'POST',
                    data: { accion: 'delete', id: id },
                    success: function(response) {
                        Swal.fire('Eliminado!', 'La solicitud ha sido eliminada.', 'success');
                        obtenerSolicitudes();
                    }
                });
            }
        });
    });
});
