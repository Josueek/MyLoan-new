
const PRESTAMOS_API = '../../api/models/handler/prestamos_handler.php'; // Ruta al archivo PHP que maneja las peticiones
const TABLE_BODY = document.getElementById('tableBody');

const fillTable = async () => {
    // Limpiar contenido previo de la tabla
    TABLE_BODY.innerHTML = '';
    
    try {
        // Hacer la petición para obtener todos los préstamos
        const response = await fetch(PRESTAMOS_API + '?action=readAll');
        
        // Verificar si la respuesta tiene un estado de éxito
        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.statusText);
        }
        
        const data = await response.json();
        
        if (data.status) {
            // Iterar sobre cada préstamo y construir las filas de la tabla
            data.dataset.forEach(row => {
                TABLE_BODY.innerHTML += `
                    <tr>
                        <td>${row.id_prestamo}</td>
                        <td>${row.nombre_curso}</td>
                        <td>${row.fecha_solicitud}</td>
                        <td>${row.programa_formacion}</td>
                        <td>${row.estado_prestamo}</td>
                        <td>${row.observacion}</td>
                        <td>${row.nombre_empleado}</td>
                    </tr>
                `;
            });
        } else {
            console.error('Error al obtener los préstamos:', data.error);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};

// Llamada inicial para llenar la tabla al cargar la página
fillTable();