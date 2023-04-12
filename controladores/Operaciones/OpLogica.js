const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")

function Logica(_expresion, _ambito) {
    //true || false
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return Relacional(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR) {
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    // a<5 || b>10
}
function or(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)

    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BOOL) {
        var resultado = false
        if (opIzq.valor || opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    
    
}

module.exports = Logica;

// const TIPO_DATO = require("../Enums/TipoDato");
// const TIPO_OPERACION = require("../Enums/TipoOperacion");
// const TIPO_VALOR = require("../Enums/TipoValor");
// const Relacional = require("./Relacional");
// const ValorExpresion = require("./ValorExpresion");

// function Logica(_expresion, _ambito){
//     if(_expresion.tipo === TIPO_VALOR.ENTERO 
//         || _expresion.tipo === TIPO_VALOR.DECIMAL
//         || _expresion.tipo === TIPO_VALOR.BOOLEANO
//         || _expresion.tipo === TIPO_VALOR.CHAR
//         || _expresion.tipo === TIPO_VALOR.CADENA
//         || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
//         return ValorExpresion(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.IGUALDAD 
//         || _expresion.tipo === TIPO_OPERACION.DIFERENTE
//         || _expresion.tipo === TIPO_OPERACION.MAYOR
//         || _expresion.tipo === TIPO_OPERACION.MENOR
//         || _expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL
//         || _expresion.tipo === TIPO_OPERACION.MENOR_IGUAL){
//         return Relacional(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.OR){
//         return or(_expresion.operadorIzquierdo, _expresion.operadorDerecho, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.AND){
//         return and(_expresion.operadorIzquierdo, _expresion.operadorDerecho, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.NOT){
//         return not(_expresion.operadorIzquierdo, _ambito);
//     }
// }

// function or(_operadorIzquierdo, _operadorDerecho, _ambito){
//     const operadorIzquierdo = Logica(_operadorIzquierdo, _ambito);
//     const operadorDerecho = Logica(_operadorDerecho, _ambito);
//     if(operadorIzquierdo.tipo === operadorDerecho.tipo && operadorIzquierdo.tipo === TIPO_DATO.BOOLEANO){
//         var resultadoFinal = false
//         if(operadorIzquierdo.valor || operadorDerecho.valor){
//             resultadoFinal = true;
//         }
//         return {
//             valor: resultadoFinal,
//             tipo: TIPO_DATO.BOOLEANO,
//             linea: _operadorIzquierdo.linea,
//             columna: _operadorIzquierdo.columna

//         }
//     }
// }

// /*terminar el and y el not*/

// module.exports = Logica;