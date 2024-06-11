function generarHeader(titulo) {
    return `
    <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-light">
            <li class="nav-item d-block d-xl-none ms-3">
                <!-- Este es el menu de hamburguesa-->
                <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
                    <i class="ti ti-menu-2 fs-8"></i>
                </a>
            </li>
            <ul class="navbar-nav">
                <!-- Texto principal cambiar acorde la pantalla -->
                <div class="container">
                    <span class="fs-6 fs-lg-4 fw-bold">${titulo}</span>
                </div>
            </ul>
            <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
                <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                    <!-- esta es la campana de notificaciones-->
                    <li class="nav-item">
                        <!-- Moviendo la campana a la derecha usando ml-auto -->
                        <a href="" target="_blank" class="nav-link nav-icon-hover ml-auto">
                            <i class="fa-regular fa-bell"></i>
                            <div class="notification bg-primary rounded-circle"></div>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <!-- foto de perfil -->
                        <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <!-- Aca va la foto del usuario-->
                            <img src="../../recursos/img/profile/user-1.jpg" alt="" width="35" height="35"
                                class="rounded-circle">
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                            aria-labelledby="drop2">
                            <div class="message-body">
                                <!-- Link de la pantalla de mi perfil-->
                                <a href="javascript:void(0)"
                                    class="d-flex align-items-center gap-2 dropdown-item">
                                    <i class="fa-regular fa-user"></i>
                                    <p class="mb-0 fs-3">Mi perfil</p>
                                </a>
                                <a href="javascript:void(0)"
                                    class="d-flex align-items-center gap-2 dropdown-item">
                                    <i class="fa-regular fa-envelope"></i>
                                    <p class="mb-0 fs-3">Mi cuenta</p>
                                </a>
                                <a href="javascript:void(0)"
                                    class="d-flex align-items-center gap-2 dropdown-item">
                                    <i class="fa-solid fa-list"></i>
                                    <p class="mb-0 fs-3">Mis tareas</p>
                                </a>
                                <!-- Link para volver al login-->
                                <a href=".." class="btn btn-outline-primary mx-3 mt-2 d-block">Cerrar sesión</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <!--Esto cambia acorde al usuario en la base-->
                        <div class="user-details ms-2 d-none d-sm-block">
                            <div class="user-name fs-3 fw-bold">Brandon</div>
                            <div class="user-role fs-3 fw-bold">Administrador</div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!--  Aca termina la parte del menu y el header -->
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    // Obtén el título de la página de alguna manera
    // Por ejemplo, podrías tener un data attribute en el contenedor del header
    var titulo = document.getElementById("headerContainer").getAttribute("data-title");

    // Llama a esta función para obtener el HTML del header
    var headerHTML = generarHeader(titulo);

    // Inserta este HTML en tu página HTML
    document.getElementById("headerContainer").innerHTML = headerHTML;
});
