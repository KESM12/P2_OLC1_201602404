const Ambito = require("../Ambito/Ambito")
const Operacion = require("../Operaciones/Operacion")

function SentenciaFor(_instruccion, _ambito) {
    //console.log(_instruccion, "for")
    var mensaje = ""
    var mensajeC = "";
    var operacion = Operacion(_instruccion.condicion, _ambito);
    for (var i = 1; i <= _instruccion.condicion.opDer.valor; i++) {
        var nuevoAmbito = new Ambito(_ambito, "For");
        const Bloque = require("./Bloque");
        var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito);
        mensaje += ejec.cadena;
        if (ejec.hayBreak) {
            return mensaje
        }
        if (ejec.hayContinue) {
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        //console.log(mensaje, "mensaje dentro del while");
        operacion = Operacion(_instruccion.condicion, _ambito);
        //console.log(operacion, "operacion fuera del while");
    }
    mensajeC += mensaje;
    console.log(mensajeC, "mensajeC");

    return {
        cadena: mensajeC
    };
}

module.exports = SentenciaFor;