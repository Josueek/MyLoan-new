
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('yourButtonId').addEventListener('click', function() {
        generarReportePorEstado();
    });
});


const generarReporte1 = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/empleados_especialidad.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};
/*
*   Función para abrir un reporte automático de los productos con bajas exitencias.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const generarReporte2 = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/curso_empleados.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};

/*
*   Función para abrir un reporte automático de las proyecciones de ventas
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const generarReporte3 = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/empleado_curso_activo.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};


/*
*   Función para abrir un reporte automático del inventario de los productos.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const generarReporte4 = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/detalle_espacio.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};

/*
*   Función para abrir un reporte automático de los clientes que se han registrado, su fecha y cantidad por mes y año.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const generarReporteRegistroClientes = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/admin/clientes _registrados.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};


/*
*   Función para abrir un reporte automático de administradores existentes.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const generarReporteRegistroAdmin = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/admin/administradores.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};

// Función para abrir y generar el reporte parametrizado
const EquipoEspacio = () => {
    // Obtener el valor seleccionado del combo box
    const espacio = document.getElementById('ReporteEspacioEquipo').value;

    // Verificar si el valor es válido
    if (!espacio) {
        console.error('Por favor selecciona un espacio.');
        return;
    }

    // Definir la ruta del reporte y agregar el parámetro del espacio
    const PATH = new URL(`${SERVER_URL}reportes/equipo_espacio.php`);
    PATH.searchParams.append('id_espacio', espacio);

    // Verificar el valor en la consola para depuración
    console.log('ID Espacio seleccionado:', espacio);

    // Abrir el reporte en una nueva pestaña
    window.open(PATH.href);
};
function generarReportePorEstado() {
    // Obtener el estado seleccionado por el usuario
    const estadoSeleccionado = document.getElementById('filtroEstado').value;

    if (estadoSeleccionado) {
        // Definir la ruta del reporte, incluyendo el estado como parámetro
        const PATH = new URL(`${SERVER_URL}reportes/empleados_estado.php?estado=${estadoSeleccionado}`);
        
        // Abrir el reporte en una nueva pestaña
        window.open(PATH.href);
    } else {
        alert('Por favor, seleccione un estado para generar el reporte.');
    }
}

const generarReporteEspacios = () => {
    // Obtener el valor seleccionado del dropdown
    const especialidadId = document.getElementById('filtrarEspecialidad').value;
    // Definir la ruta del reporte con el parámetro de la especialidad
    const PATH = new URL(`${SERVER_URL}reportes/espacio_especialidad.php?especialidadId=${especialidadId}`, target="_blank");
    // Abrir el reporte en una nueva pestaña
    window.open(PATH.href, '_blanck');
};

function generarReporte() {
    const ordenSeleccionado = document.getElementById('filtrarCantidad').value;

    // Construir la URL del reporte
    const PATH = `${SERVER_URL}reportes/inventario_materiales.php?orden=${encodeURIComponent(ordenSeleccionado)}`;

    // Mostrar la URL en la consola para depuración
    console.log('Generando reporte en:', PATH);

    // Abrir el reporte en una nueva pestaña
    window.open(PATH, '_blank');
}

function generarReportePorInstitucion() {
    const institucionSeleccionada = document.getElementById('filtroInstitucion').value;

    if (!institucionSeleccionada) {
        alert('Por favor, selecciona una institución para generar el reporte.');
        return;
    }

    // Construir la URL del reporte
    const PATH = `${SERVER_URL}reportes/inventario_herramienta.php?institucion=${encodeURIComponent(institucionSeleccionada)}`;

    // Mostrar la URL en la consola para depuración
    console.log('Generando reporte en:', PATH);

    // Abrir el reporte en una nueva pestaña
    window.open(PATH, '_blank');
}
