const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("../Operaciones/Aritmetica");
const Logica = require("../Operaciones/Logica");
const Relacional = require("../Operaciones/Relacional");
const ValorExpresion = require("../Operaciones/ValorExpresion");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.ENTERO
        || _expresion.tipo === TIPO_VALOR.DECIMAL
        || _expresion.tipo === TIPO_VALOR.BOOLEANO
        || _expresion.tipo === TIPO_VALOR.CHAR
        || _expresion.tipo === TIPO_VALOR.CADENA
        || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        || _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            return ValorExpresion(_expresion, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.SUMA
        || _expresion.tipo === TIPO_OPERACION.RESTA
        || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || _expresion.tipo === TIPO_OPERACION.DIVISION
        || _expresion.tipo === TIPO_OPERACION.MODULO
        || _expresion.tipo === TIPO_OPERACION.UNARIA){
            return Aritmetica(_expresion, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.IGUALDAD
        || _expresion.tipo === TIPO_OPERACION.DIFERENTE
        || _expresion.tipo === TIPO_OPERACION.MAYOR
        || _expresion.tipo === TIPO_OPERACION.MENOR
        || _expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL
        || _expresion.tipo === TIPO_OPERACION.MENOR_IGUAL){
            return Relacional(_expresion, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.AND
        || _expresion.tipo === TIPO_OPERACION.OR
        || _expresion.tipo === TIPO_OPERACION.NOT){
            return Logica(_expresion, _ambito);
    }
}

module.exports = Operacion;