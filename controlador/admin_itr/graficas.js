
document.addEventListener('DOMContentLoaded', function () {
    // Hacer una solicitud AJAX para obtener los datos de PHP
    // Función para obtener datos de la API y generar el gráfico de barras.

    graficoUsuariosConMasPrestamos();
    graficoLinealCursos();
    graficoCursosPorEstado()
    graficoEspaciosPorTipo();
});
const graficoLinealCursos = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const response = await fetch('../../api/services/curso_services.php?action=getCantidadCursosUltimos12Meses');
        const DATA = await response.json();

        // Se comprueba si la respuesta es satisfactoria.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let mes = [];
            let cantidad = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                mes.push(row.mes_anio);
                cantidad.push(row.cantidad_cursos);
            });
            // Llamada a la función para generar y mostrar un gráfico lineal.
            lineGraph('myLineChart', mes, cantidad, 'Cantidad de cursos', 'Cantidad de cursos en los últimos 12 meses');
        } else {
            // En caso de error, se remueve el canvas.
            const canvasElement = document.getElementById('myLineChart');
            if (canvasElement) canvasElement.remove();
            console.error('Datos incorrectos:', DATA.error);
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

// Función para generar un gráfico lineal.
const lineGraph = (canvasId, xAxisLabels, yAxisData, legendLabel, chartTitle) => {
    // Se declaran los colores para la línea del gráfico.
    const colors = [
        '#0466F8', // Azul
        '#FCBE2D', // Amarillo
        '#0B7F4B', // Verde
        '#11015C'  // Púrpura
    ];

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvasId), {
        type: 'line', // Tipo de gráfico
        data: {
            labels: xAxisLabels,
            datasets: [{
                label: legendLabel,
                data: yAxisData,
                borderColor: colors[0],  // Color de la línea
                backgroundColor: 'rgba(4, 102, 248, 0.2)', // Color de fondo (azul con opacidad)
                borderWidth: 2,
                fill: true  // Llenar el área bajo la línea
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: chartTitle
                    },
                    beginAtZero: true
                }
            }
        }
    });
}




// Llamada a la función para ejecutar el gráfico

const graficoUsuariosConMasPrestamos = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const response = await fetch('../../api/services/registro_services.php?action=UsuariosConMasPrestamos');
        const DATA = await response.json();

        // Se comprueba si la respuesta es satisfactoria.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let usuarios = [];
            let cantidadPrestamos = [];

            // Se recorre el conjunto de registros fila por fila a través del objeto dataset.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                usuarios.push(row.nombre_empleado); // Cambiado de correo_electronico a nombre_empleado
                cantidadPrestamos.push(row.cantidad_prestamos);
            });

            // Llamada a la función para generar y mostrar un gráfico de barras.
            barGraph('myBarChart', usuarios, cantidadPrestamos, 'Cantidad de Préstamos', 'Usuarios con más préstamos');
        } else {
            // En caso de error, se remueve el canvas.
            const canvasElement = document.getElementById('myBarChart');
            if (canvasElement) canvasElement.remove();
            console.error('Datos incorrectos:', DATA.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Función para generar un gráfico de barras.
const barGraph = (canvasId, xAxisLabels, yAxisData, legendLabel, chartTitle) => {
    // Crear una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvasId), {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: xAxisLabels,
            datasets: [{
                label: legendLabel,
                data: yAxisData,
                backgroundColor: [
                    '#0466F8', // Azul
                    '#FCBE2D', // Amarillo
                    '#0B7F4B', // Verde
                    '#11015C', // Púrpura
                    '#FF6F00'  // Naranja
                ], // Colores de fondo de las barras
                borderColor: [
                    '#0466F8', // Azul
                    '#FCBE2D', // Amarillo
                    '#0B7F4B', // Verde
                    '#11015C', // Púrpura
                    '#FF6F00'  // Naranja
                ], // Colores del borde de las barras
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Usuarios'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cantidad de Préstamos'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}


// Llamar a la función para cargar el gráfico

const graficoCursosPorEstado = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const response = await fetch('../../api/services/curso_services.php?action=CursosPorEstado');
        const DATA = await response.json();

        // Se comprueba si la respuesta es satisfactoria.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let estados = [];
            let cantidades = [];

            // Se recorre el conjunto de registros fila por fila a través del objeto dataset.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                estados.push(row.estado);
                // Usamos la longitud de los nombres concatenados como dato para el gráfico.
                cantidades.push(row.nombres_cursos.split(',').length);
            });

            // Llamada a la función para generar y mostrar un gráfico de pastel.
            pieChart('myPieChart', estados, cantidades);
        } else {
            console.error('Datos incorrectos:', DATA.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Función para generar un gráfico de pastel.
const pieChart = (canvasId, labels, data) => {
    // Crear una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvasId), {
        type: 'pie', // Tipo de gráfico
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#0466F8', // Azul
                    '#FCBE2D', // Amarillo
                    '#0B7F4B', // Verde
                    '#11015C', // Púrpura
                    '#FF6F00'  // Naranja
                ] // Colores del pastel
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cursos por Estado'
                },
                legend: {
                    display: true
                }
            }
        }
    });
}

const graficoEspaciosPorTipo = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const response = await fetch('../../api/services/espacios_services.php?action=EspaciosPorTipo');
        const DATA = await response.json();

        // Se comprueba si la respuesta es satisfactoria.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let tiposEspacios = [];
            let cantidades = [];

            // Se recorre el conjunto de registros fila por fila a través del objeto dataset.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                tiposEspacios.push(row.tipo_espacio);
                cantidades.push(row.cantidad);
            });

            // Llamada a la función para generar y mostrar un gráfico de dona.
            doughnutChart('myDoughnutChart', tiposEspacios, cantidades);
        } else {
            console.error('Datos incorrectos:', DATA.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Función para generar un gráfico de dona.
const doughnutChart = (canvasId, labels, data) => {
    // Crear una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvasId), {
        type: 'doughnut', // Tipo de gráfico
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#0466F8', // Azul
                    '#FCBE2D', // Amarillo
                    '#0B7F4B', // Verde
                    '#11015C', // Púrpura
                    '#FF6F00'  // Naranja
                ] // Colores del dona
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Espacios por Tipo'
                },
                legend: {
                    display: true
                }
            }
        }
    });
}

// Llamada a la función para cargar y mostrar el gráfico.


const radarChartData = {
    labels: ['Running', 'Swimming', 'Cycling', 'Jumping', 'Walking'],
    datasets: [{
        label: 'Activity Levels',
        data: [65, 59, 90, 81, 56],
        backgroundColor: 'rgba(11, 127, 75, 0.2)', // Color de fondo del radar
        borderColor: '#0B7F4B', // Color del borde del radar
        borderWidth: 1
    }]
};

const polarAreaChartData = {
    labels: ['Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [{
        label: 'Data',
        data: [16, 7, 22, 17],
        backgroundColor: ['#0B7F4B', '#FCBE2D', '#E7E9ED', '#0466F8'] // Colores del polar area
    }]
};

const bubbleChartData = {
    datasets: [{
        label: 'Bubble Chart',
        data: [
            { x: 10, y: 20, r: 15 },
            { x: 20, y: 10, r: 10 },
            { x: 15, y: 30, r: 20 }
        ],
        backgroundColor: '#0466F8', // Color de fondo de las burbujas
        borderColor: '#11015C', // Color del borde de las burbujas
        borderWidth: 1
    }]
};

const scatterChartData = {
    datasets: [{
        label: 'Scatter Dataset',
        data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
            { x: 20, y: 30 },
            { x: 25, y: 35 }
        ],
        backgroundColor: '#FCBE2D', // Color de los puntos en el gráfico de dispersión
        borderColor: '#11015C', // Color del borde de los puntos
        borderWidth: 1
    }]
};
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
new Chart(doughnutCtx, {
    type: 'doughnut',
    data: doughnutChartData
});

const radarCtx = document.getElementById('radarChart').getContext('2d');
new Chart(radarCtx, {
    type: 'radar',
    data: radarChartData
});

const polarAreaCtx = document.getElementById('polarAreaChart').getContext('2d');
new Chart(polarAreaCtx, {
    type: 'polarArea',
    data: polarAreaChartData
});

const bubbleCtx = document.getElementById('bubbleChart').getContext('2d');
new Chart(bubbleCtx, {
    type: 'bubble',
    data: bubbleChartData
});

const scatterCtx = document.getElementById('scatterChart').getContext('2d');
new Chart(scatterCtx, {
    type: 'scatter',
    data: scatterChartData
});
