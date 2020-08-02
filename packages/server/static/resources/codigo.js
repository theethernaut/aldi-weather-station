const listarRecord = (resp) => {
  let lluvia;
  let riesgo;
  if(resp.records[0].uv_risk_level === "LOW") riesgo = "Bajo";
  if(resp.records[0].uv_risk_level === "Medium") riesgo = "Medio";
  if(resp.records[0].uv_risk_level === "High") riesgo = "Alto";
  if(resp.records[0].rain === "true") lluvia = "Está lloviendo";
  if(resp.records[0].rain === "false") lluvia = "No está lloviendo";
  $("#data").empty();
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
              <p class="u-align-center texto"> ${resp.records[0].external_temp} </p>
            </div>
          </div>

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-4">
            <div class="u-container-layout u-container-layout-4">
              <p class="u-align-center u-text u-text-4">
                <img src="../static/img/drop.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> ${resp.records[0].humidity} </p>
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
              <p class="u-align-center texto"> ${resp.records[0].wind_direction} </p>
              <p class="u-align-center texto"> ${resp.records[0].wind_speed} </p>
            </div>
          </div>

          <div class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-7">
            <div class="u-container-layout u-container-layout-7">
              <p class="u-align-center u-text u-text-7">
              <img src="../static/img/uv.png" style="width:50%; height:auto;">
              </p>
              <p class="u-align-center texto"> Índice: ${resp.records[0].uv_index} </p>
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
  $.ajax({
    url: "http://localhost:3000/records",
    type: "GET",
    dataType: "json",
    success: listarRecord,
    error: mostrarError,
  });
};
listar();
/*
El Pendorcho
El Emir
El Desplayado
La Posta del Cangrejo
El Barco Hundido
El Desplayado
La Honda
Pocitos
Carrasco
*/
function changeRecords() {
  let idPendorcho, idEmir, idLaPosta, idDesplayado, idElBarco, idHonda, idPocitos, idCarrasco;
  var idRaspi;
  var selectRaspi = document.getElementsByName("countySel").value;
  if (selectRaspi === "El Pendorcho") idRaspi = idPendorcho;
  if (selectRaspi === "El Emir") idRaspi = idEmir;
  if (selectRaspi === "La Posta del Cangrejo") idRaspi = idLaPosta;
  if (selectRaspi === "El Barco Hundido") idRaspi = idElBarco;
  if (selectRaspi === "El Desplayado") idRaspi = idDesplayado;
  if (selectRaspi === "La Honda") idRaspi = idHonda;
  if (selectRaspi === "Pocitos") idRaspi = idPocitos;
  if (selectRaspi === "Carrasco") idRaspi = idCarrasco;
  $.ajax({
    url: "http://localhost:3000/records?idRaspi="+idRaspi,
    type: "GET",
    dataType: "json",
    data:{},
    success: listarRecord,
    error: mostrarError,
  });
}

function sucribe() {
  var chks = document.getElementsByName("offer");

  if (opts.value == 'Del') {
      for (var i = 0; i <= chks.length - 1; i++) {
          chks[i].disabled = false;
          document.getElementById('div').innerHTML = 'Checkboxes enabled';
      }
  }
  else {
      for (var i = 0; i <= chks.length - 1; i++) {
          chks[i].disabled = true;
          chks[i].checked = false;
          document.getElementById('div').innerHTML = 'Checkboxes disabled and unchecked';
      }
  }
}