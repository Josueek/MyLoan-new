var actual = new Date();

function mostrarCalendario(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var primerDiaSemana = (now.getDay() == 0) ? 7 : now.getDay();
    var ultimoDiaMes = last.getDate();
    var dia = 0;
    var resultado = "<tr bgcolor='black'>";
    var diaActual = 0;
    var last_cell = primerDiaSemana + ultimoDiaMes;
    
    // hacemos un bucle hasta 42 
    //de  6 columnas y de 7 días
    for (var i = 1; i <= 42; i++) {
        if (i == primerDiaSemana) {
            // determinamos en que día empieza
            dia = 1;
        }
        if (i < primerDiaSemana || i >= last_cell) {
            // celda vacía
            resultado += "<td>&nbsp;</td>";
        } else {
            // mostramos el día
            if (dia == actual.getDate() && month == actual.getMonth() + 1 && year == actual.getFullYear())
                resultado += "<td class='hoy'>" + dia + "</td>";
            else
                resultado += "<td>" + dia + "</td>";
            dia++;
        }
        if (i % 7 == 0) {
            if (dia > ultimoDiaMes)
                break;
            resultado += "</tr><tr>\n";
        }
    }
    resultado += "</tr>";

    var meses = Array("Enero", "Febrero", "Marzo", "Abril", "Mayo",
        "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
        "Diciembre");

    // Calculamos el siguiente mes y año
    // Calculamos el siguiente mes y año
var nextMonth = month + 1;
var nextYear = year;

if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
}

    // Calculamos el anterior mes y año
    var prevMonth = month - 1;
    var prevYear = year;

    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    document.getElementById("calendar").getElementsByTagName("caption")[0].innerHTML = "<div>" + meses[month - 1] + " / " + year + "</div><div><a onclick=\"mostrarCalendario('" + prevYear + "','" + prevMonth + "')\">&lt;</a><a onclick=\"mostrarCalendario('" + nextYear + "','" + nextMonth + "')\">&gt;</a></div>";

    document.getElementById("calendar").getElementsByTagName("tbody")[0].innerHTML = resultado;
}

mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);
