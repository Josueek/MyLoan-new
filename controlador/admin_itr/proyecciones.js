document.addEventListener('DOMContentLoaded', function () {
    graficoBarrasCursos(); // Mostrar gráfico de barras con datos de cursos
    graficoPrestamos();   // Mostrar gráfico de barras con datos de préstamos
});

const graficoBarrasCursos = async () => {
    try {
        const response = await fetch('../../api/services/curso_services.php?action=cursosUltimosMesesConProyeccion');
        const DATA = await response.json();

        if (DATA.status) {
            let mes = [];
            let cantidad = [];
            let incremento = [];
            let porcentajeIncremento = [];

            DATA.dataset.forEach((row, index) => {
                mes.push(row.mes);
                cantidad.push(row.cantidad_cursos);
                if (index > 0) {
                    const incrementoValor = row.incremento || 0;
                    const porcentaje = row.porcentaje_incremento || 0;
                    incremento.push(incrementoValor);
                    porcentajeIncremento.push(porcentaje);
                } else {
                    incremento.push(0);
                    porcentajeIncremento.push(0);
                }
            });

            barGraphCursos('myBarChartCursos', mes, cantidad, incremento, porcentajeIncremento);
        } else {
            const canvasElement = document.getElementById('myBarChartCursos');
            if (canvasElement) canvasElement.remove();
            console.error('Datos incorrectos:', DATA.error);
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

const graficoPrestamos = async () => {
    try {
        const response = await fetch('../../api/services/curso_services.php?action=prestamosUltimosMesesConProyeccion');
        const DATA = await response.json();

        if (DATA.status) {
            let mes = [];
            let cantidad = [];
            let incremento = [];
            let porcentajeIncremento = [];

            DATA.dataset.forEach((row, index) => {
                mes.push(row.mes);
                cantidad.push(row.cantidad_prestamos);
                if (index > 0) {
                    const incrementoValor = row.incremento || 0;
                    const porcentaje = row.porcentaje_incremento || 0;
                    incremento.push(incrementoValor);
                    porcentajeIncremento.push(porcentaje);
                } else {
                    incremento.push(0);
                    porcentajeIncremento.push(0);
                }
            });

            barGraphPrestamos('myBarChartPrestamos', mes, cantidad, incremento, porcentajeIncremento);
        } else {
            const canvasElement = document.getElementById('myBarChartPrestamos');
            if (canvasElement) canvasElement.remove();
            console.error('Datos incorrectos:', DATA.error);
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

const barGraphCursos = (canvasId, labels, cantidad, incremento, porcentajeIncremento) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cantidad de Cursos',
                    data: cantidad,
                    backgroundColor: '#0466F8',
                    borderColor: '#0466F8',
                    borderWidth: 1,
                },
                {
                    label: 'Incremento',
                    data: incremento,
                    backgroundColor: '#0B7F4B',
                    borderColor: '#0B7F4B',
                    borderWidth: 1,
                },
                {
                    label: 'Porcentaje de Incremento (%)',
                    data: porcentajeIncremento,
                    type: 'line',
                    backgroundColor: '#FCBE2D',
                    borderColor: '#FCBE2D',
                    borderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad de Cursos e Incremento'
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Porcentaje de Incremento (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de Cursos, Incremento y Porcentaje de Incremento'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const datasetLabel = tooltipItem.dataset.label || '';
                            const value = tooltipItem.raw;
                            if (datasetLabel === 'Porcentaje de Incremento (%)') {
                                return `${datasetLabel}: ${value}%`;
                            }
                            return `${datasetLabel}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}

const barGraphPrestamos = (canvasId, labels, cantidad, incremento, porcentajeIncremento) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cantidad de Préstamos',
                    data: cantidad,
                    backgroundColor: '#FCBE2D',
                    borderColor: '#FCBE2D',
                    borderWidth: 1,
                },
                {
                    label: 'Incremento',
                    data: incremento,
                    backgroundColor: '#0B7F4B',
                    borderColor: '#0B7F4B',
                    borderWidth: 1,
                },
                {
                    label: 'Porcentaje de Incremento (%)',
                    data: porcentajeIncremento,
                    type: 'line',
                    backgroundColor: '#0466F8',
                    borderColor: '#0466F8',
                    borderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad de Préstamos e Incremento'
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Porcentaje de Incremento (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de Préstamos, Incremento y Porcentaje de Incremento'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const datasetLabel = tooltipItem.dataset.label || '';
                            const value = tooltipItem.raw;
                            if (datasetLabel === 'Porcentaje de Incremento (%)') {
                                return `${datasetLabel}: ${value}%`;
                            }
                            return `${datasetLabel}: ${value}`;
                        }
                    }
                }
            }
        }


        
    });


}
    
const generarReporte1 = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/proyeccion_cursos.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};


const generarReporte2 = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/proyeccion_prestamos.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};