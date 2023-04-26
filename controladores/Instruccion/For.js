const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operaciones/Operacion");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");
const Incremento = require("./Incremento");
const Decremento = require("./Decremento");

function SentenciaFor(_instruccion, _ambito){  
    //console.log(_instruccion)
    var mensaje = ""
    //console.log(_instruccion)
    //console.log(_instruccion.expresion.tipo)
    if(_instruccion.expresion.tipo == 'DECLARACION'){
        Declaracion(_instruccion.expresion, _ambito)
    }else if(_instruccion.expresion.tipo == 'ASIGNACION'){
        Asignacion(_instruccion.expresion, _ambito)
    }

    //console.log(_instruccion.condicion)
    var operacion = Operacion(_instruccion.condicion, _ambito)
    //console.log(operacion)

    if(operacion.tipo === TIPO_DATO.BANDERA){
        
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec =Bloque(_instruccion.instrucciones, nuevoAmbito)
            //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec.cadena

            if(ejec.hayBreak){
                return mensaje
            }
            //actualizamos
            //console.log(_instruccion.actualizacion)
            if(_instruccion.actualizacion.tipo == 'INCREMENTO'){
                inc = Incremento(_instruccion.actualizacion, _ambito)
            }else if(_instruccion.actualizacion.tipo == 'DECREMENTO'){
                inc = Decremento(_instruccion.actualizacion, _ambito)
            }else if(_instruccion.actualizacion.tipo == 'ASIGNACION'){
                inc = Asignacion(_instruccion.actualizacion, _ambito)
            }
            
            operacion = Operacion(_instruccion.condicion, _ambito)
            //console.log(operacion)
        }
        return mensaje
    }
    return `\n Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    

}

module.exports = SentenciaFor;