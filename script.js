function elegirMejorZona(d1, c1, d2, c2, d3, c3, d4, c4) {

    let mejorZona = 1;
    let mejorDisponible = d1;
    let mejorCapacidad = c1;

    if (d2 > mejorDisponible || (d2 == mejorDisponible && c2 > mejorCapacidad)) {
        mejorZona = 2;
        mejorDisponible = d2;
        mejorCapacidad = c2;
    }

    if (d3 > mejorDisponible || (d3 == mejorDisponible && c3 > mejorCapacidad)) {
        mejorZona = 3;
        mejorDisponible = d3;
        mejorCapacidad = c3;
    }

    if (d4 > mejorDisponible || (d4 == mejorDisponible && c4 > mejorCapacidad)) {
        mejorZona = 4;
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
        return "Zona 3 (puestos 59 al 73 para uso general)";
    }
    else {
        return "Zona 4 (puestos 74 al 82)";
    }
}


function disponiblesZona(numero, d1, d2, d3, d4) {
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


function limpiarRecomendaciones() {
    document.getElementById("recomendacion_2").innerHTML = "";
    document.getElementById("recomendacion_3").innerHTML = "";
    document.getElementById("recomendacion_4").innerHTML = "";
}


function ocultarResultados() {
    document.getElementById("recomendacion").style.display = "none";
    document.getElementById("resultado").style.display = "none";
}


function mostrarResultados() {
    document.getElementById("recomendacion").style.display = "block";
    document.getElementById("resultado").style.display = "block";
}


function consultarDisponibilidad() {

    ocultarResultados();

    let horaTexto = document.getElementById("hora").value;
    let tipoVehiculo = document.getElementById("tipo_vehiculo").value;
    let preferencia = document.getElementById("preferencia").value;

    if (horaTexto == "") {
        alert("Ingrese una hora.");
        return;
    }

    if (tipoVehiculo == "") {
        alert("Seleccione el tipo de vehículo.");
        return;
    }

    if (preferencia == "") {
        alert("Seleccione una preferencia de estacionamiento.");
        return;
    }

    let hora = parseInt(horaTexto);

    if (hora < 0 || hora > 23) {
        alert("La hora debe estar entre 0 y 23.");
        return;
    }

    let nivel;
    let porcentaje;

    if (hora >= 7 && hora < 9) {
        nivel = "Casi lleno";
        porcentaje = 80;
    }
    else if (hora >= 9 && hora < 12) {
        nivel = "Lleno";
        porcentaje = 95;
    }
    else if (hora >= 12 && hora < 14) {
        nivel = "Medio lleno";
        porcentaje = 55;
    }
    else if (hora >= 14 && hora < 18) {
        nivel = "Lleno";
        porcentaje = 95;
    }
    else if (hora >= 18 && hora < 21) {
        nivel = "Medio lleno";
        porcentaje = 55;
    }
    else {
        nivel = "Casi vacío";
        porcentaje = 20;
    }

    let capacidad1 = 18;
    let capacidad2 = 36;
    let capacidad3 = 15;
    let capacidad4 = 9;
    let capacidadAccesible = 4;
    let capacidadMotos = 4;

    let ocupados1 = parseInt(capacidad1 * porcentaje / 100);
    let ocupados2 = parseInt(capacidad2 * porcentaje / 100);
    let ocupados3 = parseInt(capacidad3 * porcentaje / 100);
    let ocupados4 = parseInt(capacidad4 * porcentaje / 100);
    let ocupadosAccesibles = parseInt(capacidadAccesible * porcentaje / 100);
    let ocupadosMotos = parseInt(capacidadMotos * porcentaje / 100);

    let disponibles1 = capacidad1 - ocupados1;
    let disponibles2 = capacidad2 - ocupados2;
    let disponibles3 = capacidad3 - ocupados3;
    let disponibles4 = capacidad4 - ocupados4;
    let disponiblesAccesibles = capacidadAccesible - ocupadosAccesibles;
    let disponiblesMotos = capacidadMotos - ocupadosMotos;

    document.getElementById("hora_resultado").innerHTML = hora + ":00";
    document.getElementById("nivel_resultado").innerHTML = nivel;
    document.getElementById("porcentaje_resultado").innerHTML = porcentaje + "%";

    if (tipoVehiculo == "automovil") {
        document.getElementById("vehiculo_resultado").innerHTML = "Automóvil";
    }
    else {
        document.getElementById("vehiculo_resultado").innerHTML = "Motocicleta";
    }

    if (preferencia == "normal") {
        document.getElementById("preferencia_resultado").innerHTML = "Parqueadero normal";
    }
    else {
        document.getElementById("preferencia_resultado").innerHTML = "Parqueadero accesible";
    }

    limpiarRecomendaciones();

    mostrarResultados();

    /* MOTOCICLETA */

    if (tipoVehiculo == "moto") {
        document.getElementById("zona_1").innerHTML = "No aplica para la consulta de motocicleta.";
        document.getElementById("zona_2").innerHTML = "No aplica para la consulta de motocicleta.";
        document.getElementById("zona_3").innerHTML = "No aplica para la consulta de motocicleta.";
        document.getElementById("zona_4").innerHTML = "No aplica para la consulta de motocicleta.";
        document.getElementById("motos_resultado").innerHTML =
            disponiblesMotos + " espacios estimados disponibles de " + capacidadMotos;
        document.getElementById("total_disponible").innerHTML =
            disponiblesMotos + " de 4 espacios para motos";

        if (preferencia == "accesible") {
            document.getElementById("recomendacion_principal").innerHTML =
                "El plano no identifica espacios accesibles exclusivos para motocicletas. " +
                "La disponibilidad estimada del área de motos es de " + disponiblesMotos + " espacios de 4.";
        }
        else {
            document.getElementById("recomendacion_principal").innerHTML =
                "Te recomendamos ir al área de motocicletas, con aproximadamente " +
                disponiblesMotos + " espacios libres de 4.";
        }

        return;
    }

    /* AUTOMÓVIL - PREFERENCIA ACCESIBLE*/

    if (preferencia == "accesible") {
        document.getElementById("zona_1").innerHTML = "No aplica para esta preferencia.";
        document.getElementById("zona_2").innerHTML = "No aplica para esta preferencia.";
        document.getElementById("zona_3").innerHTML =
            disponiblesAccesibles + " espacios accesibles estimados de " + capacidadAccesible +
            " (puestos 55 al 58).";
        document.getElementById("zona_4").innerHTML = "No aplica para esta preferencia.";
        document.getElementById("motos_resultado").innerHTML = "4 espacios físicos para motocicletas.";
        document.getElementById("total_disponible").innerHTML =
            disponiblesAccesibles + " de 4 espacios accesibles";

        if (disponiblesAccesibles > 0) {
            document.getElementById("recomendacion_principal").innerHTML =
                "Te recomendamos ir a la Zona 3, puestos 55 al 58. " +
                "Se estiman " + disponiblesAccesibles + " espacios accesibles libres de 4.";
        }
        else {
            document.getElementById("recomendacion_principal").innerHTML =
                "No se estiman espacios accesibles libres en los puestos 55 al 58 para esta hora.";
        }

        return;
    }

    /* AUTOMÓVIL - PARQUEADERO NORMAL */

    document.getElementById("zona_1").innerHTML =
        disponibles1 + " espacios generales disponibles de " + capacidad1;
    document.getElementById("zona_2").innerHTML =
        disponibles2 + " espacios generales disponibles de " + capacidad2;
    document.getElementById("zona_3").innerHTML =
        disponibles3 + " espacios generales disponibles de " + capacidad3;
    document.getElementById("zona_4").innerHTML =
        disponibles4 + " espacios generales disponibles de " + capacidad4;
    document.getElementById("motos_resultado").innerHTML = "4 espacios físicos para motocicletas.";

    let totalDisponible = disponibles1 + disponibles2 + disponibles3 + disponibles4;
    document.getElementById("total_disponible").innerHTML =
        totalDisponible + " de 78 espacios generales";

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

    let libresOrden1 = disponiblesZona(orden1, disponibles1, disponibles2, disponibles3, disponibles4);
    let libresOrden2 = disponiblesZona(orden2, disponibles1, disponibles2, disponibles3, disponibles4);
    let libresOrden3 = disponiblesZona(orden3, disponibles1, disponibles2, disponibles3, disponibles4);
    let libresOrden4 = disponiblesZona(orden4, disponibles1, disponibles2, disponibles3, disponibles4);

    document.getElementById("recomendacion_principal").innerHTML =
        "1. Te recomendamos ir primero a " + nombreZona(orden1) +
        ", con aproximadamente " + libresOrden1 + " espacios libres.";

    document.getElementById("recomendacion_2").innerHTML =
        "2. Si no encuentras espacio, prueba " + nombreZona(orden2) +
        ", con aproximadamente " + libresOrden2 + " espacios libres.";

    document.getElementById("recomendacion_3").innerHTML =
        "3. Luego puedes intentar " + nombreZona(orden3) +
        ", con aproximadamente " + libresOrden3 + " espacios libres.";

    document.getElementById("recomendacion_4").innerHTML =
        "4. Como última opción: " + nombreZona(orden4) +
        ", con aproximadamente " + libresOrden4 + " espacios libres.";
}
