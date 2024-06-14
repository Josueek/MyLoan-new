async function checkSession() {
    try {
        const response = await fetch('../../api/services/sesion_status.php');
        const data = await response.json();

        if (!data.status) {
            window.location.href = '../../vistas/index.html';
        }
    } catch (error) {
        console.error('Error verificando la sesión:', error);
        window.location.href = '../../vistas/index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});
