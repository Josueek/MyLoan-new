function generarPanelLateral() {
    return `
    <!-- Menu lateral -->
    <aside class="left-sidebar">
        <!-- Imagen del sistema -->
        <div>
            <div class="brand-logo d-flex align-items-center justify-content-between" id="imagenlogo">
                <a href="../vistas_admin/inicio.html" class="text-nowrap logo-img">
                    <img src="../../recursos/img/logos/myloan_logo.png" width="180" alt="" />
                </a>
                <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                    <i class="ti ti-x fs-8"></i>
                </div>
            </div>

            <!-- Inicio de los menus-->
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
                    <!-- Menú de administrar -->
                    <li class="sidebar-item">
                        <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnAdministrar">
                            <span>
                                <i class="fa-solid fa-pager"></i>
                            </span>
                            <span class="hide-menu">Administrar</span>
                        </a>

                        <ul id="submenu" class="submenu">
                            <li class="submenu-item d-flex align-items-center">
                                <!-- Icono revisar el w-100 porque abarca todo lo largo lit -->
                                <a href="../vistas_admin/administrar_usuarios.html" class="submenu-link  w-100">
                                    <span>
                                        <i class="fa-solid fa-user me-2"></i>
                                    </span>
                                    <!-- Texto -->
                                    <span class="hide-menu">Usuarios</span>
                                </a>
                            </li>

                            <li class="submenu-item d-flex align-items-center">
                                <!-- Icono -->
                                <a href="../vistas_admin/gestionar_espacios.html" class="submenu-link">
                                    <span>
                                        <i class="ti ti-settings me-2"></i>
                                    </span>
                                    <!-- Texto -->
                                    <span class="hide-menu">Gestionar espacios</span>
                                </a>
                            </li>
                            <!-- Nuevo elemento 1: Gestionar inventario de herramienta -->
                            <li class="submenu-item  d-flex align-items-center">
                                <!--Configurar nombre del archivo-->
                                <a href="../vistas_admin/inventario_herramientas.html" class="submenu-link">
                                    <span>
                                        <i class="ti ti-tool me-2"></i>
                                    </span>
                                    <span class="hide-menu">Gestionar inventario de herramienta</span>
                                </a>
                            </li>
                            <!-- Nuevo elemento 2: Gestionar inventario de equipos -->
                            <li class="submenu-item  d-flex align-items-center">
                                <!--Configurar nombre del archivo-->
                                <a href="../vistas_admin/inventario_equipos.html" class="submenu-link">
                                    <span>
                                        <i class="fas fa-desktop me-2"></i>
                                    </span>
                                    <span class="hide-menu">Gestionar inventario de equipos</span>
                                </a>
                            </li>
                            <!-- Nuevo elemento 3: Inventario de materiales -->
                            <li class="submenu-item  d-flex align-items-center">
                                <!--Configurar nombre del archivo-->
                                <a href="../vistas_admin/inventario_materiales.html" class="submenu-link">
                                    <span>
                                        <i class="ti ti-package  me-2"></i>
                                    </span>
                                    <span class="hide-menu">Inventario de materiales</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- Otros elementos del menú -->
                    <!-- ... -->
                </ul>
            </nav>
            <!-- aca termina el menu lateral -->
        </div>
    </aside>
    `;
}
document.addEventListener("DOMContentLoaded", function() {
    // Llama a esta función para obtener el HTML del panel lateral
    var panelLateralHTML = generarPanelLateral();

    // Inserta este HTML en tu página HTML
    // Por ejemplo, podrías insertarlo dentro de un contenedor con el id "sidebarContainer"
    document.getElementById("sidebarContainer").innerHTML = panelLateralHTML;
});