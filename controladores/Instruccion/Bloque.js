const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./If");
const SentenciaElse = require("./Else");
const SentenciaElseIf = require("./Elseif");
const SentenciaWhile = require("./While");


function Bloque(_instrucciones,_ambito){
    var cadena=""
    var valorIf = false;
    
    _instrucciones.forEach(instruccion => {
        if(instruccion.tipo===TIPO_INSTRUCCION.PRINT){
           cadena+=Print(instruccion,_ambito) + "\n"
        }else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(instruccion, _ambito)

            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.IF || instruccion.tipo === TIPO_INSTRUCCION.ELSE || instruccion.tipo === TIPO_INSTRUCCION.ELSEIF) {
            //console.log(instruccion, "instruccionbloquezzz")
            if(instruccion.tipo === TIPO_INSTRUCCION.IF){
                var ejec = SentenciaIf(instruccion, _ambito)
                valorIf = ejec.valor
                if(ejec.valor){
                var mensaje = ejec.cadena
                if( mensaje != null){
                    cadena += mensaje
                }
                //console.log(valorIf, "valorIf en el if")
                return valorIf;
            }
        }else if (instruccion.tipo === TIPO_INSTRUCCION.ELSE) {
            if(valorIf === false){
                var ejec = SentenciaElse(instruccion, _ambito)
                var mensaje = ejec.cadena
                if( mensaje != null){
                    cadena += mensaje
                }
            }
        }else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF){
            if(valorIf === false){
                var ejec = SentenciaElseIf(instruccion, _ambito)
                valorIf = ejec.valor
                if(ejec.valor){
                    var mensaje = ejec.cadena
                    if( mensaje != null){
                        cadena += mensaje
                    }
                }
                return valorIf;
            }
        }
    }
    else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
        //console.log(instruccion, "instruccionbloquezzz")
        var ejec = SentenciaSwitch(instruccion, _ambito)
        var mensaje = ejec.cadena
        if( mensaje != null){
            cadena += mensaje
        }
    } else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
        console.log(instruccion, "instruccionbloquezzz")
        var ejec = SentenciaWhile(instruccion, _ambito)
        var mensaje = ejec.cadena
        console.log(mensaje, "mensaje en el bloque")
        if( mensaje != null){
            cadena += mensaje
        }
        
    }
    });
    return {
        cadena: cadena
    }

}
module.exports = Bloque
