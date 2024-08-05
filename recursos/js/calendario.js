$(document).ready(function () {
  function generarCalendario() {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const fechaHoy = new Date();
      const mes = fechaHoy.getMonth();
      const año = fechaHoy.getFullYear();

      $('#calendar-header').text(`${fechaHoy.toLocaleString('default', { month: 'long' })} ${año}`);

      const primerDiaMes = new Date(año, mes, 1);
      const ultimoDiaMes = new Date(año, mes + 1, 0);
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
      $('#calendar-body td').each(function () {
          const dia = parseInt($(this).text());
          if (!isNaN(dia)) {
              const mes = new Date().getMonth() + 1;
              const año = new Date().getFullYear();
              const fechaComparar = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

              if (fechaComparar === fechaActual) {
                  $(this).css('background-color', '#ADD8E6'); // LightBlue en hexadecimal
              }
              if (fechaComparar === fechaCursoMasCercano) {
                  $(this).css('background-color', '#FCBE2D'); // Amarillo en hexadecimal
              }
          }
      });
  }

  function calcularDiasRestantes(fechaCursoMasCercano) {
      const fechaHoy = new Date();
      const fechaCurso = new Date(fechaCursoMasCercano);
      const diferenciaTiempo = fechaCurso - fechaHoy;
      const diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días

      return diasRestantes;
  }

  function cargarFechas() {
      fetch('../../api/services/curso_services.php') // Asegúrate de que la URL sea correcta
          .then(response => {
              if (!response.ok) {
                  throw new Error('Red no está disponible.');
              }
              return response.json();
          })
          .then(data => {
              if (data.fechaActual && data.fechaCursoMasCercano) {
                  const fechaActual = data.fechaActual;
                  const fechaCursoMasCercano = data.fechaCursoMasCercano;

                  // Generar el calendario
                  generarCalendario();

                  // Marcar las fechas en el calendario
                  marcarFechas(fechaActual, fechaCursoMasCercano);

                  // Calcular y mostrar los días restantes
                  const diasRestantes = calcularDiasRestantes(fechaCursoMasCercano);
                  $('#mensaje-dias-restantes').text(`Faltan ${diasRestantes} días para el inicio del curso más cercano.`);
              } else {
                  console.error('Error al obtener las fechas:', data.message);
              }
          })
          .catch(error => console.error('Error al obtener las fechas:', error));
  }

  // Cargar las fechas al cargar la página
  cargarFechas();
});
