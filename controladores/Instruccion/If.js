const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIf(_instruccion, _ambito){
    var mensaje = "";
    var operacion = Operacion (_instruccion.expresion, _ambito);
    if(operacion.tipo == TIPO_DATO.BOOL){
        //console.log(operacion.valor, "valor de la operacion")
        if(operacion.valor != null){
           //console.log("entro al if ya despues", operacion.valor)
            var nuevoAmbito = new Ambito(_ambito, "If")
            const Bloque = require ("./Bloque");
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            //console.log(ejec, "ejeadsfadfc")
            mensaje += ejec.cadena
            //console.log(mensaje, "mensaje111")
        }
        return {
            cadena: mensaje,
        }
    } else {
        return "Error: La expresion no es de tipo booleano linea: " + _instruccion.linea + " columna: " + _instruccion.columna;
    }
}

module.exports = SentenciaIf;



// //este ya esta :v
