$(document).ready(function () {
    // Almacena el mensaje de cada mes en un array
    const mensajesMensuales = [
        "¡Bienvenido a enero! Un nuevo comienzo, nuevos sueños por cumplir.",
        "¡Feliz febrero! El mes del amor y la amistad. ¡Disfrútalo!",
        "¡Marzo! Tiempo de crecimiento y nuevas ideas.",
        "¡Abril! La primavera está en el aire. ¡A disfrutar de la naturaleza!",
        "¡Mayo! Un mes para florecer y brillar.",
        "¡Junio! ¡El verano trae sol y diversión!",
        "¡Julio! Un mes para aventuras y recuerdos inolvidables.",
        "¡Agosto! ¡El tiempo vuela! Aprovecha cada momento.",
        "¡Septiembre! Vuelve a empezar y a soñar en grande.",
        "¡Octubre! ¡ Feliz mes de los dulces y los sustos!",
        "¡Noviembre! Es tiempo de gratitud y buenos momentos.",
        "¡Diciembre! Que tengas un mes lleno de alegría y celebraciones."
    ];

    // Rutas de las imágenes para cada mes
    const imagenesMensuales = [
        "../../api/imagenes/mes/Fortune cookie-bro.png", // Reemplaza con la ruta de tu imagen para enero
        "../../api/images/mes/Cat and dog-bro.pmg",
      "../../api/imagenes/mes/Light bulb-bro.png",
       "../../api/images/mes/cherry tree-bro.png",
        "../../api/images/mes/personal growth-bro.png",
        "../../api/images/mes/Canoeing-bro.png",
        "../../api/images/mes/On the way-bro.png",
       "../../api/images/mes/taken-bro.png",
       "../../api/images/mes/Creative thinking-bro.png",
        "../../api/images/mes/Pets with halloween costumes-bro.png",
        "../../api/images/mes/Penguin family-bro.png",
        "../../api/images/mes/Christmas manger-bro.png"
    ];

    // Función para verificar si ha cambiado el mes
    function verificarMes() {
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth(); // 0-11 para enero-diciembre
        const añoActual = fechaActual.getFullYear();

        // Obtener el mes y año almacenados en el almacenamiento local
        const mesGuardado = localStorage.getItem('mesUsuario');
        const añoGuardado = localStorage.getItem('añoUsuario');

        // Si el mes ha cambiado, actualizar el almacenamiento y mostrar el modal
        if (mesGuardado != mesActual || añoGuardado != añoActual) {
            // Almacenar el nuevo mes y año en el almacenamiento local
            localStorage.setItem('mesUsuario', mesActual);
            localStorage.setItem('añoUsuario', añoActual);

            // Mostrar el modal con un mensaje lindo
            mostrarModal(mensajesMensuales[mesActual], imagenesMensuales[mesActual]);
        }
    }

    // Función para mostrar el modal
    function mostrarModal(mensaje, imagen) {
        // Insertar el mensaje en el cuerpo del modal
        $('#modal-message').text(mensaje);
        $('#modal-image').attr('src', imagen); // Insertar la imagen

        // Mostrar el modal
        $('#randomModal').modal('show');
    }

    // Verificar el mes al cargar la página
    verificarMes();
    
    // Mostrar el modal al cargar la página si ya estamos en un nuevo mes
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const mesGuardado = localStorage.getItem('mesUsuario');
    const añoGuardado = localStorage.getItem('añoUsuario');

    // Si el mes ya está guardado pero coincide con el actual, mostrar el modal
    if (mesGuardado == mesActual) {
        mostrarModal(mensajesMensuales[mesActual], imagenesMensuales[mesActual]);
    }
});
