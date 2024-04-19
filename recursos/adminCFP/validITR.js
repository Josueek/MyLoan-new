// Función para validar el formulario
function validarFormulario() {
    // Obtenemos los valores de los campos
    var correo = document.getElementById("correo").value;
    var contraseña = document.getElementById("contraseña").value;
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    var cargo = document.getElementById("cargo").value;
    var estado = document.getElementById("estado").value;
    var apellido = document.getElementById("apellido").value;
    var especialidad = document.getElementById("especialidad").value;

    // Expresión regular para validar el formato del correo electrónico
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar correo electrónico
    if (!correoRegex.test(correo)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return false;
    }

    // Validar longitud de la contraseña
    if (contraseña.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return false;
    }

    // Validar que el teléfono contenga solo números
    var telefonoRegex = /^[0-9]+$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, introduce solo números en el campo de teléfono.");
        return false;
    }

    // Validar que se haya seleccionado un cargo
    if (cargo === "") {
        alert("Por favor, selecciona un cargo.");
        return false;
    }

    // Validar que se haya seleccionado un estado
    if (estado === "") {
        alert("Por favor, selecciona un estado.");
        return false;
    }

    // Si todo está bien, el formulario es válido
    return true;
}

// Agregar evento de envío al formulario para llamar a la función de validación
document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); // Evitar que se envíe el formulario si no es válido
    }
});