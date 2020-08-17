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
    `<div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-2">
      <div class="u-gutter-0 u-layout">
        <div class="u-layout-row">

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-3">
            <div class="u-container-layout u-container-layout-3">
              <p class="u-align-center u-text-3">
                <img src="../static/img/sun-vacio.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> ${resp.external_temp} </p>
            </div>
          </div>

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-4">
            <div class="u-container-layout u-container-layout-4">
              <p class="u-align-center u-text u-text-4">
                <img src="../static/img/drop.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> ${resp.humidity} </p>
            </div>
          </div>

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-5">
            <div class="u-container-layout u-container-layout-5">
              <p class="u-align-center u-text u-text-5">
                <img src="../static/img/rain.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> ${lluvia} </p>
            </div>
          </div>

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-6">
            <div class="u-container-layout u-container-layout-6">
              <p class="u-align-center u-text u-text-6">
                <img src="../static/img/compass.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> ${resp.wind_direction} </p>
              <p class="u-align-center texto"> ${resp.wind_speed} </p>
            </div>
          </div>

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-7">
            <div class="u-container-layout u-container-layout-7">
              <p class="u-align-center u-text u-text-7">
              <img src="../static/img/uv.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> Índice: ${resp.uv_index} </p>
              <p class="u-align-center texto"> Riesgo: ${riesgo} </p>
            </div>
          </div>

        </div>
      </div>
    </div>
    `
  );
};

const mostrarError = (error) => {
  console.log(error);
};

const listar = () => {
  $("#suscribeCheck").attr("disabled", true);
  $.ajax({
    url: "http://3.20.14.136:3000/records",
    type: "GET",
    dataType: "json",
    success: listarRecord,
    error: mostrarError,
  });
};
listar();

let idPendorcho = "5f25deec455c843370ac03f6",
  idLaPosta = "5f2d98444da90845f442dc2b",
  idEmir = "5f2d99e54da90845f442dc2c",
  idDesplayado = "5f2d99e54da90845f442dc2e",
  idElBarco = "5f2d99e54da90845f442dc2d",
  idHonda = "5f2d99e54da90845f442dc2f",
  idPocitos = "5f2d99e54da90845f442dc30",
  idCarrasco = "5f2d99e54da90845f442dc31";

function changeRecords() {
  var idRaspi;
  var selectRaspi = document.getElementById("countySel").value;

  if (selectRaspi === "El Pendorcho") idRaspi = idPendorcho;
  if (selectRaspi === "El Emir") idRaspi = idEmir;
  if (selectRaspi === "La Posta del Cangrejo") idRaspi = idLaPosta;
  if (selectRaspi === "El Barco Hundido") idRaspi = idElBarco;
  if (selectRaspi === "El Desplayado") idRaspi = idDesplayado;
  if (selectRaspi === "La Honda") idRaspi = idHonda;
  if (selectRaspi === "Pocitos") idRaspi = idPocitos;
  if (selectRaspi === "Carrasco") idRaspi = idCarrasco;
  $.ajax({
    url: "http://3.20.14.136:3000/records/idRaspi",
    type: "GET",
    dataType: "json",
    data: { idRaspi: idRaspi },
    success: listarRecord,
    error: mostrarError,
  });
}

$("#countySel").change(function () {
  $("#suscribeCheck").removeAttr("disabled");
});

function suscribe() {
  var data, hour, raspi, active;
  hour = $("#horarios").children("option:selected").val();

  var selectRaspi = document.getElementById("countySel").value;

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
  $.ajax({
    url: "http://3.20.14.136:3000/suscriptions",
    data: data,
    type: "post",
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
        `<p class="u-text u-text-2"> Suscrito: ${activo} </p> `
      );
    },
  });
}
