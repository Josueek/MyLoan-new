$(document).ready(function () {

    cargarFechas();

    function generarCalendario(fechaActual) {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const [año, mes, dia] = fechaActual.split('-').map(Number);
        const fechaHoy = new Date(año, mes - 1, dia);
        const mesActual = fechaHoy.getMonth();
        const añoActual = fechaHoy.getFullYear();

        $('#calendar-header').text(`${fechaHoy.toLocaleString('default', { month: 'long' })} ${añoActual}`);

        const primerDiaMes = new Date(añoActual, mesActual, 1);
        const ultimoDiaMes = new Date(añoActual, mesActual + 1, 0);
        const primerDiaSemana = primerDiaMes.getDay();
        const totalDiasMes = ultimoDiaMes.getDate();

        let calendarBody = '';
        let diaActual = 1;
        for (let i = 0; i < 6; i++) { // 6 semanas
            let row = '<tr>';
            for (let j = 0; j < 7; j++) { // 7 días a la semana
                if (i === 0 && j < primerDiaSemana) {
                    row += '<td></td>';
                } else if (diaActual > totalDiasMes) {
                    break;
                } else {
                    row += `<td>${diaActual}</td>`;
                    diaActual++;
                }
            }
            row += '</tr>';
            calendarBody += row;
            if (diaActual > totalDiasMes) {
                break;
            }
        }
        $('#calendar-body').html(calendarBody);
    }

    function marcarFechas(fechaActual, fechaCursoMasCercano) {
        const [añoActual, mesActual, diaActual] = fechaActual.split('-').map(Number);
        let cursoEnMesActual = false;

        $('#calendar-body td').each(function () {
            const dia = parseInt($(this).text());
            if (!isNaN(dia)) {
                const fechaComparar = new Date(añoActual, mesActual - 1, dia);
                const fechaCompararStr = fechaComparar.toISOString().split('T')[0];

                if (fechaCompararStr === fechaActual) {
                    $(this).css('background-color', '#ADD8E6'); // LightBlue en hexadecimal
                }
                if (fechaCompararStr === fechaCursoMasCercano) {
                    $(this).css('background-color', '#FCBE2D'); // Amarillo en hexadecimal
                    cursoEnMesActual = true;
                }
            }
        });

        return cursoEnMesActual; // Retorna si hay curso en el mes actual
    }

    function calcularDiasRestantes(fechaCursoMasCercano) {
        const fechaHoy = new Date();
        const fechaCurso = new Date(fechaCursoMasCercano);
        const diferenciaTiempo = fechaCurso - fechaHoy;
        const diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días

        return diasRestantes;
    }

    function cargarFechas() {
        fetch('../../api/services/cursosfechas_services.php?action=obtenerFechasCurso') // Asegúrate de que la URL sea correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error('Red no está disponible.');
                }
                return response.json(); // Leer como JSON directamente
            })
            .then(data => {
                const fechaActual = data.fechaActual;
                const fechaCursoMasCercano = data.fechaCursoMasCercano;

                // Generar el calendario con la fecha actual
                generarCalendario(fechaActual);

                // Marcar las fechas en el calendario y obtener si hay curso en el mes actual
                const cursoEnMesActual = marcarFechas(fechaActual, fechaCursoMasCercano);

                // Calcular y mostrar los días restantes
                if (fechaCursoMasCercano) {
                    const diasRestantes = calcularDiasRestantes(fechaCursoMasCercano);
                    if (diasRestantes === 0) {
                        $('#mensaje-dias-restantes').text('¡Suerte con tu curso! ¡Hoy inicia!');
                    } else if (diasRestantes < 0) {
                        $('#mensaje-dias-restantes').text('No hay cursos programados por el momento.');
                    } else {
                        $('#mensaje-dias-restantes').text(`Faltan ${diasRestantes} días para el inicio del curso más cercano.`);
                    }
                } else {
                    $('#mensaje-dias-restantes').text('No hay cursos programados por el momento.');
                }
            })
            .catch(error => console.error('Error al obtener las fechas:', error));
    }

    // Cargar las fechas al cargar la página
});
