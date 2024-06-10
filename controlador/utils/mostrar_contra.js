// Función para mostrar u ocultar la contraseña
function togglePassword(inputId, buttonId) {
    var input = document.getElementById(inputId);
    var button = document.getElementById(buttonId);
    if (input.type === "password") {
        input.type = "text";
        button.innerHTML = '<i class="far fa-eye-slash"></i>'; // Cambia el icono a ojo cerrado
    } else {
        input.type = "password";
        button.innerHTML = '<i class="far fa-eye"></i>'; // Cambia el icono a ojo abierto
    }
}

// Agrega eventos de clic para los botones de ojo
document.getElementById("toggleNewPassword").addEventListener("click", function () {
    togglePassword("inputNewPassword", "toggleNewPassword");
});
document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
    togglePassword("inputConfirmPassword", "toggleConfirmPassword");
});



