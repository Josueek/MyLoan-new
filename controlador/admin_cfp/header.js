function generarHeader(titulo, userData) {
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
                    <li class="nav-item dropdown">
                        <!-- foto de perfil -->
                        <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <!-- Aca va la foto del usuario-->
                            <img src="${userData ? '../../api/images/perfil/' + userData.imagen : '../../recursos/img/profile/user-1.jpg'}" alt="" width="35" height="35"
                                class="rounded-circle">
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                            aria-labelledby="drop2">
                            <div class="message-body">
                                <!-- Link de la pantalla de mi perfil-->
                                <a href="miperfil.html"
                                    class="d-flex align-items-center gap-2 dropdown-item">
                                    <i class="fa-regular fa-user"></i>
                                    <p class="mb-0 fs-3">Mi perfil</p>
                                </a>
                                  <a href="documentacion.html"
                                    class="d-flex align-items-center gap-2 dropdown-item">
                                   <i class="fa-regular fa-file"></i>
                                    <p class="mb-0 fs-3">Documentación</p>
                                </a>
                                <!-- Link para cerrar sesión-->
                                <a href="../../api/services/cerrar_sesion.php" class="btn btn-outline-primary mx-3 mt-2 d-block">Cerrar sesión</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <!--Esto cambia acorde al usuario en la base-->
                        <div class="user-details ms-2 d-none d-sm-block">
                            <div class="user-name fs-3 fw-bold">${userData ? userData.nombre : 'Usuario'}</div>
                            <div class="user-role fs-3 fw-bold">${userData ? userData.cargo : 'Rol'}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!--  Aca termina la parte del menu y el header -->
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    var titulo = document.getElementById("headerContainer").getAttribute("data-title");

    fetch('../../api/services/header_services.php')
        .then(response => response.json())
        .then(data => {
            var headerHTML = generarHeader(titulo, data.status === 1 ? data.user : null);
            document.getElementById("headerContainer").innerHTML = headerHTML;

            // Agregar eventos de clic para el menú de hamburguesa y el botón de cierre
            var headerCollapse = document.getElementById("headerCollapse");
            var sidebarCollapse = document.getElementById("sidebarCollapse");
            var sidebar = document.querySelector('.left-sidebar');

            headerCollapse.addEventListener('click', function () {
                sidebar.classList.toggle('show');
            });

            sidebarCollapse.addEventListener('click', function () {
                sidebar.classList.remove('show');
            });
        })
        .catch(error => console.error('Error al obtener los datos del usuario:', error));
});
