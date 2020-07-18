let baseURL = "https://master-surfboards.herokuapp.com/modelo";
let idModelo;
let modelosList;

window.fn = {};

window.fn.open = function () {
  let menu = $("#menu")[0];
  menu.open();
};

window.fn.load = function (page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

const crearModelo = () => {
  let nombre = $("#txtNombre").val();
  let descripcion = $("#txtDescripcion").val();
  let volumenDesde = $("#txtVolumenDesde").val();
  let volumenHasta = $("#txtVolumenHasta").val();
  $.ajax({
    url: baseURL,
    type: "POST",
    dataType: "json",
    data: { nombre, descripcion, volumenDesde, volumenHasta },
    success: modeloCreado,
    error: mostrarError
  });
};

const modeloCreado = (resp) => {
  $("#pAvisos").html(`<br> Se ingreso correctamente el modelo: ${resp.nombre}.`);
  listar();
};

const listarModelos = (resp) => {
  $("#dListar").empty();
  resp.modelos.forEach(element => {
    $("#dListar").append(
      `<ul class="list">
            <li class="list-item list-item--tappable">
               <div class="list-item__center" data-id="${element._id}" display: inline-block id ="n">
                   Nombre: ${element.nombre}<br>
                   Descripcion: ${element.descripcion}<br>                    
                   Volumen desde: ${element.volumenDesde}<br>
                   Volumen hasta: ${element.volumenHasta}<br>
                   <br>
                   <ons-icon fixed-width class="list-item__icon btnUpdate right" icon="fa-edit" size="large" data-id="${element._id}"></ons-icon>
                   <ons-icon fixed-width class="list-item__icon btnDelete right" icon="fa-trash" size="large" data-id="${element._id}"></ons-icon>
               </div>
           </li>
       </ul>`
    )
  });
  modelosList = resp.modelos;
  $(".btnUpdate").click(cargarModelo);
  $(".btnDelete").click(eliminarModelo);
};

const eliminarModelo = (e) => {
  let idModelo = $(e.target).attr("data-id");
  $.ajax({
    url: baseURL + `s/` + idModelo,
    type: "DELETE",
    dataType: "json",
    success: listar,
    error: mostrarError
  });
};

const modificarModelo = () => {
  let nombre = $("#txtNombre1").val();
  let descripcion = $("#txtDescripcion1").val();
  let volumenDesde = $("#txtVolumenDesde1").val();
  let volumenHasta = $("#txtVolumenHasta1").val();
  $.ajax({
    url: baseURL + `s/` + idModelo,
    type: "PUT",
    dataType: "json",
    data: { nombre, descripcion, volumenDesde, volumenHasta },
    success: updateModelo,
    error: mostrarError
  });
};

const listar = () => {
  $.ajax({
    url: baseURL,
    type: "GET",
    dataType: "json",
    success: listarModelos,
    error: mostrarError
  });
};

const cargarModelo = (e) => {
  idModelo = $(e.target).attr("data-id");
  $("#content")[0].load("modificar.html");
};

const updateModelo = (resp) => {
  $("#pAvisos1").html(`<br> Se modifico correctamente el modelo: ${resp.nombre}`);
  listar();
};

const mostrarModelo = (resp) => {
  $("#pAvisos2").empty();
  let modelo = $("#txtModelo1").val();
  resp.modelos.forEach(element => {
    if (modelo == element.nombre) {
      $("#pAvisos2").append(
        `<ul class="list">
            <li class="list-item list-item--tappable">
                <div class="list-item__center" data-id="${element._id}" display: inline-block id="n">
                    Nombre: ${element.nombre}<br>
                    Descripcion: ${element.descripcion}<br>
                    Volumen desde: ${element.volumenDesde}<br>
                    Volumen hasta: ${element.volumenHasta}<br>
                </div>
            </li>
        </ul>`
      )
    }
  })
  if ($('#pAvisos2').is(':empty')) {
    $("#pAvisos2").append(
      `<p> No se ha encontrado el modelo.</p>`
    )
  }
};

const buscarModelo = () => {
  let modelo = $("#txtModelo1").val();
  $.ajax({
    url: baseURL,
    type: "GET",
    dataType: "json",
    data: {
      nombre: modelo
    },
    success: mostrarModelo,
    error: mostrarError
  });
};

const listarOrdenes = () => {
  $.ajax({
    url: baseUrl,
    type: "GET",
    dataType: "json",
    success: listarOrdenesDeCompra,
    error: mostrarError
  });
};

const listarOrdenesDeCompra = (resp) => {
  $("#dListarOrdenes").empty();
  resp.tablas.forEach(element => {
    $("#dListarOrdenes").append(
      `<h3> Detalles de la tabla </h3>
       <hr>
      <ul class="list">
            <li class="list-item list-item--tappable">
               <div class="list-item__center" data-id="${element._id}" display: inline-block id="n">
                   Nombre modelo: ${element.modeloTabla}
                   <br>
                   Tecnologia: ${element.tecnologia}
                   <br>
                   Altura: ${element.alturaTabla}
                   <br>
                   Ancho: ${element.ancho}
                   <br>
                   Grosor: ${element.grosor}
                   <br>
                   Volumen: ${element.volumen}
                   <br>
                   Tipo de cola: ${element.tipoCola}
                   <br>
                   Tipo de quillas: ${element.tipoQuillas}
                   <br>
                   Cantidad de quillas: ${element.cantQuillas}
                   <br>   
                   Densidad: ${element.densidad}
                   <br>
                   Carbon: ${element.carbon}
                   <br>
                   Logo: ${element.logo}
                   <br>
                   Nombre del cliente: ${element.nombreCliente}
                   <br>
                   Comentario: ${element.comentario}
                   <br>
                   Fecha de solicitud: ${element.fecha}
                   <br>
                   Fecha de entrega: ${element.fechaEntrega}
                   <br>
                   Ubicacion: ${element.ubicacion}
                   <br> 
                   <ons-icon fixed-width class="list-item__icon btnDeleteOrden right" icon="fa-trash" size="large" data-id="${element._id}"></ons-icon>  
              </div>
            </li>
       </ul>`
    )
  });
  $(".btnDeleteOrden").click(eliminarOrden);
};

const eliminarOrden = (e) => {
  let idOrden = $(e.target).attr("data-id");
  $.ajax({
    url: "http://localhost:8080/tablas/" + idOrden,
    type: "DELETE",
    dataType: "json",
    success: listarOrdenes,
    error: mostrarError
  });
};

document.addEventListener("init", (evt) => {
  let pagina = evt.target.id;
  switch (pagina) {
    case "ordenes":
      $("dListarOrdenes").append(listarOrdenes());
      break;
    case "crear":
      $("#btnCrear").click(crearModelo);
      break;
    case "modificar":
      let nombre;
      let descripcion;
      let volumenDesde;
      let volumenHasta;
      for (let index = 0; index < modelosList.length; index++) {
        if (modelosList[index]._id == idModelo) {
          nombre = modelosList[index].nombre;
          descripcion = modelosList[index].descripcion;
          volumenDesde = modelosList[index].volumenDesde;
          volumenHasta = modelosList[index].volumenHasta;
        }
      }
      $("#txtNombre1").val(nombre);
      $("#txtDescripcion1").val(descripcion);
      $("#txtVolumenDesde1").val(volumenDesde);
      $("#txtVolumenHasta1").val(volumenHasta);
      $("#btnModificar").click(modificarModelo);
      break;
    case "listar":
      $("dListar").append(listar());
      break;
    case "busqueda":
      $("#btnBuscarModelo").click(buscarModelo);
      break;
  }
});

const mostrarError = (error) => {
  console.log(error);
};