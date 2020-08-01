var stateObject = {
    "Punta del Este": {
        "El Pendorcho":"El Pendorcho",
        "La Posta del Cangrejo":"La Posta del Cangrejo",
        "El Emir":"El Emir"
    },
    "Rocha": {
        "El Barco Hundido":"El Barco Hundido",
        "El Desplayado":"El Desplayado"
    },
    "Montevideo": {
        "La Honda": "La Honda",
        "Pocitos": "Pocitos",
        "Carrasco": "Carrasco"
    }
}
window.onload = function () {
    var stateSel = document.getElementById("stateSel"),
        countySel = document.getElementById("countySel")
    for (var state in stateObject) {
        stateSel.options[stateSel.options.length] = new Option(state, state);
    }
    stateSel.onchange = function () {
        countySel.length = 1; // remove all options bar first
     
        if (this.selectedIndex < 1) {
          countySel.options[0].text = "Primero seleccione la Zona"
          return; // done   
        }  
        countySel.options[0].text = "Primero seleccione la Zona"
        for (var county in stateObject[this.value]) {
            countySel.options[countySel.options.length] = new Option(county, county);
        }
        if (countySel.options.length==2) {
          countySel.selectedIndex=1;
          countySel.onchange();
        }  
        
    }
    stateSel.onchange(); // reset in case page is reloaded
}