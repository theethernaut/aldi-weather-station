const listarRecord = (resp) => {

  $("#data").empty();
  $("#data").append(
    `
    <div
          class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-2"
        >
          <div class="u-gutter-0 u-layout">
            <div class="u-layout-row">
              <div
                class="u-container-style u-layout-cell u-left-cell u-size-12 u-layout-cell-3"
              >
                <div class="u-container-layout u-container-layout-3">
                  <p class="u-align-center u-text-3">
                    <img src="../static/img/sun-vacio.png" style="width:50%; height:50%;">
                  </p>
                  <p class="u-align-center"> ${resp.records[0].external_temp} </p>
                </div>
              </div>
              <div
                class="u-container-style u-layout-cell u-size-12 u-layout-cell-4"
              >
                <div class="u-container-layout u-container-layout-4">
                  <p class="u-align-center u-text u-text-4">
                  <img src="../static/img/drop.png" style="width:50%; height:50%;">
                  </p>
                  <p class="u-align-center "> ${resp.records[0].humidity} </p>
                </div>
              </div>
              <div class="u-align-left u-container-style u-layout-cell u-size-12 u-layout-cell-5">
                <div class="u-container-layout u-container-layout-5">
                  <p class="u-align-center u-text u-text-5">
                  <img src="../static/img/rain.png" style="width:50%; height:50%;">
                  </p>
                 <p class="u-align-center "> ${resp.records[0].rain} </p>
                </div>
              </div>
              <div
                class="u-container-style u-layout-cell u-size-12 u-video-cover u-layout-cell-6"
                data-animation-name=""
                data-animation-duration="0"
                data-animation-delay="0"
                data-animation-direction=""
              >
                <div class="u-container-layout u-container-layout-6">
                  <p class="u-align-center u-text u-text-6">
                  <img src="../static/img/compass.png" style="width:50%; height:50%;">
                  </p>
                  <p class="u-align-center"> ${resp.records[0].wind_direction} </p>
                  <p class="u-align-center"> ${resp.records[0].wind_speed} </p>
                </div>
              </div>
              <div
                class="u-align-left u-container-style u-layout-cell u-right-cell u-size-12 u-layout-cell-7"
              >
                <div class="u-container-layout u-container-layout-7">
                  <p class="u-align-center u-text u-text-7">
                  <img src="../static/img/uv.png" style="width:50%; height:50%;">
                  </p>
                  <p class="u-align-center"> ${resp.records[0].uv_index} </p>
                  <p class="u-align-center"> ${resp.records[0].uv_risk_level} </p>
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
