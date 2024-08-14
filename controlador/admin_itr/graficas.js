document.addEventListener('DOMContentLoaded', function() {
    // Datos para los gráficos
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Sales',
            data: [30, 40, 35, 50, 60, 70, 80],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
        }]
    };

    const barChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const pieChartData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    const doughnutChartData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    const radarChartData = {
        labels: ['Running', 'Swimming', 'Cycling', 'Jumping', 'Walking'],
        datasets: [{
            label: 'Activity Levels',
            data: [65, 59, 90, 81, 56],
            backgroundColor: 'rgba(179, 181, 198, 0.2)',
            borderColor: 'rgba(179, 181, 198, 1)',
            borderWidth: 1
        }]
    };

    const polarAreaChartData = {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [{
            label: 'Data',
            data: [11, 16, 7, 22, 17],
            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
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
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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