document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario hasta que todo esté validado
        let isValid = true;
        const elements = this.querySelectorAll('input, select, textarea');

        // Quitar mensajes de error anteriores
        const errorMessages = this.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        elements.forEach(element => {
            if (!element.checkValidity()) {
                isValid = false;
                element.classList.add('error');
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = `Por favor, completa correctamente el campo: ${element.name}`;
                element.after(errorMessage);
            } else {
                element.classList.remove('error');
            }
        });
    });
});
