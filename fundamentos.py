def validar_hora(hora):
    if hora >= 7 and hora < 21:
        return True
    else:
        return False


def determinar_franja(hora):
    if hora >= 7 and hora < 9:
        return "07:00 - 08:59"
    elif hora >= 9 and hora < 11:
        return "09:00 - 10:59"
    elif hora >= 11 and hora < 13:
        return "11:00 - 12:59"
    elif hora >= 13 and hora < 15:
        return "13:00 - 14:59"
    elif hora >= 15 and hora < 17:
        return "15:00 - 16:59"
    elif hora >= 17 and hora < 19:
        return "17:00 - 18:59"
    else:
        return "19:00 - 20:59"


def determinar_porcentaje(hora):
    if hora >= 7 and hora < 9:
        return 70
    elif hora >= 9 and hora < 11:
        return 95
    elif hora >= 11 and hora < 13:
        return 95
    elif hora >= 13 and hora < 15:
        return 70
    elif hora >= 15 and hora < 17:
        return 80
    elif hora >= 17 and hora < 19:
        return 65
    else:
        return 40


def calcular_ocupados(capacidad, porcentaje):
    valor = capacidad * porcentaje / 100
    ocupados = int(valor + 0.5)
    return ocupados


def calcular_disponibles(capacidad, porcentaje):
    ocupados = calcular_ocupados(capacidad, porcentaje)
    disponibles = capacidad - ocupados
    return disponibles


def elegir_mejor_zona(d1, c1, d2, c2, d3, c3, d4, c4):
    mejor_zona = 1
    mejor_disponible = d1
    mejor_capacidad = c1

    if d2 > mejor_disponible or (d2 == mejor_disponible and c2 > mejor_capacidad):
        mejor_zona = 2
        mejor_disponible = d2
        mejor_capacidad = c2

    if d3 > mejor_disponible or (d3 == mejor_disponible and c3 > mejor_capacidad):
        mejor_zona = 3
        mejor_disponible = d3
        mejor_capacidad = c3

    if d4 > mejor_disponible or (d4 == mejor_disponible and c4 > mejor_capacidad):
        mejor_zona = 4

    return mejor_zona


def nombre_zona(numero):
    if numero == 1:
        return "Zona 1 (puestos 1 al 18)"
    elif numero == 2:
        return "Zona 2 (puestos 19 al 54)"
    elif numero == 3:
        return "Zona 3 (puestos 59 al 73 para uso general)"
    else:
        return "Zona 4 (puestos 74 al 82)"


def disponibles_zona(numero, d1, d2, d3, d4):
    if numero == 1:
        return d1
    elif numero == 2:
        return d2
    elif numero == 3:
        return d3
    else:
        return d4


print("========================================")
print("             PUCE PARKING")
print("          PARQUEADERO H - PUCE")
print("========================================")
print()
print("Horario de consulta: 07:00 a 21:00")
print("Los porcentajes de ocupación son simulados.")
print()

hora = int(input("Ingrese una hora entre 7 y 20: "))

print()
print("Tipo de vehículo:")
print("1. Automóvil")
print("2. Motocicleta")
tipo_vehiculo = int(input("Seleccione 1 o 2: "))

print()
print("Preferencia de estacionamiento:")
print("1. Parqueadero normal")
print("2. Parqueadero accesible para personas con discapacidad")
preferencia = int(input("Seleccione 1 o 2: "))

if validar_hora(hora) == False:
    print()
    print("Error: la universidad funciona de 07:00 a 21:00.")
elif tipo_vehiculo != 1 and tipo_vehiculo != 2:
    print()
    print("Error: el tipo de vehículo no es válido.")
elif preferencia != 1 and preferencia != 2:
    print()
    print("Error: la preferencia de estacionamiento no es válida.")
else:
    franja = determinar_franja(hora)
    porcentaje = determinar_porcentaje(hora)

    capacidad_1 = 18
    capacidad_2 = 36
    capacidad_3 = 15
    capacidad_4 = 9
    capacidad_accesible = 4
    capacidad_motos = 4

    disponibles_1 = calcular_disponibles(capacidad_1, porcentaje)
    disponibles_2 = calcular_disponibles(capacidad_2, porcentaje)
    disponibles_3 = calcular_disponibles(capacidad_3, porcentaje)
    disponibles_4 = calcular_disponibles(capacidad_4, porcentaje)

    disponibles_accesibles = calcular_disponibles(
        capacidad_accesible,
        porcentaje
    )

    disponibles_motos = calcular_disponibles(
        capacidad_motos,
        porcentaje
    )

    print()
    print("RESULTADO")
    print("----------------------------------------")
    print("Hora consultada:", hora)
    print("Franja horaria:", franja)
    print("Ocupación simulada:", porcentaje, "%")

    if tipo_vehiculo == 2:
        print("Tipo de vehículo: Motocicleta")

        if preferencia == 2:
            print("Preferencia: Accesible")
            print("El plano no identifica espacios accesibles exclusivos para motocicletas.")

        print()
        print("RECOMENDACIÓN")
        print("Ir al área de motocicletas.")
        print(
            "Disponibilidad estimada:",
            disponibles_motos,
            "de",
            capacidad_motos
        )

    elif preferencia == 2:
        print("Tipo de vehículo: Automóvil")
        print("Preferencia: Accesible")
        print()
        print("RECOMENDACIÓN")
        print("Ir a Zona 3, puestos 55 al 58.")
        print(
            "Disponibilidad estimada:",
            disponibles_accesibles,
            "de",
            capacidad_accesible
        )

    else:
        print("Tipo de vehículo: Automóvil")
        print("Preferencia: Parqueadero normal")
        print()
        print("PLAZAS ESTIMADAS")
        print("Zona 1:", disponibles_1, "de", capacidad_1)
        print("Zona 2:", disponibles_2, "de", capacidad_2)
        print("Zona 3:", disponibles_3, "de", capacidad_3)
        print("Zona 4:", disponibles_4, "de", capacidad_4)

        total_disponible = (
            disponibles_1 +
            disponibles_2 +
            disponibles_3 +
            disponibles_4
        )

        print("Total disponible estimado:", total_disponible, "de 78")
        print()

        temp_1 = disponibles_1
        temp_2 = disponibles_2
        temp_3 = disponibles_3
        temp_4 = disponibles_4

        orden_1 = elegir_mejor_zona(
            temp_1, capacidad_1,
            temp_2, capacidad_2,
            temp_3, capacidad_3,
            temp_4, capacidad_4
        )

        if orden_1 == 1:
            temp_1 = -1
        elif orden_1 == 2:
            temp_2 = -1
        elif orden_1 == 3:
            temp_3 = -1
        else:
            temp_4 = -1

        orden_2 = elegir_mejor_zona(
            temp_1, capacidad_1,
            temp_2, capacidad_2,
            temp_3, capacidad_3,
            temp_4, capacidad_4
        )

        if orden_2 == 1:
            temp_1 = -1
        elif orden_2 == 2:
            temp_2 = -1
        elif orden_2 == 3:
            temp_3 = -1
        else:
            temp_4 = -1

        orden_3 = elegir_mejor_zona(
            temp_1, capacidad_1,
            temp_2, capacidad_2,
            temp_3, capacidad_3,
            temp_4, capacidad_4
        )

        if orden_3 == 1:
            temp_1 = -1
        elif orden_3 == 2:
            temp_2 = -1
        elif orden_3 == 3:
            temp_3 = -1
        else:
            temp_4 = -1

        orden_4 = elegir_mejor_zona(
            temp_1, capacidad_1,
            temp_2, capacidad_2,
            temp_3, capacidad_3,
            temp_4, capacidad_4
        )

        print("RECOMENDACIÓN DE ZONAS")
        print("----------------------------------------")

        print(
            "1.",
            nombre_zona(orden_1),
            "-",
            disponibles_zona(
                orden_1,
                disponibles_1,
                disponibles_2,
                disponibles_3,
                disponibles_4
            ),
            "libres"
        )

        print(
            "2.",
            nombre_zona(orden_2),
            "-",
            disponibles_zona(
                orden_2,
                disponibles_1,
                disponibles_2,
                disponibles_3,
                disponibles_4
            ),
            "libres"
        )

        print(
            "3.",
            nombre_zona(orden_3),
            "-",
            disponibles_zona(
                orden_3,
                disponibles_1,
                disponibles_2,
                disponibles_3,
                disponibles_4
            ),
            "libres"
        )

        print(
            "4.",
            nombre_zona(orden_4),
            "-",
            disponibles_zona(
                orden_4,
                disponibles_1,
                disponibles_2,
                disponibles_3,
                disponibles_4
            ),
            "libres"
        )
