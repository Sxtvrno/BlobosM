$(document).ready(function () {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ObtenerLocalizacion);
    } else {
        swal("Su navegador no soporta la geolocalizacion", "Error", "error");
    }

    function ObtenerLocalizacion(position) {
        // console.log(position.coords.latitude + " - " + position.coords.longitude);

        // "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"

        $.get("https://api.open-meteo.com/v1/forecast?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m", function (data) {
            $("#temperatura").html("Temperatura actual : " + data["current_weather"]["temperature"]+ "°");
        });



    }








   



    $("#btnenviar").click(function (e) {
        if (validar() != "") {
            swal("Error de envio", validar(), "error");
        } else {
            swal("Datos enviados", "En brevedad nos contactaremos con usted", "success");
        }
        e.preventDefault();
    });




});

function validar() {

    var html = "";
    var nombre = $("#txtnombre").val();
    var correo = $("#txtemail").val();
    var ciudad = $("#cbxCiudad").val();
    var Comentario = $("#txtaComentario").val();

    if (($("#rbtnRUT")).is(":not(:checked)") && ($("#rbtnPasaporte")).is(":not(:checked)")) {
        html += "- Debe Seleccionar a lo menos un tipo de identificación \n";
    } else {
        if ($("#txtidentificador").val() == "") {
            html += "- Debe Ingresar numero de identificación \n";
        } else {
            if ($("#rbtnRUT").is(":checked")) {
                if (validarRut($("#txtidentificador").val()) == false) {
                    html += "- Debe Ingresar un RUT Valido \n";
                }
            }
        }
    }
    if (nombre == "") {
        html += "- Debe Ingresar un Nombre \n";
    }
    if (correo == "") {
        html += "- Debe Ingresar un Correo \n";
    }

    if (ciudad == "0") {
        html += "- Debe Seleccionar una Ciudad \n";
    }

    if (Comentario.trim().length < 50) {
        html += "- Debe ingresar un comentario a lo menos de 50 caracteres \n";
    }

    return html;
}














function validarRut(rutCompleto) {
    // Primero eliminamos cualquier caracter que no sea número o k/K
    rutCompleto = rutCompleto.replace("‐", "-");

    // Luego validamos que el formato del RUT sea válido
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;

    // Separamos el número del dígito verificador    
    var tmp = rutCompleto.split('-');
    // Calculamos el dígito verificador esperado
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    // Comparamos el dígito verificador ingresado con el esperado
    return (dv(rut) == digv);
}


