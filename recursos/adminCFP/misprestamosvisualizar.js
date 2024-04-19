$(document).ready(function() {
    $('#fechaEntrega').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    });

    $('#calendarioBoton').click(function() {
      $('#fechaEntrega').datepicker('show');
    });
  });
  