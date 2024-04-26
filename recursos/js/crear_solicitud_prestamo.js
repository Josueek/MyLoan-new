$(document).ready(function() {
    $('#fechaEntrega').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    });

    $('#calendarioBoton').click(function() {
      $('#fechaEntrega').datepicker('show');
    });
  });


    document.getElementById("btnAgregarequipo").addEventListener("click", function() {
        // Redirecciona a la página deseada
        window.location.href = "crear_solicitud_prestamousar.html";
    });
