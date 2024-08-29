
// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {

});
/*
*   Función para abrir un reporte automático de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/



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
const generarReporteBajasExistencias = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reports/cliente.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};

/*
*   Función para abrir un reporte automático de las proyecciones de ventas
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const generarReporteProyeccion = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/admin/proyecciones_de_ventas.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
};


/*
*   Función para abrir un reporte automático del inventario de los productos.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const generarReporteInventario = () => {
    // Se define la ruta del reporte basado en el tipo de reporte.
    const PATH = new URL(`${SERVER_URL}reportes/admin/inventario.php`);
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
const EquipoEspacio = (espacio) => {
    // Definir la ruta del reporte y agregar el parámetro del espacio
    const PATH = new URL(`${SERVER_URL}reportes/equipo_espacio.php`);
    PATH.searchParams.append('id_espacio', espacio);

    // Abrir el reporte en una nueva pestaña
    window.open(PATH.href);
};