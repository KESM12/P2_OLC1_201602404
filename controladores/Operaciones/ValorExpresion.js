const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");

function ValorExpresion(_expresion,_ambito) {
    //console.log(_expresion, "valorExpresion.")
    if(_expresion.tipo===TIPO_VALOR.DECIMAL){
        return{
            valor: Number(_expresion.valor),
            tipo:TIPO_DATO.DECIMAL,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }else if(_expresion.tipo===TIPO_VALOR.BOOL){
        //console.log(_expresion, "valor expresionaaa")
        return {
            valor: _expresion.valor.toLowerCase()==='true' ? true: false,
            tipo: TIPO_DATO.BOOL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo===TIPO_VALOR.CADENA){
        return {
            valor: _expresion.valor.substring(1,_expresion.valor.length-1),
            tipo: TIPO_DATO.CADENA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo===TIPO_VALOR.ENTERO){
        //console.log(_expresion.tipo, "tipo expresion")
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.ENTERO,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }else if(_expresion.tipo===TIPO_VALOR.CHAR){
        return {
            valor:_expresion.valor.substring(1,_expresion.valor.length-1),
            tipo: TIPO_DATO.CHAR,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }else if(_expresion.tipo===TIPO_VALOR.IDENTIFICADOR){
        //console.log(_expresion, "identificador en valor expresion")
        const simbolo= _ambito.getSimbolo(_expresion.valor) 
        if(simbolo!=null){
            return{
                valor:simbolo.valor,
                tipo:simbolo.tipo,
                linea:simbolo.linea,
                columna:simbolo.columna
            }
        }
        return{  
            valor: "Error: la variable " +_expresion.valor +" no existe Linea: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}

module.exports = ValorExpresion;

