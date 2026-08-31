function determinarFranja(hora) {

    if (hora >= 7 && hora < 9) {
        return "07:00 - 08:59";
    }
    else if (hora >= 9 && hora < 11) {
        return "09:00 - 10:59";
    }
    else if (hora >= 11 && hora < 13) {
        return "11:00 - 12:59";
    }
    else if (hora >= 13 && hora < 15) {
        return "13:00 - 14:59";
    }
    else if (hora >= 15 && hora < 17) {
        return "15:00 - 16:59";
    }
    else if (hora >= 17 && hora < 19) {
        return "17:00 - 18:59";
    }
    else {
        return "19:00 - 20:59";
    }
}

function determinarPorcentaje(hora) {

    if (hora >= 7 && hora < 9) {
        return 70;
    }
    else if (hora >= 9 && hora < 11) {
        return 95;
    }
    else if (hora >= 11 && hora < 13) {
        return 95;
    }
    else if (hora >= 13 && hora < 15) {
        return 70;
    }
    else if (hora >= 15 && hora < 17) {
        return 80;
    }
    else if (hora >= 17 && hora < 19) {
        return 65;
    }
    else {
        return 40;
    }
}

function determinarNivel(porcentaje) {

    if (porcentaje >= 90) {
        return "Lleno";
    }
    else if (porcentaje >= 70) {
        return "Casi lleno";
    }
    else if (porcentaje >= 40) {
        return "Medio lleno";
    }
    else {
        return "Casi vacío";
    }
}

function calcularDisponibles(capacidad, porcentaje) {

    let ocupados = parseInt(capacidad * porcentaje / 100);
    let disponibles = capacidad - ocupados;
    return disponibles;
}

function elegirMejorZona(d1, c1, d2, c2, d3, c3, d4, c4) {

    let mejorZona = 1;
    let mejorDisponible = d1;
    let mejorCapacidad = c1;
    if (d2 > mejorDisponible) {
        mejorZona = 2;
        mejorDisponible = d2;
        mejorCapacidad = c2;
    }
    else if (d2 == mejorDisponible) {
        if (c2 > mejorCapacidad) {
            mejorZona = 2;
            mejorCapacidad = c2;
        }
    }
    if (d3 > mejorDisponible) {
        mejorZona = 3;
        mejorDisponible = d3;
        mejorCapacidad = c3;
    }
    else if (d3 == mejorDisponible) {
        if (c3 > mejorCapacidad) {
            mejorZona = 3;
            mejorCapacidad = c3;
        }
    }
    if (d4 > mejorDisponible) {
        mejorZona = 4;
    }
    else if (d4 == mejorDisponible) {
        if (c4 > mejorCapacidad) {
            mejorZona = 4;
        }
    }
    return mejorZona;
}

function nombreZona(numero) {

    if (numero == 1) {
        return "Zona 1 (puestos 1 al 18)";
    }
    else if (numero == 2) {
        return "Zona 2 (puestos 19 al 54)";
    }
    else if (numero == 3) {
        return "Zona 3 (puestos 59 al 73)";
    }
    else {
        return "Zona 4 (puestos 74 al 82)";
    }
}

function espaciosZona(numero, d1, d2, d3, d4) {

    if (numero == 1) {
        return d1;
    }
    else if (numero == 2) {
        return d2;
    }
    else if (numero == 3) {
        return d3;
    }
    else {
        return d4;
    }
}



function consultarDisponibilidad() {

    let horaTexto = document.getElementById("hora").value;
    let tipoVehiculo = document.getElementById("tipo_vehiculo").value;
    let preferencia = document.getElementById("preferencia").value;
    document.getElementById("recomendacion").style.display = "none";
    document.getElementById("resultado").style.display = "none";
    if (horaTexto == "") {
        alert("Ingrese una hora.");
        return;
    }
    if (tipoVehiculo == "") {
        alert("Seleccione el tipo de vehículo.");
        return;
    }
    if (preferencia == "") {
        alert("Seleccione una preferencia.");
        return;
    }
    let hora = parseInt(horaTexto);
    if (hora < 7) {
        alert("La universidad funciona desde las 07:00.");
        return;
    }
    if (hora >= 21) {
        alert("La universidad funciona hasta las 21:00.");
        return;
    }
    let franja = determinarFranja(hora);
    let porcentaje = determinarPorcentaje(hora);
    let nivel = determinarNivel(porcentaje);
    let capacidad1 = 18;
    let capacidad2 = 36;
    let capacidad3 = 15;
    let capacidad4 = 9;
    let capacidadAccesible = 4;
    let capacidadMotos = 4;
    let disponibles1 = calcularDisponibles(capacidad1, porcentaje);
    let disponibles2 = calcularDisponibles(capacidad2, porcentaje);
    let disponibles3 = calcularDisponibles(capacidad3, porcentaje);
    let disponibles4 = calcularDisponibles(capacidad4, porcentaje);
    let disponiblesAccesibles = calcularDisponibles(
        capacidadAccesible,
        porcentaje
    );

    let disponiblesMotos = calcularDisponibles(
        capacidadMotos,
        porcentaje
    );

    document.getElementById("hora_resultado").innerHTML = hora + ":00";
    document.getElementById("franja_resultado").innerHTML = franja;
    document.getElementById("nivel_resultado").innerHTML = nivel;
    document.getElementById("porcentaje_resultado").innerHTML = porcentaje + "%";
    document.getElementById("porcentaje_resultado_2").innerHTML = porcentaje + "%"
    if (tipoVehiculo == "automovil") {
        document.getElementById("vehiculo_resultado").innerHTML = "Automóvil";
    }
    else {
        document.getElementById("vehiculo_resultado").innerHTML = "Motocicleta";
    }
    if (preferencia == "normal") {
        document.getElementById("preferencia_resultado").innerHTML = "Normal";
    }
    else {
        document.getElementById("preferencia_resultado").innerHTML = "Accesible";
    }
    document.getElementById("recomendacion_2").innerHTML = "";
    document.getElementById("recomendacion_3").innerHTML = "";
    document.getElementById("recomendacion_4").innerHTML = "";
    document.getElementById("recomendacion").style.display = "block";
    document.getElementById("resultado").style.display = "block";

    /* MOTO */

    if (tipoVehiculo == "moto") {

        document.getElementById("zona_1").innerHTML = "No aplica.";
        document.getElementById("zona_2").innerHTML = "No aplica.";
        document.getElementById("zona_3").innerHTML = "No aplica.";
        document.getElementById("zona_4").innerHTML = "No aplica.";
        document.getElementById("motos_resultado").innerHTML =
            disponiblesMotos + " disponibles de 4.";
        document.getElementById("total_disponible").innerHTML =
            disponiblesMotos + " de 4 espacios para motocicletas.";
        if (preferencia == "accesible") {
            document.getElementById("recomendacion_principal").innerHTML =
                "No existen espacios accesibles exclusivos para motocicletas. " +
                "Se estiman " + disponiblesMotos + " espacios disponibles en el área de motos.";
        }
        else {
            document.getElementById("recomendacion_principal").innerHTML =
                "Ir al área de motocicletas. Se estiman " +
                disponiblesMotos + " espacios disponibles.";
        }
        return;
    }

    /* AUTOMÓVIL DISCAPACIDAD */

    if (preferencia == "accesible") {

        document.getElementById("zona_1").innerHTML = "No aplica.";
        document.getElementById("zona_2").innerHTML = "No aplica.";
        document.getElementById("zona_3").innerHTML =
            disponiblesAccesibles + " espacios accesibles disponibles de 4.";
        document.getElementById("zona_4").innerHTML = "No aplica.";
        document.getElementById("motos_resultado").innerHTML = "No aplica.";
        document.getElementById("total_disponible").innerHTML =
            disponiblesAccesibles + " de 4 espacios accesibles.";
        if (disponiblesAccesibles > 0) {
            document.getElementById("recomendacion_principal").innerHTML =
                "Ir a la Zona 3, puestos 55 al 58. " +
                "Se estiman " + disponiblesAccesibles + " espacios accesibles disponibles.";
        }
        else {
            document.getElementById("recomendacion_principal").innerHTML =
                "No se estiman espacios accesibles disponibles para esta hora.";
        }
        return;
    }



    /* AUTOMÓVIL NORMAL */

    document.getElementById("zona_1").innerHTML =
        disponibles1 + " disponibles de " + capacidad1;
    document.getElementById("zona_2").innerHTML =
        disponibles2 + " disponibles de " + capacidad2;
    document.getElementById("zona_3").innerHTML =
        disponibles3 + " disponibles de " + capacidad3;
    document.getElementById("zona_4").innerHTML =
        disponibles4 + " disponibles de " + capacidad4;
    document.getElementById("motos_resultado").innerHTML = "No aplica.";
    let totalDisponible =
        disponibles1 + disponibles2 + disponibles3 + disponibles4;
    document.getElementById("total_disponible").innerHTML =
        totalDisponible + " de 78 espacios generales.";

    let temporal1 = disponibles1;
    let temporal2 = disponibles2;
    let temporal3 = disponibles3;
    let temporal4 = disponibles4;

    let orden1 = elegirMejorZona(

        temporal1, capacidad1,
        temporal2, capacidad2,
        temporal3, capacidad3,
        temporal4, capacidad4
    );
    if (orden1 == 1) {
        temporal1 = -1;
    }
    else if (orden1 == 2) {
        temporal2 = -1;
    }
    else if (orden1 == 3) {
        temporal3 = -1;
    }
    else {
        temporal4 = -1;
    }

    let orden2 = elegirMejorZona(

        temporal1, capacidad1,
        temporal2, capacidad2,
        temporal3, capacidad3,
        temporal4, capacidad4
    );
    if (orden2 == 1) {
        temporal1 = -1;
    }
    else if (orden2 == 2) {
        temporal2 = -1;
    }
    else if (orden2 == 3) {
        temporal3 = -1;
    }
    else {
        temporal4 = -1;
    }

    let orden3 = elegirMejorZona(

        temporal1, capacidad1,
        temporal2, capacidad2,
        temporal3, capacidad3,
        temporal4, capacidad4
    );
    if (orden3 == 1) {
        temporal1 = -1;
    }
    else if (orden3 == 2) {
        temporal2 = -1;
    }
    else if (orden3 == 3) {
        temporal3 = -1;
    }
    else {
        temporal4 = -1;
    }

    let orden4 = elegirMejorZona(
        temporal1, capacidad1,
        temporal2, capacidad2,
        temporal3, capacidad3,
        temporal4, capacidad4
    );

    let libres1 = espaciosZona(

        orden1,
        disponibles1,
        disponibles2,
        disponibles3,
        disponibles4
    );

    let libres2 = espaciosZona(

        orden2,
        disponibles1,
        disponibles2,
        disponibles3,
        disponibles4
    );

    let libres3 = espaciosZona(

        orden3,
        disponibles1,
        disponibles2,
        disponibles3,
        disponibles4
    );

    let libres4 = espaciosZona(

        orden4,
        disponibles1,
        disponibles2,
        disponibles3,
        disponibles4
    );

    document.getElementById("recomendacion_principal").innerHTML =
        "1. Ir primero a " + nombreZona(orden1) +
        ". Aproximadamente " + libres1 + " espacios libres.";

    document.getElementById("recomendacion_2").innerHTML =
        "2. Segunda opción: " + nombreZona(orden2) +
        ". Aproximadamente " + libres2 + " espacios libres.";

    document.getElementById("recomendacion_3").innerHTML =
        "3. Tercera opción: " + nombreZona(orden3) +
        ". Aproximadamente " + libres3 + " espacios libres.";

    document.getElementById("recomendacion_4").innerHTML =
        "4. Última opción: " + nombreZona(orden4) +
        ". Aproximadamente " + libres4 + " espacios libres.";
}

