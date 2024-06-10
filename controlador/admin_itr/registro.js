document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registroForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('../api/services/registro_services.php?action=signUp', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Registro completado. Redirigiendo...'
                    }).then(() => {
                        window.location.href = 'registro_continuacion.html';
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
                    text: 'Ocurrió un problema durante el registro'
                });
            });
    });
});
