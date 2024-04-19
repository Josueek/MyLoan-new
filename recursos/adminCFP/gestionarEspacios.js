
  $(document).ready(function() {
    // Manejar clic en el botón para abrir el modal
    $('#botonusuario').click(function() {
      // Simulando valores de la tabla
      var valoresTabla = {
        nombre: "Nombre de ejemplo",
        apellido: "Apellido de ejemplo",
        telefono: "123456789",
        estadoEmpleado: "Activo",
        fotoEmpleado: "foto.jpg",
        correoElectronico: "ejemplo@correo.com",
        cargo: "Desarrollador",
        especialidad: "Frontend"
      };

      // Mostrar valores en los inputs del formulario
      $('#nombre').val(valoresTabla.nombre);
      // Aquí puedes hacer lo mismo con los demás campos del formulario

      // Mostrar valores en la tabla
      $('#tablaValores').html(`
        <tr>
          <td>${valoresTabla.nombre}</td>
          <td>${valoresTabla.apellido}</td>
          <td>${valoresTabla.telefono}</td>
          <td>${valoresTabla.estadoEmpleado}</td>
          <td>${valoresTabla.fotoEmpleado}</td>
          <td>${valoresTabla.correoElectronico}</td>
          <td>${valoresTabla.cargo}</td>
          <td>${valoresTabla.especialidad}</td>
        </tr>
      `);

      // Abrir el modal
      $('#editarModal').modal('show');
    });

    // Manejar clic en el botón de guardar cambios
    $('#guardarCambiosBtn').click(function() {
      // Aquí puedes agregar la lógica para guardar los cambios del formulario
      // Por ejemplo, puedes obtener los valores del formulario y enviarlos a tu backend mediante AJAX
      // Luego, cierra el modal cuando hayas terminado
      $('#editarModal').modal('hide');
    });
  });


  

  // Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene una referencia al botón que abre el modal
    var botonUsuario = document.getElementById('editarModalBtn');
    
    // Agrega un event listener para el evento 'click' en el botón
    botonUsuario.addEventListener('click', function() {
        // Obtiene una referencia al modal que quieres abrir
        var modalAgregar = new bootstrap.Modal(document.getElementById('agregarModal'));
        
        // Abre el modal
        modalAgregar.show();
    });
});


// Manejar clic en el botón "Cerrar" del segundo modal
$('#cerrarAgregarModalBtn').click(function () {
    $('#agregarModal').modal('hide');
});

// Agregar evento de clic al botón "Cerrar" del segundo modal para verificar si se está detectando correctamente
$('#cerrarAgregarModalBtn').click(function () {
    console.log("Botón 'Cerrar' del segundo modal presionado");
});
