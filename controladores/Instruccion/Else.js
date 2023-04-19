const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");
const SentenciaIf = require("./If");

function SentenciaElse(_instruccion, _ambito){
    //var prueba = SentenciaIf(_instruccion, _ambito)
    //console.log(_instruccion, "instruccionelse")
    var mensaje = "";
    var nuevoAmbito = new Ambito(_ambito, "Else")
    const Bloque = require ("./Bloque");
    var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
    //console.log(ejec, "ejecelse")
    mensaje += ejec.cadena
    //console.log(mensaje, "mensaje111")
    return {
        cadena: mensaje
    }
}

module.exports = SentenciaElse;