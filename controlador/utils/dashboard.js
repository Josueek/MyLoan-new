function generarMenuLateral() {
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
                                <a href="../vistas_admin/administrar_usuarios.html" class="submenu-link  w-100">
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
                                <a href="../vistas_admin/inventario_herramientas.html" class="submenu-link">
                                    <span>
                                        <i class="ti ti-tool me-2"></i>
                                    </span>
                                    <span class="hide-menu">Gestionar inventario de herramienta</span>
                                </a>
                            </li>
                            <li class="submenu-item  d-flex align-items-center">
                                <a href="../vistas_admin/inventario_equipos.html" class="submenu-link">
                                    <span>
                                        <i class="fas fa-desktop me-2"></i>
                                    </span>
                                    <span class="hide-menu">Gestionar inventario de equipos</span>
                                </a>
                            </li>
                            <li class="submenu-item  d-flex align-items-center">
                                <a href="../vistas_admin/inventario_materiales.html" class="submenu-link">
                                    <span>
                                        <i class="ti ti-package  me-2"></i>
                                    </span>
                                    <span class="hide-menu">Inventario de materiales</span>
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
                            <li class="submenu-item">
                                <a href="../vistas_admin/crear_curso.html" class="submenu-link">
                                    <span>
                                        <i class="fa-solid fa-plus me-2"></i>
                                    </span>
                                    <span class="hide-menu">Crear cursos</span>
                                </a>
                            </li>
                            <li class="submenu-item">
                                <a href="../vistas_admin/gestionar_espacios.html" class="submenu-link">
                                    <span>
                                        <i class="fa-solid fa-layer-group"></i>
                                    </span>
                                    <span class="hide-menu">Gestionar espacios</span>
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
                                <a href="../vistas_admin/crear_solicitud_prestamo.html" class="submenu-link">
                                    <span>
                                        <i class="fa-solid fa-plus me-2"></i>
                                    </span>
                                    <span class="hide-menu">Crear solicitud</span>
                                </a>
                            </li>
                        </ul>
                    </li>


                    <li class="sidebar-item">
                        <a class="sidebar-link" href="../vistas_admin/gestionar_solicitudes.html"
                            aria-expanded="false">
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
                                <a href="../vistas_admin/observaciones_generales.html" class="submenu-link">
                                    <span>
                                        <i class="far fa-eye-slash me-2"></i>
                                    </span>
                                    <span class="hide-menu">Observaciones generales</span>
                                </a>
                            </li>
                            <li class="submenu-item">
                                <a href="../vistas_admin/mis_observaciones.html" class="submenu-link">
                                    <span>
                                        <i class="far fa-eye me-2"></i>
                                    </span>
                                    <span class="hide-menu">Mis observaciones</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                      <li class="sidebar-item">
                        <a class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnGrafica">
                            <span>
                                <i class="fa-solid fa-chart-bar"></i>
                            </span>
                            <span class="hide-menu">Gráficas</span>
                        </a>
                        <ul id="submenuGrafica" class="submenu" style="display: none;">
                            <li class="submenu-item">
                                <a href="../vistas_admin/proyecciones.html" class="submenu-link">
                                    <span>
                                        <i class="fa-solid fa-chart-line me-2"></i>
                                    </span>
                                    <span class="hide-menu">Visualizar gráficas</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a  href="../vistas_admin/proyecciones.html" class="sidebar-link" href="javascript:void(0)" aria-expanded="false" id="btnProyeccion">
                            <span>
                                <i class="fa-solid fa-chart-line"></i>
                            </span>
                            <span class="hide-menu">Proyecciones</span>
                        </a>
                        <ul id="submenuProyeccion" class="submenu" style="display: none;">
                            <li class="submenu-item">
                                <a href="path/to/proyecciones.html" class="submenu-link">
                                    <span>
                                        <i class="fa-solid fa-calendar-alt me-2"></i>
                                    </span>
                                    <span class="hide-menu">Analizar proyecciones</span>
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
                                <a href="../../vistas/vistas_admin/reportes.html" class="submenu-link">
                                    <span>
                                        <i class="fa-solid fa-table-list me-2"></i>
                                    </span>
                                    <span class="hide-menu">Generar reportes</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                
                </ul>
            </nav>
            <!-- aca termina el menu lateral -->
        </div>
    </aside>
    `;
}

// Inserta el menú lateral en el contenedor correspondiente en el HTML
document.querySelector('.dashboard').innerHTML = generarMenuLateral();
