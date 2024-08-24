document.addEventListener('DOMContentLoaded', function() {
    var ctxPie = document.getElementById('pieChart').getContext('2d');
    var pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'My Pie Chart',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    '#0466F8', // Azul
                    '#FCBE2D', // Amarillo
                    '#0B7F4B', // Verde
                    '#11015C', // Púrpura
                ],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
