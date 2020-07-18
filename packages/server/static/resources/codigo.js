let baseUrl = "https://master-surfboards.herokuapp.com";

////ONSEN PAGE START
window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById("appSplitter").right.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById("appTabbar").setActiveTab(index);
  document.getElementById("sidemenu").close();
};

window.fn.loadLink = function (url) {
  window.open(url, "_blank");
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document
      .getElementById("appNavigator")
      .pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document
      .getElementById("appNavigator")
      .pushPage(page.id, { data: { title: page.title } });
  }
};

/// FIN ONSEN  NUEVO
document.addEventListener("init", function (event) {
  var n = document.querySelector("ons-tabbar").getActiveTabIndex();
  if (n === 0) {
    listar();
  }
});

document.addEventListener("show", function (event) {
  var j = document.querySelector("ons-tabbar").getActiveTabIndex();
  if (j === 3) {
    traigoUsuario();
    listarOrdenes1();
  }
  if (j === 2) {
    listarSelect();
  }
});

document.addEventListener("prechange", function (event) {
  document.querySelector(
    "ons-toolbar .center"
  ).innerHTML = event.tabItem.getAttribute("label");

  $("#ex6").slider();
  $("#ex6").on("slide", function (slideEvt) {
    $("#ex6SliderVal").text(slideEvt.value);
  });
  $("#ex7").slider();
  $("#ex7").on("slide", function (slideEvt1) {
    peso = $("#ex7SliderVal").text(slideEvt1.value);
  });
});

////ONSEN PAGE END
let volumen;
let vol;
function calcularVolumen() {
  let peso = $("#ex7")
    .data("slider")
    .getValue();
  let experiencia = $("#experiencia").val();
  let frecuencia = $("#frecuencia").val();
  let wetsuit = $("#wetsuit").val();
  var dividendo = 1.95;

  if (wetsuit == 1) dividendo = dividendo + 0.05;
  if (experiencia == 1) dividendo = dividendo + 0.083;
  if (experiencia == 2) dividendo = dividendo + 0.16;
  if (experiencia == 3) dividendo = dividendo + 0.25;

  if (frecuencia == 1) dividendo = dividendo + 0.083;
  if (frecuencia == 2) dividendo = dividendo + 0.16;
  if (frecuencia == 3) dividendo = dividendo + 0.25;

  volumen = peso / dividendo.toFixed(2);
  vol = volumen.toFixed(2);
  fn.loadView(6);
  listarPorVolumen();
}

let usuario;
function createCustomBoard() {
  let modeloTabla = $("#modeloTablaIndex").val();
  let tecnologia = $("#tecnologia").val();
  let alturaTabla = $("#alturaTabla").val();
  let ancho = $("#ancho").val();
  let grosor = $("#grosor").val();
  let volumen = $("#volumen").val();
  let tipoCola = $("#tipoCola").val();
  let tipoQuillas = $("#tipoQuillas").val();
  let cantQuillas = $("#cantQuillas").val();
  let densidad = $("#densidad").val();
  let carbon = $("#carbon").val();
  let logo = $("#logo").val();
  let nombreCliente = $("#nombreCliente").val();
  let comentario = $("#comentario").val();
  let fecha = hoyFecha();

  if (
    alturaTabla == "" ||
    ancho == "" ||
    grosor == "" ||
    volumen == "" ||
    nombreCliente == ""
  ) {
    ons.notification.alert("Los campos no pueden estar vacios!");
  } else {
    fn.loadView(7);
  }
  let fechaEntrega = moment(fecha)
    .add(15, "days")
    .format("DD/MM/YYYY");
  $("#entrega").empty();
  $("#entrega").append(`Estará disponible desde: ` + fechaEntrega);

  let ubicacion;
  window.form = {
    modeloTabla,
    tecnologia,
    alturaTabla,
    ancho,
    grosor,
    volumen,
    tipoCola,
    tipoQuillas,
    cantQuillas,
    densidad,
    carbon,
    logo,
    nombreCliente,
    comentario,
    fecha,
    fechaEntrega,
    ubicacion,
    usuario
  };
}

function hoyFecha() {
  let hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth() + 1;
  var yyyy = hoy.getFullYear();
  hoy = Date(dd, mm, yyyy);
  return hoy;
}

function crearTabla() {
  if ($("#ubicacionTabla").text().length <= 1) {
    ons.notification.alert("Seleccione una ubicación por favor!");
  } else {
    $.ajax({
      type: "POST",
      url: baseUrl + "/tabla",
      dataType: "JSON",
      data: {
        ...window.form,
        ubicacion: window.ubicacion
      },
      success: mercadoPago,
      error: mostrarError
    });
  }
}

function mercadoPago() {
  window.location.href =
    "https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=72632403-aa64b4c5-32b3-44fb-85d4-21bac1b1e78f";
}

const listarOrdenes1 = () => {
  $.ajax({
    url: baseUrl + "/tabla",
    type: "GET",
    dataType: "json",
    success: listarOrdenesDeCompra,
    error: mostrarError
  });
};

const traigoUsuario = () => {
  $.ajax({
    url: baseUrl + "/tabla",
    type: "GET",
    dataType: "json",
    success: cargoUsuario,
    error: mostrarError
  });
};

const cargoUsuario = resp => {
  usuario = resp.userId;
};
let cargoArray = [];
const listarOrdenesDeCompra = resp => {
  //ajax agarrando el usuario
  $("#divRespuestaOrden").empty();

  resp.tablas.forEach(element => {
    if (usuario == element.usuario) {
      cargoArray.push(element);
    }
  });
  if (cargoArray.length == 0) {
    $("#divRespuestaOrden").append(
      "<h4> Por el momento no tienes ordenes :( </h4>"
    );
  } else {
    cargoArray.forEach(element => {
      $("#divRespuestaOrden").append(
        `<h3> Detalles de la tabla </h3>
                <hr>
                <ul class="list">
                        <li class="list-item list-item--tappable">
                        <div class="list-item__center" data-id="${element._id}" display: inline-block>
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
                        </div>
                        </li>
                </ul>`
      );
    });
  }
};

const listar = () => {
  $.ajax({
    url: baseUrl + "/modelo",
    type: "GET",
    dataType: "json",
    success: listarModelos1,
    error: mostrarError
  });
};

const listarSelect = () => {
  $.ajax({
    url: baseUrl + "/modelo",
    type: "GET",
    dataType: "json",
    success: cargarSelect,
    error: mostrarError
  });
};

const cargarSelect = resp => {
  $("#modeloTablaHomeInvited").empty();
  $("#modeloTablaIndex").empty();
  var select = $("#modeloTablaIndex");
  var select1 = $("#modeloTablaHomeInvited");

  for (let index = 0; index < resp.modelos.length; index++) {
    select.append(
      $("<option><option/>")
        .val(resp.modelos[index].nombre)
        .text(resp.modelos[index].nombre)
    );
  }
  for (let index2 = 0; index2 < resp.modelos.length; index2++) {
    select1.append(
      $("<option><option/>")
        .val(resp.modelos[index2].nombre)
        .text(resp.modelos[index2].nombre)
    );
  }
};

const listarModelos1 = resp => {
  $("#listarModelos").empty();
  resp.modelos.forEach(element => {
    $("#listarModelos").append(
      `<ul class="list">
              <li class="list-item list-item--tappable btnMostrarModelo" data-id="${element._id}">
                 <div class="list-item__center" display: inline-block id="n" data-id="${element._id}">
                    ${element.nombre}
                 </div>  
                <br>
             </li>
             <div class="container" data-id="${element._id}">
                <img src="static/img/masterboard.png" class="responsive">
             </div> 
         </ul>`
    );
  });
  $(".btnMostrarModelo").click(listarModelo);
};

const listarModelo = (e) => {
  let modeloId = $(e.target).attr("data-id");
  $.ajax({
    url: baseUrl + "/modelos/" + modeloId,
    type: "GET",
    dataType: "json",
    success: listarModelosPorId,
    error: mostrarError
  });
};

const listarModelosPorId = resp => {
  fn.loadView(5);
  $("#listarModelosPorId").empty();
  $("#listarModelosPorId").append(
    `<ul class="list">
              <li class="list-item list-item--tappable">
                 <div class="list-item__center" data-id="${resp._id}" display: inline-block>
                     <div class="tabla">
                        <img src="static/img/masterboardV.png" class="responsive1">
                        <h2>${resp.modelos.nombre}</h2>
                        <br>
                        Descripcion: ${resp.modelos.descripcion}
                        <br> 
                        Volumen Desde: ${resp.modelos.volumenDesde}
                        <br> 
                        Volumen Hasta: ${resp.modelos.volumenHasta}
                        <br> 
                    </div>
                 </div>
             </li>
         </ul>`
  );
};

const listarPorVolumen = () => {
  $.ajax({
    url: baseUrl + "/modelo",
    type: "GET",
    dataType: "json",
    success: listarModelosPorVolumen,
    error: mostrarError
  });
};

const listarModelosPorVolumen = resp => {
  $("#divRespuestaVolumen").empty();
  $("#divRespuestaVolumen").append(`<h1> Su volumen es: ` + vol + ` </h1>`);
  let arrayModelo = [];
  resp.modelos.forEach(element => {
    if (element.volumenDesde < vol && vol < element.volumenHasta) {
      arrayModelo.push(element);
    }
  });
  if (arrayModelo.length == 0) {
    $("#divRespuestaVolumen").append(`
            <h5> No se han encontrado modelos adecuados a su volumen :( </h5>`);
  } else {
    arrayModelo.forEach(ele => {
      $("#divRespuestaVolumen").append(`
                <h5> Se recomienda</h5>
                <ul class="list">
                <li class="list-item list-item--tappable btnMostrarModelo" data-id="${ele._id}">
                <div class="list-item__center" display: inline-block id="n" data-id="${ele._id}">
                    ${ele.nombre}
                </div>  
                <br>
            </li>
            <div class="container" data-id="${ele._id}">
                <img src="static/img/masterboard.png" class="responsive">
            </div> 
                </ul>`);
    });
  }
  $(".btnMostrarModelo").click(listarModelo);
};

const buscarModelo1 = () => {
  let modelo = $("#txtModelo1").val();
  $.ajax({
    url: baseUrl + "/modelo",
    type: "GET",
    dataType: "json",
    data: {
      nombre: modelo
    },
    success: mostrarModelo1,
    error: mostrarError
  });
};

const mostrarModelo1 = resp => {
  $("#pAvisos3").empty();
  let modelo = $("#txtModelo1").val();
  resp.modelos.forEach(element => {
    if (modelo == element.nombre) {
      $("#pAvisos3").append(
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
      );
    }
  });
  if ($("#pAvisos3").is(":empty")) {
    $("#pAvisos3").append(`<p> No se ha encontrado el modelo.</p>`);
  }
};

function mostrarError(resp) {
  console.log(resp);
}