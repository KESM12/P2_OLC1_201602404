const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIf(_instruccion,_ambito){
    var mensaje = "";
    var operacion = Operacion(_instruccion.expresion,_ambito);
    var hayBreak = false;
    if(operacion.tipo == TIPO_DATO.BOOL){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito,"If");
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instrucciones,nuevoAmbito);
            hayBreak= ejec.hayBreak;
            mensaje+=ejec.cadena;
        }
        return{
            hayBreak:hayBreak,
            cadena:mensaje
        }

    }
    return {
        hayBreak:hayBreak,
        cadena:`\n Error: No es una expresion de tipo Bool en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}
module.exports = SentenciaIf