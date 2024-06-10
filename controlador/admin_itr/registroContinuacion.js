document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('inputImagen').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('imagenSeleccionada').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('detailsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        if (formData.get('nombre') && formData.get('apellidos') && formData.get('telefono')) {
            fetch('../api/services/registroContinuacion_services.php?action=saveDetails', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: 'Detalles guardados correctamente'
                        }).then(() => {
                            window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.error
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un problema al guardar los detalles'
                    });
                });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, complete todos los campos.'
            });
        }
    });
});
