const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")

function Logica(_expresion, _ambito) {
   // console.log(_expresion, "expresion en logica")
    //true || false
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
        return ValorExpresion(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return Relacional(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.OR) {
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.AND){
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.NOT){
        return not(_expresion, _ambito)
    }
    // a<5 || b>10
}

//_expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.NOT


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

function and(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    //console.log(opIzq, opDer, "and")
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BOOL) {
        var resultado = false
        if (opIzq.valor && opDer.valor) {
            resultado = true
        }
        //console.log(resultado, "and")
        return {
            
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    
    
}

function not(_expresion, _ambito) {
    var opDer = Logica(_expresion.opDer, _ambito)
    //console.log(opDer)
    if (opDer.tipo === TIPO_DATO.BOOL) {
        if(opDer.valor === true){
            return {
                valor: false,
                tipo: TIPO_DATO.BOOL,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
        } else{
            return {
            valor: true,
            tipo: TIPO_DATO.BOOL,
            linea: _expresion.linea,
            columna: _expresion.columna

            }
        }
    }
}



module.exports = Logica;

