//Funcion del menu lateral para que no se cierre el sub menu
// Agregamos un evento de clic al enlace del menú de administrar para evitar que se cierre automáticamente
document.getElementById('btnAdministrar').addEventListener('click', function (e) {
    e.preventDefault(); // Evitamos que el enlace siga su acción predeterminada
    e.stopPropagation(); // Evitamos que el clic se propague y cierre el menú
    const submenu = document.getElementById('submenu');
    setTimeout(() => {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; // Alternamos entre mostrar y ocultar el submenú
    }, 100); // Esperamos 100 milisegundos antes de cambiar el estilo
});

//Control de desplazamiento de submenus

// Función para controlar la apertura y cierre de los submenús
function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}

// Agregar eventos de clic al enlace del menú de observaciones
document.getElementById('btnobser').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace siga su acción predeterminada
    const submenu = document.getElementById('submenu7');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});

// Agregar eventos de clic al enlace del menú de reportes
document.getElementById('btnReporte').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace siga su acción predeterminada
    const submenu = document.getElementById('submenu8');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});

// Agregar eventos de clic al enlace del menú de cursos
document.getElementById('btnCursos').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace siga su acción predeterminada
    const submenu = document.getElementById('submenu9');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});

// Agregar eventos de clic al enlace del menú de mis prestamos
document.getElementById('btnPrestamos').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace siga su acción predeterminada
    const submenu = document.getElementById('submenu10');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});

/*abrir el explorador de archivos en la parte de agregar espacio para suubir el documento
document.getElementById('btnDocumento').addEventListener('click', function () {
    document.getElementById('documentoInput').click();
});

document.getElementById('documentoInput').addEventListener('change', function () {
    var fileName = this.files[0].name;
    document.getElementById('inputdocumento').value = fileName;
});    3696 
*/                                                                                    