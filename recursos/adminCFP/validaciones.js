// Función para validar que solo se escriba texto en los campos de texto
function soloTexto(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode != 32) {
        evt.preventDefault();
    }
}

// Función para validar que solo se escriban números en el campo de teléfono
function soloNumeros(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
    }
}

// Asignar validaciones a los campos de texto y teléfono
document.getElementById("nombre").addEventListener("keypress", soloTexto);
document.getElementById("apellido").addEventListener("keypress", soloTexto);
document.getElementById("telefono").addEventListener("keypress", soloNumeros);

// Validación de imagen
document.getElementById("imagen").addEventListener("change", function() {
    var fileInput = this;
    var file = fileInput.files[0];
    var imageType = /^image\//;

    if (!file || !imageType.test(file.type)) {
        alert("Por favor, selecciona una imagen.");
        fileInput.value = "";
        document.getElementById("preview").src = "#";
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});