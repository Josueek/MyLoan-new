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
        "¡Octubre! ¡Feliz mes de los dulces y los sustos!",
        "¡Noviembre! Es tiempo de gratitud y buenos momentos.",
        "¡Diciembre! Que tengas un mes lleno de alegría y celebraciones."
    ];

    // Rutas de las imágenes para cada mes
    const imagenesMensuales = [
        "../../api/imagenes/mes/Fortune cookie-bro.png", 
        "../../api/images/mes/Cat and dog-bro.png",
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

    // Función para mostrar el modal
    function mostrarModal(mensaje, imagen) {
        // Insertar el mensaje en el cuerpo del modal
        $('#modal-message').text(mensaje);
        $('#modal-image').attr('src', imagen); // Insertar la imagen

        // Mostrar el modal
        $('#randomModal').modal('show');
    }

    // Obtener el mes actual
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // 0-11 para enero-diciembre

    // Obtener la fecha del último despliegue del modal desde localStorage
    const fechaUltimoModal = localStorage.getItem('fechaUltimoModal');
    const fechaHoy = fechaActual.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD

    // Mostrar el modal si no se mostró hoy
    if (fechaUltimoModal !== fechaHoy) {
        mostrarModal(mensajesMensuales[mesActual], imagenesMensuales[mesActual]);
        // Guardar la fecha actual en localStorage
        localStorage.setItem('fechaUltimoModal', fechaHoy);
    }
});
