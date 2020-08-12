var stateObject = {
    "Punta del Este": {
        "El Pendorcho": "5f25deec455c843370ac03f6",
        "La Posta del Cangrejo": "5f2d98444da90845f442dc2b",
        "El Emir": "5f2d99e54da90845f442dc2c"
    },
    "Rocha": {
        "El Barco Hundido": "5f2d99e54da90845f442dc2d",
        "El Desplayado": "5f2d99e54da90845f442dc2e"
    },
    "Montevideo": {
        "La Honda": "5f2d99e54da90845f442dc2f",
        "Pocitos": "5f2d99e54da90845f442dc30",
        "Carrasco": "5f2d99e54da90845f442dc31"
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
        if (countySel.options.length == 2) {
            countySel.selectedIndex = 1;
            countySel.onchange();
        }

    }
    stateSel.onchange(); // reset in case page is reloaded
}