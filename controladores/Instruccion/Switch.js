const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaSwitch(_instruccion, _ambito) {
    var id = _instruccion.expresion.tipo
    //console.log(_instruccion.expresion)
    //console.log(id)
    
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak = false

    //console.log(operacion)
    //console.log(operacion.valor)

    if (id === "VAL_IDENTIFICADOR") {
        if(_instruccion.lista_case != null){
        for (let i = 0; i < _instruccion.lista_case.length; i++) {
            //console.log(_instruccion.lista_case[i])
            var op = Operacion(_instruccion.lista_case[i].expresion, _ambito)
            //console.log(op)
            if (op.tipo == operacion.tipo) {
                if (op.valor == operacion.valor) {
                    var nuevoAmbito = new Ambito(_ambito)
                    const Bloque = require("./Bloque");
                    var ejec = Bloque(_instruccion.lista_case[i].instruccionesCase, nuevoAmbito)
                    hayBreak = ejec.hayBreak;
                    //console.log(hayBreak)
                    mensaje += ejec.cadena

                    if(hayBreak == true){
                        
                        return {
                            hayBreak: hayBreak,
                            cadena: mensaje
                        }

                    }
                    
                }
            }
            else {
                mensaje += `Error: No es una condicion válida para el switch... Linea: ${_instruccion.lista_case[i].linea} Columna: ${_instruccion.lista_case[i].columna}`
            }
        }

        //console.log(_instruccion.instruccionesDefault)
        
        if(_instruccion.instruccionesDefault != null){
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesDefault, nuevoAmbito)
            hayBreak = ejec.hayBreak;
            mensaje += ejec.cadena

            return {
                hayBreak: hayBreak,
                cadena: mensaje
            }
        }


        }
        else {
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesDefault, nuevoAmbito)
            hayBreak = ejec.hayBreak;
            mensaje += ejec.cadena

            return {
                hayBreak: hayBreak,
                cadena: mensaje
            }
        }
        
    }
    return {
        hayBreak: hayBreak,
        cadena: `Error: No es una condicion válida para el switch... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaSwitch;