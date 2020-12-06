let idPendorcho = "5f25deec455c843370ac03f6",
  idLaPosta = "5f2d98444da90845f442dc2b",
  idEmir = "5f2d99e54da90845f442dc2c",
  idDesplayado = "5f2d99e54da90845f442dc2e",
  idElBarco = "5f2d99e54da90845f442dc2d",
  idHonda = "5f2d99e54da90845f442dc2f",
  idPocitos = "5f2d99e54da90845f442dc30",
  idCarrasco = "5f2d99e54da90845f442dc31";

function main() {
  //$("#station-suscribe-button").attr("disabled", true);
  $("#ViendoActual").empty();
  $("#ViendoActual").append(`Estas viendo: El Pendorcho`);
  listar();

  // $("#select-de-estacion").change(function () {
  //   $("#station-suscribe-button").removeAttr("disabled");
  // });
}

const listarRecord = (resp) => {
  let lluvia;
  let riesgo;
  let uv = resp.uv_risk_level.toUpperCase();
  if (uv === "LOW") {
    riesgo = "Bajo";
  } else if (uv === "MODERATE") {
    riesgo = "Medio";
  } else {
    riesgo = "Alto";
  }

  if (resp.rain === "true") lluvia = "Está lloviendo";
  if (resp.rain === "false") lluvia = "No está lloviendo";

  $("#data").empty();
  $("#data").append(
    `
    <table class="station-main-div-icons">
      <tr>
        <th>Temepatura</th>
        <th>Humedad</th>
        <th>Tiempo</th>
        <th>Viento</th>
        <th>Rayos UV</th>
      </tr>

      <tr class="station-div-icons">
        <td>
          <img src="../static/img/Termometro.png" class="station-icons">
        </td>
        <td>
          <img src="../static/img/drop.png" class="station-icons">
        </td>
        <td>
          <img id="imagenLluvia" ; src="../static/img/rain.png" class="station-icons">
        </td>
        <td>
          <img src="../static/img/compass.png" class="station-icons">
        </td>
        <td>
          <img src="../static/img/uv.png" class="station-icons">
        </td>
      </tr>

      <tr class="station-div-icons">
        <td>
          <p class="station-texto"> ${resp.external_temp} </p>
        </td>
        <td>
          <p class="station-texto"> ${resp.humidity} </p>
        </td>
        <td>
          <p class="station-texto"> ${lluvia} </p>
        </td>
        <td>
          <p class="station-texto"> Velocidad: ${resp.wind_speed} </p>
          <p class="station-texto"> Dirección: ${resp.wind_direction} </p>
        </td>
        <td>
          <p class="station-texto"> Índice: ${resp.uv_index} </p>
          <p class="station-texto"> Riesgo: ${riesgo} </p>
        </td>
      </tr>
    </table>
    `
  );

  $("imagenLluvia").empty();
  if (resp.rain === "true") {
    lluvia = "Está lloviendo";
    document.getElementById("imagenLluvia").src = "../static/img/rain.png";
  }
  if (resp.rain === "false") {
    lluvia = "No está lloviendo";
    document.getElementById("imagenLluvia").src = "../static/img/sun-vacio.png";
  }
};

const mostrarError = (error) => {
  console.log(error);
};

const listar = () => {
  $.ajax({
    url: "http://3.20.14.136:80/records",
    type: "GET",
    dataType: "json",
    success: listarRecord,
    error: mostrarError,
  });
};

function changeRecords() {
  var Viendo1 = document.getElementById("select-de-estacion").value;
  $("#ViendoActual").empty();
  $("#ViendoActualSuscripcion").empty();
  $("#ViendoActual").append(`Estas viendo: ${Viendo1}`);
  $("#ViendoActualSuscripcion").append(`${Viendo1},`);
  var idRaspi;
  var selectRaspi = document.getElementById("select-de-estacion").value;

  if (selectRaspi === "El Pendorcho") idRaspi = idPendorcho;
  if (selectRaspi === "El Emir") idRaspi = idEmir;
  if (selectRaspi === "La Posta del Cangrejo") idRaspi = idLaPosta;
  if (selectRaspi === "El Barco Hundido") idRaspi = idElBarco;
  if (selectRaspi === "El Desplayado") idRaspi = idDesplayado;
  if (selectRaspi === "La Honda") idRaspi = idHonda;
  if (selectRaspi === "Pocitos") idRaspi = idPocitos;
  if (selectRaspi === "Carrasco") idRaspi = idCarrasco;
  $.ajax({
    url: "http://3.20.14.136:80/records/idRaspi",
    type: "GET",
    dataType: "json",
    data: { idRaspi: idRaspi },
    success: listarRecord,
    error: mostrarError,
  });
}

function suscribe() {
  var selectRaspi = document.getElementById("select-de-estacion").value;
  var data, hour, raspi, active;
  hour = $("#horarios").children("option:selected").val();

  if (selectRaspi === "El Pendorcho") raspi = idPendorcho;
  if (selectRaspi === "El Emir") raspi = idEmir;
  if (selectRaspi === "La Posta del Cangrejo") raspi = idLaPosta;
  if (selectRaspi === "El Barco Hundido") raspi = idElBarco;
  if (selectRaspi === "El Desplayado") raspi = idDesplayado;
  if (selectRaspi === "La Honda") raspi = idHonda;
  if (selectRaspi === "Pocitos") raspi = idPocitos;
  if (selectRaspi === "Carrasco") raspi = idCarrasco;
  active = true;
  data = { hour: hour, raspi: raspi, active: active };
  if (selectRaspi === "") {
    alert("Primero seleccione una zona por favor!");
  } else {
    $.ajax({
      url: "http://3.20.14.136:80/suscriptions",
      data: data,
      type: "POST",
      dataType: "json",
      success: function (data) {
        //  ... do something with the data...
        let activo = data.activo;
        if (activo == "true") {
          activo = "Si";
        } else {
          activo = "No";
        }
        alert(`Usted se ha suscrito con exito!`);
        $("#suscrito").empty();
        $("#suscrito").append(
          `<p class="station-texto"> Suscrito: ${activo} </p>`
        );
      },
      error: mostrarError,
    });
  }
}

main();

