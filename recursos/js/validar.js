function validateInput(input) {
    if (input.value < 0) {
        input.setCustomValidity('El valor no puede ser negativo.');
    } else {
        input.setCustomValidity('');
    }
}