$(document).ready(function () {
    $("#button-siguiente").click(function () {
        // Verificar si el contenedor ya tiene contenido
        if ($("#contenedor_padre").children().length > 0) {
            // Si ya tiene contenido, vaciarlo antes de agregar nuevo contenido
            $("#contenedor_padre").empty();
        }

        // Agregar más elementos o contenido al contenedor padre
        $("#contenedor_padre").append(`
        <div class="container-fluid">
    <h3 id="titulo_datos" class="text-start">Selecciona el tipo de préstamo a solicitar</h3>
    <br>
    <div class="d-flex flex-column" id="datos_generales">
        <div class="btn-group" role="group" aria-label="Tipo de préstamo">
        <button type="button" class="btn btn-danger me-2" data-toggle="modal" data-target="#exampleModal">Equipo</button>
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modalMaterial">Material</button>
<button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalHerramienta">Herramienta</button>
        </div>
    </div>
    <br>
    <h3 id="titulo_datos" class="text-start">Detalle de los articulos soicitados</h3>
    
    <div class="container mt-5">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="long-text">Cantidad </th>
                        <th>Unidad</th>
                        <th class="long-text">Descripcion</th>
                        <th>Articulo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>Unidad</td>
                        <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                        en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                        Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                        acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                        <td>Taladro</td>
                        <td class="text-center">
                       
                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModal">
                          <i class="fas fa-eye"></i>
                        </button>
                        
  
                        <button type="button" class="btn btn-sm btn-danger">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Unidad</td>
                    <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                    en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                    Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                    acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                    <td>Taladro</td>
                    <td class="text-center">
                       
                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModal">
                      <i class="fas fa-eye"></i>
                    </button>
                    

                    <button type="button" class="btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                    </tr>
                    <!-- Agrega más filas según sea necesario -->
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Listado de equipos disponibles</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label for="programaFormacion" class="form-label">Material a solicitar</label>
                    <select class="form-select mb-3" id="programaFormacion">
                        <option selected>Elige un material</option>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="personaSolicitante" class="form-label">Cantidad a solicitar</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Cantidad a solicitar">
                </div>
            </div>
            <div class="col-md-4" id="descripcion">
                <div class="form-group">
                    <label for="programaFormacion" class="form-label">Unidad</label>
                    <select class="form-select mb-3" id="programaFormacion">
                        <option selected>Unidades</option>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                </div>
            </div>
            <div class="col-md-8" id="descripcion">
                <div class="form-group">
                    <label for="texto" class="form-label">Descripción</label>
                    <textarea class="form-control" id="texto" rows="3"></textarea>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="long-text">Cantidad </th>
                        <th>Unidad</th>
                        <th class="long-text">Descripcion</th>
                        <th>Articulo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>Unidad</td>
                        <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                        en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                        Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                        acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                        <td>Taladro</td>
                        <td class="text-center">
                      </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Unidad</td>
                    <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                    en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                    Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                    acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                    <td>Taladro</td>
                    <td class="text-center">
                  </td>
                    </tr>
                    <!-- Agrega más filas según sea necesario -->
                </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
          <button type="button" class="btn btn-warning">Agregar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Herramienta -->
  <div class="modal fade" id="modalHerramienta" tabindex="-1" role="dialog" aria-labelledby="modalHerramientaLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalHerramientaLabel">Detalle del préstamo de Herramienta</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="equipoSolicitado" class="form-label">Equipo a solicitar</label>
                <select class="form-select mb-3" id="equipoSolicitado">
                  <option selected>Elige un equipo</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="cantidadEquipo" class="form-label">Cantidad a solicitar</label>
                <input type="number" class="form-control" id="cantidadEquipo" placeholder="Cantidad a solicitar">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="unidadEquipo" class="form-label">Unidad</label>
                <select class="form-select mb-3" id="unidadEquipo">
                  <option selected>Unidades</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group">
                <label for="descripcionEquipo" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcionEquipo" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="long-text">Nombre </th>
                        <th>Cantidad</th>
                        <th class="long-text">Descripcion</th>
                        <th>Espacio asignado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nombre</td>
                        <td>Unidad</td>
                        <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                        en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                        Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                        acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                        <td>Taladro</td>
                        <td class="text-center">
                      </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Unidad</td>
                    <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                    en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                    Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                    acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                    <td>Taladro</td>
                    <td class="text-center">
                  </td>
                    </tr>
                    <!-- Agrega más filas según sea necesario -->
                </tbody>
            </table>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
          <button type="button" class="btn btn-primary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal Material -->
  <div class="modal fade" id="modalMaterial" tabindex="-1" role="dialog" aria-labelledby="modalMaterialLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalMaterialLabel">Detalle del préstamo de Material</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="materialSolicitado" class="form-label">MHerramienta a solicitar</label>
                <select class="form-select mb-3" id="materialSolicitado">
                  <option selected>Elige un material</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="cantidadMaterial" class="form-label">Cantidad a solicitar</label>
                <input type="number" class="form-control" id="cantidadMaterial" placeholder="Cantidad a solicitar">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="unidadMaterial" class="form-label">Unidad</label>
                <select class="form-select mb-3" id="unidadMaterial">
                  <option selected>Unidades</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group">
                <label for="descripcionMaterial" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcionMaterial" rows="3"></textarea>
              </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="long-text">Codigo de herramienta </th>
                        <th>Nombre</th>
                        <th class="long-text">Stock</th>
                        <th>En uso</th>
                        <th>Descripcion</th>
                        <th>Institución correspondiente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1WWDS1231</td>
                        <td>Martillo</td>
                        <td>En stock</td>
                        <td class="text-center"> Descripcion </td>
                        <td class="text-center"> Institución correspondiente </td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Unidad</td>
                    <td>Un taladro es una herramienta eléctrica cuyo uso principal, 
                    en sus inicios, es realizar perforaciones en cualquier tipo de material. 
                    Con los avance de las nuevas tecnologías, el taladro se ha convertido en una herramienta que, 
                    acoplando una serie de elementos, te permite lijar, atornillar o afilar.</td>
                    <td>Taladro</td>
                    <td class="text-center">
                  </td>
                    </tr>
                    <!-- Agrega más filas según sea necesario -->
                </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
          <button type="button" class="btn btn-primary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  
    <br>
    <button type="button" class="btn btn-warning" id="button-siguiente">Siguiente</button>
</div>

    

        `);
    });
});