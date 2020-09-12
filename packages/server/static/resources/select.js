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
    var zonaSelect = document.getElementById("select-de-zona");
    var estacionSelect = document.getElementById("select-de-estacion");

    for (var zona in stateObject) {
        zonaSelect.options[zonaSelect.options.length] = new Option(zona, zona);
    }

    zonaSelect.onchange = function () {
        estacionSelect.length = 1; // remove all options bar first

        if (this.selectedIndex < 1) {
            estacionSelect.options[0].text = "Primero seleccione la Zona"
            return; // done   
        }

        // estacionSelect.options[0].text = "Primero seleccione la Zona"

        for (var estacion in stateObject[this.value]) {
            estacionSelect.options[estacionSelect.options.length] = new Option(estacion, estacion);
        }

        if (estacionSelect.options.length == 2) {
            estacionSelect.selectedIndex = 1;
            estacionSelect.onchange();
        }
    }
    zonaSelect.onchange(); // reset in case page is reloaded
}