// URL base para las solicitudes al servidor
const SERVER_URL = 'http://localhost/MyLoan-new/api/';

// Función que muestra una advertencia para confirmar una acción
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

// Función para mostrar una alerta personalizada usando SweetAlert
const sweetAlert = async (type, text, timer, url = null) => {
    // Configuración del título y el icono según el tipo de alerta
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }

    // Opciones de configuración para la alerta
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar'
        }
    };

    // Configura el temporizador si se proporciona
    timer ? options.timer = 3000 : options.timer = null;

    // Muestra la alerta y redirige a la URL si se proporciona
    await swal(options);
    url ? location.href = url : undefined;
}

// Función para llenar un elemento <select> con datos de una solicitud
const fillSelect = async (filename, action, select, filter = undefined) => {
    // Prepara los datos del formulario si se proporciona un filtro
    const FORM = (typeof filter === 'object') ? filter : null;
    // Obtiene los datos usando fetchData
    const DATA = await fetchData(filename, action, FORM);
    let content = '';

    // Verifica si los datos son válidos y el elemento <select> existe
    if (DATA && DATA.status && document.getElementById(select)) {
        content += '';

        // Llena las opciones del <select>
        DATA.dataset.forEach(row => {
            const value = Object.values(row)[0];
            const text = Object.values(row)[1];
            const SELECTED = (typeof filter === 'number') ? filter : null;

            if (value != SELECTED) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }

    // Actualiza el contenido del <select>
    const selectElement = document.getElementById(select);
    if (selectElement) {
        selectElement.innerHTML = content;
    } else {
        console.error(`Elemento select con id '${select}' no encontrado en el DOM.`);
    }
}

// Función para generar una paleta de colores
const generateColorPalette = (numColors) => {
    const palette = [];
    const baseColors = [[49, 49, 49], [73, 120, 144], [3, 99, 148], [185, 185, 185]];

    // Genera colores variando los colores base
    for (let i = 0; i < numColors; i++) {
        const baseColor = baseColors[i % baseColors.length];
        const variation = (i / numColors) * 0.5;
        const r = Math.round(baseColor[0] * (1 - variation));
        const g = Math.round(baseColor[1] * (1 - variation));
        const b = Math.round(baseColor[2] * (1 - variation));
        const color = `rgba(${r}, ${g}, ${b}, 1)`;
        palette.push(color);
    }

    return palette;
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

// Función para crear un gráfico de líneas usando Chart.js
const LineGraph = (canvas, xAxis, yAxis, legend, title) => {
    const colors = generateColorPalette(xAxis.length);

    new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });
}

// Función para cerrar sesión y mostrar una alerta de confirmación
const logOut = async () => {
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    if (RESPONSE) {
        const DATA = await fetchData(USER_API, 'logOut');
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

// Función para cerrar sesión en una interfaz pública y mostrar una alerta de confirmación
const logOutPublic = async () => {
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    if (RESPONSE) {
        const DATA = await fetchData(CLIENTE_API, 'logOut');
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

// Función para hacer solicitudes a la API y obtener datos
const fetchData = async (filename, action, form = null) => {
    const OPTIONS = {};
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        const PATH = new URL(SERVER_URL + filename);
        PATH.searchParams.append('action', action);
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        return await RESPONSE.json();
    } catch (error) {
        console.log(error);
    }
}

// Función para crear un gráfico radar usando Chart.js
const radarGraph = (canvas, legends, values, title) => {
    let colors = values.map(() => '#' + (Math.random().toString(16)).substring(2, 8));

    new Chart(document.getElementById(canvas), {
        type: 'radar',
        data: {
            labels: legends,
            datasets: [{
                label: title,
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            }
        }
    });
};
