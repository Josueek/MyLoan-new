document.addEventListener('DOMContentLoaded', function() {
    // Datos para los gráficos con nuevos colores (sin rojo)
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Sales',
            data: [30, 40, 35, 50, 60, 70, 80],
            borderColor: '#0466F8', // Color de línea
            backgroundColor: 'rgba(4, 102, 248, 0.2)', // Color de fondo
            fill: true
        }]
    };

    const barChartData = {
        labels: ['Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Votes',
            data: [19, 3, 5, 2, 3],
            backgroundColor: '#0466F8', // Color de fondo de las barras
            borderColor: '#11015C', // Color del borde de las barras
            borderWidth: 1
        }]
    };

    const pieChartData = {
        labels: ['Blue', 'Yellow', 'Green'],
        datasets: [{
            data: [50, 100, 70],
            backgroundColor: ['#0466F8', '#FCBE2D', '#0B7F4B'] // Colores del pie
        }]
    };

    const doughnutChartData = {
        labels: ['Blue', 'Yellow', 'Green'],
        datasets: [{
            data: [50, 100, 70],
            backgroundColor: ['#0466F8', '#FCBE2D', '#0B7F4B'] // Colores del doughnut
        }]
    };

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
                {x: 10, y: 20, r: 15},
                {x: 20, y: 10, r: 10},
                {x: 15, y: 30, r: 20}
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
                {x: 10, y: 20},
                {x: 15, y: 25},
                {x: 20, y: 30},
                {x: 25, y: 35}
            ],
            backgroundColor: '#FCBE2D', // Color de los puntos en el gráfico de dispersión
            borderColor: '#11015C', // Color del borde de los puntos
            borderWidth: 1
        }]
    };

    // Inicializa los gráficos
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: lineChartData
    });

    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: barChartData
    });

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: pieChartData
    });

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
});
