const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIfElse(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak=false
    if(operacion.tipo === TIPO_DATO.BOOL){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito, "if");
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesIf, nuevoAmbito);
            hayBreak= ejec.hayBreak;
            mensaje+= ejec.cadena
        }else{
            var nuevoAmbito = new Ambito(_ambito, "else");
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesElse, nuevoAmbito);
            hayBreak= ejec.hayBreak;
            mensaje+= ejec.cadena

        }
        return {
            hayBreak: hayBreak,
            cadena: mensaje
        }
    }
    return {
        hayBreak: hayBreak,
        cadena:  `Error: No es una condicion booleana... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}
module.exports = SentenciaIfElse;
    