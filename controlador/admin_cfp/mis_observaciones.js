$(document).ready(function() {
    $('#submitObservacion').click(function() {
        // Recogemos los valores de los campos
        let fechaObservacion = $('#fechaObservacion').val();
        let observacion = $('#observacion').val();
        let tipoObservacion = $('#tiempObservacion').val();
        let tipoPrestamo = $('#tipoPrestamo').val();
        let espacioObservar = $('#espacioObservar').val();
        let cursoObservar = $('#cursoObservar').val();
        
        // Verificamos si se seleccionó un archivo de imagen
        let fotoObservacion = $('#inputFile')[0].files[0];

        // Creamos el objeto FormData para enviar los datos incluyendo el archivo de imagen si es necesario
        let formData = new FormData();
        formData.append('fechaObservacion', fechaObservacion);
        formData.append('observacion', observacion);
        formData.append('tipoObservacion', tipoObservacion);
        formData.append('tipoPrestamo', tipoPrestamo);
        formData.append('espacioObservar', espacioObservar);
        formData.append('cursoObservar', cursoObservar);

        // Si hay un archivo de imagen seleccionado, lo añadimos a formData
        if (fotoObservacion) {
            formData.append('fotoObservacion', fotoObservacion);
        }

        // Enviamos la solicitud AJAX
        $.ajax({
            url: '../../api/models/handler/mis_observacionesCFP_handler.php',
            type: 'POST',
            data: formData,
            contentType: false,  // Para enviar datos binarios (archivo)
            processData: false,  // Evitar que jQuery procese los datos
            success: function(response) {
                let res = JSON.parse(response);
                if (res.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: res.message,
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        // Limpia el formulario si se agregó correctamente
                        $('#fechaObservacion').val('');
                        $('#observacion').val('');
                        $('#tiempObservacion').val('');
                        $('#tipoPrestamo').val('');
                        $('#espacioObservar').val('');
                        $('#cursoObservar').val('');
                        $('#imagePreview').css('background-image', 'none');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.message,
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al agregar la observación.',
                    confirmButtonText: 'Aceptar'
                });
                console.error(error);
            }
        });
    });
});

// Previsualizar imagen seleccionada
function previewImage(event) {
    let reader = new FileReader();
    reader.onload = function() {
        let output = document.getElementById('imagePreview');
        output.style.backgroundImage = 'url(' + reader.result + ')';
        output.style.backgroundSize = 'cover';
        output.style.backgroundPosition = 'center';
    };
    reader.readAsDataURL(event.target.files[0]);
}
