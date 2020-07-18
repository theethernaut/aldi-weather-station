const listarRecord = (resp) => {
  $("#data").empty();
  $("#data").append(
    `
    <p>
        Temperatura interna: ${resp.records[0].internal_temp} <br>
        Humedad : ${resp.records[0].humidity}<br>
        Llueve: ${resp.records[0].rain}<br>
        Indice Rayos uv: ${resp.records[0].uv_index}<br>
        Riesgo por rayos uv: ${resp.records[0].uv_risk_level}<br>
        Temperatura externa: ${resp.records[0].external_temp}<br>
    </p>`
                
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
