const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaElseIf(_instruccion, _ambito){
    var mensaje = "";
    var operacion = Operacion (_instruccion.expresion, _ambito);
    if(operacion.tipo == TIPO_DATO.BOOL){
        if(operacion.valor != null){
            var nuevoAmbito = new Ambito(_ambito, "ElseIf")
            const Bloque = require ("./Bloque");
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += ejec.cadena
            valor = operacion.valor
        }
        return {
            cadena: mensaje,
            valor: valor
        }
    } else {
        return "Error: La expresion no es de tipo booleano linea: " + _instruccion.linea + " columna: " + _instruccion.columna;
    }
}

module.exports = SentenciaElseIf;