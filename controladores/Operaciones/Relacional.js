const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion");

function Relacional(_expresion,_ambito){
    console.log(_expresion, "expresion en relacional")
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR||_expresion.tipo===TIPO_INSTRUCCION.LLAMADA_METODO) {
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.DIVISION
        || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO || _expresion.tipo === TIPO_OPERACION.UNARIA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION||_expresion.tipo === TIPO_OPERACION.NEGACION) 
        {
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL) {
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.MENOR) {
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}
/*/_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
_expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYOR||_expresion.tipo === TIPO_OPERACION.MAYORIGUAL
||_expresion.tipo === TIPO_OPERACION.MENORIGUAL*/

function igualigual(_opIzq, _opDer, _ambito) {
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = false
        if (opIzq.tipo === TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt(0)
            //console.log(opIzq.valor, "izquierdo")
        } else if(opDer.tipo === TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt(0)
            //console.log(opDer.valor, "derecho")
        }
        if (opIzq.valor == opDer.valor) {
            //console.log(opIzq.valor, opDer.valor, "ultimo if")
            resultado = true
        }
        //console.log(resultado)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

function diferente(_opIzq, _opDer, _ambito){
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = true
        if (opIzq.tipo === TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt(0)
            //console.log(opIzq.valor, "izquierdo")
        } else if(opDer.tipo === TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt(0)
            //console.log(opDer.valor, "derecho")
        }
        if (opIzq.valor == opDer.valor) {
           // console.log(opIzq.valor, opDer.valor, "ultimo if")
            resultado = false
        }
        console.log(resultado)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

function menor(_opIzq, _opDer, _ambito){
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = false
        if (opIzq.tipo === TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt(0)
            //console.log(opIzq.valor, "izquierdo")
        } else if(opDer.tipo === TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt(0)
            //console.log(opDer.valor, "derecho")
        }
        if (opIzq.valor < opDer.valor) {
           // console.log(opIzq.valor, opDer.valor, "ultimo if")
            resultado = true
        }
        console.log(resultado)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

function menorigual(_opIzq, _opDer, _ambito){
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = false
        if (opIzq.tipo === TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt(0)
            //console.log(opIzq.valor, "izquierdo")
        } else if(opDer.tipo === TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt(0)
            //console.log(opDer.valor, "derecho")
        }
        if (opIzq.valor <= opDer.valor) {
            //console.log(opIzq.valor, opDer.valor, "ultimo if")
            resultado = true
        }
        //console.log(resultado)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

function mayor(_opIzq, _opDer, _ambito){
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = false
        if (opIzq.tipo === TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt(0)
            //console.log(opIzq.valor, "izquierdo")
        } else if(opDer.tipo === TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt(0)
            //console.log(opDer.valor, "derecho")
        }
        if (opIzq.valor > opDer.valor) {
            //console.log(opIzq.valor, opDer.valor, "ultimo if")
            resultado = true
        }
        //console.log(resultado)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

function mayorigual(_opIzq, _opDer, _ambito){
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    var opIzq = Relacional(_opIzq, _ambito)
    var opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = false
        if (opIzq.tipo === TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt(0)
            //console.log(opIzq.valor, "izquierdo")
        } else if(opDer.tipo === TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt(0)
            //console.log(opDer.valor, "derecho")
        }
        if (opIzq.valor >= opDer.valor) {
           // console.log(opIzq.valor, opDer.valor, "ultimo if")
            resultado = true
        }
        //console.log(resultado)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

module.exports = Relacional;


//terminado pero no se donde poner el operador ternario

// const TIPO_DATO = require("../Enums/TipoDato");
// const TIPO_OPERACION = require("../Enums/TipoOperacion");
// const TIPO_VALOR = require("../Enums/TipoValor");
// const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
// const Aritmetica = require("./Aritmetica");
// const ValorExpresion = require("./ValorExpresion");

// function Relacional(_expresion, _ambito){
//     if(_expresion.tipo === TIPO_VALOR.ENTERO
//         || _expresion.tipo === TIPO_VALOR.DECIMAL
//         || _expresion.tipo === TIPO_VALOR.BOOLEANO
//         || _expresion.tipo === TIPO_VALOR.CHAR
//         || _expresion.tipo === TIPO_VALOR.CADENA
//         || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
//         || _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
//             return ValorExpresion(_expresion, _ambito);
//     }else if(_expresion.tipo === TIPO_OPERACION.SUMA
//         || _expresion.tipo === TIPO_OPERACION.RESTA
//         || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION
//         || _expresion.tipo === TIPO_OPERACION.DIVISION
//         || _expresion.tipo === TIPO_OPERACION.MODULO
//         || _expresion.tipo === TIPO_OPERACION.UNARIA
//         || _expresion.tipo === TIPO_OPERACION.POTENCIA){
//             return Aritmetica(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.IGUALDAD){
//         return igualdad(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.DIFERENTE){
//         return diferente(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
//         return mayor(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.MENOR){
//         return menor(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL){
//         return mayorIgual(_expresion, _ambito);
//     } else if(_expresion.tipo === TIPO_OPERACION.MENOR_IGUAL){
//         return menorIgual(_expresion, _ambito);
//     }   
// }

// function igualdad(_operadorIzquierdo, _operadorDerecho, _ambito){
//     const operadorIzquierdo = Relacional(_operadorIzquierdo, _ambito);
//     const operadorDerecho = Relacional(_operadorDerecho, _ambito);

//     if((operadorIzquierdo.tipo == TIPO_DATO.CADENA && operadorDerecho.tipo == TIPO_DATO.CADENA)
//         || (operadorIzquierdo.tipo == TIPO_DATO.ENTERO && operadorDerecho.tipo == TIPO_DATO.ENTERO)
//         || (operadorIzquierdo.tipo == TIPO_DATO.ENTERO && operadorDerecho.tipo == TIPO_DATO.DECIMAL)
//         || (operadorIzquierdo.tipo == TIPO_DATO.ENTERO && operadorDerecho.tipo == TIPO_DATO.CHAR)
//         || (operadorIzquierdo.tipo == TIPO_DATO.DECIMAL && operadorDerecho.tipo == TIPO_DATO.ENTERO)
//         || (operadorIzquierdo.tipo == TIPO_DATO.CHAR && operadorDerecho.tipo == TIPO_DATO.ENTERO)
//         || (operadorIzquierdo.tipo == TIPO_DATO.CHAR && operadorDerecho.tipo == TIPO_DATO.DECIMAL)
//         || (operadorIzquierdo.tipo == TIPO_DATO.CHAR && operadorDerecho.tipo == TIPO_DATO.CHAR)
//         || (operadorIzquierdo.tipo == TIPO_DATO.DECIMAL && operadorDerecho.tipo == TIPO_DATO.DECIMAL)){
//             var resultadoFinal = false
//             if(operadorIzquierdo.valor == operadorDerecho.valor){
//                 resultadoFinal = true;
//             }
//             return {
//                 valor: resultadoFinal,
//                 tipo: TIPO_DATO.BOOLEANO,
//                 linea: _operadorIzquierdo.linea,
//                 columna: _operadorIzquierdo.columna

//         }
//     }
// }

// module.exports = Relacional;


// /*terminar los relacionales faltantes en el video del aux vamos por el 1:09:00*/