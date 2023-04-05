const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const tipoResultado = require("../Enums/TipoResultado");
const ValorExpresion = require("./ValorExpresion");

function Aritmetica(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.ENTERO
        || _expresion.tipo === TIPO_VALOR.DECIMAL
        || _expresion.tipo === TIPO_VALOR.BOOLEANO
        || _expresion.tipo === TIPO_VALOR.CHAR
        || _expresion.tipo === TIPO_VALOR.CADENA
        || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        || _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            return ValorExpresion(_expresion, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(_expresion.opIzquierdo, _expresion.opDerecho, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(_expresion.opIzquierdo, _expresion.opDerecho, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(_expresion.opIzquierdo, _expresion.opDerecho, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(_expresion.opIzquierdo, _expresion.opDerecho, _ambito);
    }else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(_expresion.opIzquierdo, _expresion.opDerecho, _ambito);
    }
}

function suma(_opIzquierdo, _opDerecho, _ambito){
    const resultado = tipoResultado(_opIzquierdo.tipo, _opDerecho.tipo);
    
    const opIzquierdo = Aritmetica(_opIzquierdo, _ambito);
    const opDerecho = Aritmetica(_opDerecho, _ambito);

    if(resultado != null){
        if(resultado === TIPO_DATO.ENTERO
            || resultado === TIPO_DATO.DECIMAL){
                if(opIzquierdo.tipo === TIPO_DATO.BOOLEANO){
                    if(opDerecho.valor === true){
                        const resultadoFinal = 1 + Number(opDerecho.valor);
                        return {
                            valor: resultadoFinal,
                            tipo: resultado,
                            linea: _opIzquierdo.linea,
                            columna: _opIzquierdo.columna,
                        }
                    }else{
                        const resultadoFinal = 0 + Number(opDerecho.valor);
                        return {
                            valor: resultadoFinal,
                            tipo: resultado,
                            linea: _opIzquierdo.linea,
                            columna: _opIzquierdo.columna,
                        }
                    }
                } else if(opDerecho.tipo === TIPO_DATO.BOOLEANO){
                    if(opDerecho.valor === true){
                        const resultadoFinal = Number(opIzquierdo.valor) + 1;
                        return {
                            valor: resultadoFinal,
                            tipo: resultado,
                            linea: _opIzquierdo.linea,
                            columna: _opIzquierdo.columna,
                        }
                    }else{
                        const resultadoFinal = Number(opIzquierdo.valor) + 0;
                        return {
                           valor: resultadoFinal,
                            tipo: resultado,
                            linea: _opIzquierdo.linea,
                            columna: _opIzquierdo.columna,
                            }
                        }
                    }
                }else if(opIzquierdo.tipo === TIPO_DATO.CHAR || opDerecho.tipo === TIPO_DATO.CHAR){
                    if(opIzquierdo===TIPO_DATO.CHAR){
                        const resultadoFinal = Number((opIzquierdo.valor).chrCodeAt(0)) + Number(opDerecho.valor);
                        return {
                            valor: resultadoFinal,
                            tipo: resultado,
                            linea: _opIzquierdo.linea,
                            columna: _opIzquierdo.columna,
                        }
                    }else if (opDerecho.tipo === TIPO_DATO.CHAR){
                        const resultadoFinal = Number(opIzquierdo.valor) + Number((opDerecho.valor).chrCodeAt(0));
                        return {
                            valor: resultadoFinal,
                            tipo: resultado,
                            linea: _opIzquierdo.linea,
                            columna: _opIzquierdo.columna,
                        }
                    }
                }else {
                    const resultadoFinal = Number(opIzquierdo.valor) + Number(opDerecho.valor);
                    return {
                        valor: resultadoFinal,
                        tipo: resultado,
                        linea: _opIzquierdo.linea,
                        columna: _opIzquierdo.columna,
                    }
                }
            if(resultado === TIPO_DATO.CADENA){
                const resultadoFinal = opIzquierdo.valor.toString() + opDerecho.valor.toString();
                return {
                    valor: resultadoFinal,
                    tipo: resultado,
                    linea: _opIzquierdo.linea,
                    columna: _opIzquierdo.columna,
                }
            }
        }
}
    
/*terminar de analizar el resto de las operaciones*/

module.exports = Aritmetica;