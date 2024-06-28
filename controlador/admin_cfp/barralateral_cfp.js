function generarSidebar() {
    return `
        <nav class="sidebar-nav scroll-sidebar overflow-auto h-100" data-simplebar="">
            <ul id="sidebarnav">
                <li class="sidebar-item">
                    <a class="sidebar-link" href="../vistas_admin/inicio.html" aria-expanded="false">
                        <span>
                            <i class="fa-solid fa-house"></i>
                        </span>
                        <span class="hide-menu">Inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnAdministrar">
                        <span>
                            <i class="fa-solid fa-pager"></i>
                        </span>
                        <span class="hide-menu">Administrar</span>
                    </a>
                    <ul id="submenu" class="submenu">
                        <li class="submenu-item d-flex align-items-center">
                            <a href="../vistas/vistas_admin/administrar_usuarios.html" class="submenu-link  w-100">
                                <span>
                                    <i class="fa-solid fa-user me-2"></i>
                                </span>
                                <span class="hide-menu">Usuarios</span>
                            </a>
                        </li>
                        <li class="submenu-item d-flex align-items-center">
                            <a href="../vistas_admin/gestionar_espacios.html" class="submenu-link">
                                <span>
                                    <i class="ti ti-settings me-2"></i>
                                </span>
                                <span class="hide-menu">Gestionar espacios</span>
                            </a>
                        </li>
                        <li class="submenu-item  d-flex align-items-center">
                            <a href="./vistas/vistas_admin/inventario_herramientas.html" class="submenu-link">
                                <span>
                                    <i class="ti ti-tool me-2"></i>
                                </span>
                                <span class="hide-menu">Gestionar inventario de herramienta</span>
                            </a>
                        </li>
                        <li class="submenu-item  d-flex align-items-center">
                            <a href="../vistas/vistas_admin/inventario_equipos.html" class="submenu-link">
                                <span>
                                    <i class="fas fa-desktop me-2"></i>
                                </span>
                                <span class="hide-menu">Gestionar inventario de equipos</span>
                            </a>
                        </li>
                        <li class="submenu-item  d-flex align-items-center">
                            <a href="../vistas/vistas_admin/inventario_equipos.html" class="submenu-link">
                                <span>
                                    <i class="fas fa-desktop me-2"></i>
                                </span>
                                <span class="hide-menu">Gestionar inventario de equipos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnCursos">
                        <span>
                            <i class="fa-solid fa-certificate"></i>
                        </span>
                        <span class="hide-menu">Cursos</span>
                    </a>
                    <ul id="submenu9" class="submenu" style="display: none;">
                        <li class="submenu-item ">
                            <a href="" class="submenu-link">
                                <span>
                                    <i class="far fa-eye me-2"></i>
                                </span>
                                <span class="hide-menu">Ver cursos</span>
                            </a>
                        </li>
                        <li class="submenu-item">
                            <a href="/" class="submenu-link">
                                <span>
                                    <i class="fa-solid fa-plus me-2"></i>
                                </span>
                                <span class="hide-menu">Crear cursos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnPrestamos">
                        <span>
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </span>
                        <span class="hide-menu">Mis préstamos</span>
                    </a>
                    <ul id="submenu10" class="submenu" style="display: none;">
                        <li class="submenu-item ">
                            <a href=".." class="submenu-link">
                                <span>
                                    <i class="fa-solid fa-plus me-2"></i>
                                </span>
                                <span class="hide-menu">Crear solicitud</span>
                            </a>
                        </li>
                        <li class="submenu-item">
                            <a href=".." class="submenu-link">
                                <span>
                                    <i class="fa-solid fa-inbox me-2"></i>
                                </span>
                                <span class="hide-menu">Visualizar préstamos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href=".." aria-expanded="false">
                        <span>
                            <i class="ti ti-cards"></i>
                        </span>
                        <span class="hide-menu">Gestionar solicitudes</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnobser">
                        <span>
                            <i class="fa-solid fa-eye"></i>
                        </span>
                        <span class="hide-menu">Observaciones</span>
                    </a>
                    <ul id="submenu7" class="submenu" style="display: none;">
                        <li class="submenu-item ">
                            <a href=".." class="submenu-link">
                                <span>
                                    <i class="far fa-eye-slash me-2"></i>
                                </span>
                                <span class="hide-menu">Observaciones generales</span>
                            </a>
                        </li>
                        <li class="submenu-item">
                            <a href=".." class="submenu-link">
                                <span>
                                    <i class="far fa-eye me-2"></i>
                                </span>
                                <span class="hide-menu">Mis observaciones</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnReporte">
                        <span>
                            <i class="fa-solid fa-folder"></i>
                        </span>
                        <span class="hide-menu">Reportes</span>
                    </a>
                    <ul id="submenu8" class="submenu" style="display: none;">
                        <li class="submenu-item">
                            <a href=".." class="submenu-link">
                                <span>
                                    <i class="fa-solid fa-table-list me-2"></i>
                                </span>
                                <span class="hide-menu">Mis solicitudes</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link" href=".." aria-expanded="false">
                        <span>
                            <i class="fa-solid fa-gear"></i>
                        </span>
                        <span class="hide-menu">Configuración</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    var sidebarContainer = document.getElementById("sidebarContainer");
    var sidebarHTML = generarSidebar();
    sidebarContainer.innerHTML = sidebarHTML;

    // Aquí puedes agregar cualquier código JavaScript adicional para manejar la interacción del sidebar
    document.getElementById('btnAdministrar').addEventListener('click', function() {
        var submenu = document.getElementById('submenu');
        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('btnCursos').addEventListener('click', function() {
        var submenu9 = document.getElementById('submenu9');
        submenu9.style.display = submenu9.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('btnPrestamos').addEventListener('click', function() {
        var submenu10 = document.getElementById('submenu10');
        submenu10.style.display = submenu10.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('btnobser').addEventListener('click', function() {
        var submenu7 = document.getElementById('submenu7');
        submenu7.style.display = submenu7.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('btnReporte').addEventListener('click', function() {
        var submenu8 = document.getElementById('submenu8');
        submenu8.style.display = submenu8.style.display === 'none' ? 'block' : 'none';
    });
});
