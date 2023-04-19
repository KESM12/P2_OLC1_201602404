const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaWhile(_instruccion, _ambito){
    var mensaje = "";
    var operacion = Operacion (_instruccion.expresion, _ambito);
    console.log(operacion, "operacion antes del inicio del while")
    while(operacion.valor === true){
        var nuevoAmbito = new Ambito(_ambito, "While")
        const Bloque = require ("./Bloque");
        var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
        mensaje += ejec.cadena
        console.log(mensaje, "mensaje dentro del while")
        operacion = Operacion (_instruccion.expresion, _ambito);
        console.log(operacion, "operacion fuera del while")
        return {
            cadena: mensaje
        }
        
    }
    
}

module.exports = SentenciaWhile;