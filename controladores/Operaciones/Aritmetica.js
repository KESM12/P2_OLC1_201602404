
const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")

function Aritmetica(_expresion, _ambito){
    //2+3+5+6+8+9
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.VECTOR || _expresion.tipo === TIPO_VALOR.LISTA){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){// 2+6+7+2+9+10
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.RESTA){// 2+6+7+2+9+10
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.NEGACION){
        return negacion(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.INC){
        return incremento(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DEC){
        return decremento(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TOUPPER){
        return toupper(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TOLOWER){
        return tolower(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LENGTH){
        return length(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TRUNCATE){
        return truncate(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.ROUND){
        return round(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TYPEOF){
        return typeoffuncion(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TOSTRING){
        return tostringfuncion(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR){
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.AND){
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.NOT){
        return not(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function suma(_opIzq, _opDer, _ambito){ 
    //console.log(_opIzq)
    //console.log(_opDer)
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)

    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) + Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) + Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.CADENA){
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion suma... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) - Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) - Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion resta... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function multiplicacion(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    //console.log(_opIzq.valor)
    //console.log(_opDer.valor)
    if(tipoRes!=null && _opIzq.valor!="true" && _opIzq.valor!="false" && _opDer.valor != "true" && _opDer.valor != "false"){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) * Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) * Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion multiplicacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function division(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    //console.log(_opIzq.valor)
    //console.log(_opDer.valor)
    if(tipoRes!=null && _opIzq.valor!="true" && _opIzq.valor!="false" && _opDer.valor != "true" && _opDer.valor != "false" &&  _opDer.valor !=0){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) / Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor
            num2 = opDer.valor

            split1 = String(_opIzq.valor).split("\'")

            if(split1.length > 1){
                num1 = split1[1].charCodeAt(0)
            }

            split1 = String(_opDer.valor).split("\'")

            if(split1.length > 1){
                num2 = split1[1].charCodeAt(0)
            }

            const resultado = Number(num1) / Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion division... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function potencia(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    //console.log(_opIzq.valor)
    //console.log(_opDer.valor)
    num1 = opIzq.valor
    num2 = opDer.valor

    split1 = String(_opIzq.valor).split("\'")

    split2 = String(_opDer.valor).split("\'")


    if(tipoRes!=null && _opIzq.valor!="true" && _opIzq.valor!="false" && _opDer.valor != "true" && _opDer.valor != "false" && split1.length <= 1 && split2.length <=1 ){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor
            num2 = opDer.valor

            const resultado = Math.pow(Number(num1), Number(num2));

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor
            num2 = opDer.valor

            const resultado = Math.pow(Number(num1), Number(num2));

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion potencia... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function modulo(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    //console.log(_opIzq.valor)
    //console.log(_opDer.valor)
    num1 = opIzq.valor
    num2 = opDer.valor

    split1 = String(_opIzq.valor).split("\'")

    split2 = String(_opDer.valor).split("\'")


    if(tipoRes!=null && _opIzq.valor!="true" && _opIzq.valor!="false" && _opDer.valor != "true" && _opDer.valor != "false" && split1.length <= 1 && split2.length <=1 ){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor
            num2 = opDer.valor

            const resultado = Number(num1) % Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor
            num2 = opDer.valor

            const resultado = Number(num1) % Number(num2);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion potencia... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function negacion(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor

            const resultado = Number(num1) * (-1);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor

            const resultado = Number(num1) * (-1);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion negacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function incremento(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    if(_opIzq.tipo == 'VAL_IDENTIFICADOR'){
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor

            const resultado = Number(num1)  + 1;

            const existe = _ambito.existeSimbolo(_opIzq.valor)

            if(existe){
            //var valor = Operacion(_instruccion.expresion, _ambito)
            var simbolo = _ambito.getSimbolo(_opIzq.valor)

            simbolo.valor = resultado
            _ambito.actualizar(_opIzq.valor,simbolo)

            }
            
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor

            const resultado = Number(num1)  + 1;

            const existe = _ambito.existeSimbolo(_opIzq.valor)

            if(existe){
            //var valor = Operacion(_instruccion.expresion, _ambito)
            var simbolo = _ambito.getSimbolo(_opIzq.valor)

            simbolo.valor = resultado
            _ambito.actualizar(_opIzq.valor,simbolo)

            }

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion de incremento... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function decremento(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    if(_opIzq.tipo == 'VAL_IDENTIFICADOR'){
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor

            const resultado = Number(num1)  - 1;

            const existe = _ambito.existeSimbolo(_opIzq.valor)

            if(existe){
            //var valor = Operacion(_instruccion.expresion, _ambito)
            var simbolo = _ambito.getSimbolo(_opIzq.valor)

            simbolo.valor = resultado
            _ambito.actualizar(_opIzq.valor,simbolo)

            }
            
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.ENTERO){

            num1 = opIzq.valor

            const resultado = Number(num1)  - 1;

            const existe = _ambito.existeSimbolo(_opIzq.valor)

            if(existe){
            //var valor = Operacion(_instruccion.expresion, _ambito)
            var simbolo = _ambito.getSimbolo(_opIzq.valor)

            simbolo.valor = resultado
            _ambito.actualizar(_opIzq.valor,simbolo)

            }

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion de incremento... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function toupper(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.CADENA){

            str1 = opIzq.valor

            const resultado = str1.toUpperCase();

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion toupper... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function tolower(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.CADENA){

            str1 = opIzq.valor

            const resultado = str1.toLowerCase();

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion toupper... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function length(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(opIzq.valor)
    //console.log(_opDer)
    if(Array.isArray(opIzq.valor)){
        const resultado = opIzq.valor.length;

            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    
    }
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.CADENA){

            str1 = opIzq.valor

            const resultado = str1.length;

            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion length... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function truncate(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO || tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor

            const resultado = Math.trunc(Number(num1));

            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion truncate... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function round(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO || tipoRes === TIPO_DATO.DECIMAL){

            num1 = opIzq.valor

            const resultado = Math.round(Number(num1));

            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion round... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function typeoffuncion(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){

            if(tipoRes == 'ENTERO'){
                var resultado = "int";
            }else if(tipoRes == 'DECIMAL'){
                var resultado = "double";
            }else if(tipoRes == 'BANDERA'){
                var resultado = "boolean";
            }else if(tipoRes == 'CADENA'){
                if(opIzq.tipo == 'CARACTER'){
                    var resultado = "char";
                }else{
                    var resultado = "string";
                }
            }
            

            return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }

    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion typeof... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function tostringfuncion(_opIzq,_opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    //console.log(_opIzq)
    //console.log(_opDer)
    
    if(tipoRes!=null){
     

            valor = opIzq.valor

            const resultado = valor.toString();

            return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")//true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la funcion round... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function or(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    //console.log(_opDer)
    /*
    1 || 1 = 1
    1 || 0 = 1
    0 || 1 = 1
    0 || 0 = 0
    */
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        if(opIzq.valor || opDer.valor){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function and(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    //console.log(_opDer)
    /*
    1 && 1 = 1
    1 && 0 = 0
    0 && 1 = 0
    0 && 0 = 0
    */
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        if(opIzq.valor && opDer.valor){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq, _ambito)
    //const opDer = Logica(_opDer, _ambito)

    if(opIzq.tipo == "BANDERA"){
        var resultado = false
        if(opIzq.valor == false){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede negar el valor de tipo ${opIzq.tipo}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}



module.exports = Aritmetica


/*const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")


function Aritmetica(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR || _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
      return ValorExpresion(_expresion, _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.SUMA) {
      return suma(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.RESTA) {
      return resta(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
      return multiplicacion(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.DIVISION) {
      return division(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.POTENCIA) {
      return potencia(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.MODULO) {
      return modular(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.UNARIA) {
      return menosUnario(Aritmetica(_expresion.opDer, _ambito), _ambito);
    }
  }
  


function suma(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    }
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)


    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = 1 + Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = 0 + Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
                else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = Number(opIzq.valor) + 1;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = Number(opIzq.valor) + 0;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) + Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }

                }
                else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) + Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            } else {
                const resultado = Number(opIzq.valor) + Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }


        }
        if (tipores === TIPO_DATO.CADENA) {
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna

            }

        }

    }

}

function resta(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    }



    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)

    if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "No se puede realizar la resta con cadenas",
            tipo: tipores,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    } else if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = 1 - Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = 0 - Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
                else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = Number(opIzq.valor) - 1;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = Number(opIzq.valor) - 0;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) - Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }

                }
                else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) - Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            } else {
                const resultado = Number(opIzq.valor) - Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }


        }
    }
}

function multiplicacion(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    }
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
    if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "No se puede realizar la multiplicacion con cadenas",
            tipo: tipores,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    } else if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
                else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) * Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna
                    }
                }
                else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) * Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna
                    }
                }
            } else {
                const resultado = Number(opIzq.valor) * Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna
                }
            }
        }
    }
}

function division(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito);
    var opDer = Aritmetica(_opDer, _ambito);
    
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    }


    const tipores = TipoResultado(opIzq.tipo, opDer.tipo);
    if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "No se puede realizar la division con cadenas",
            tipo: tipores,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    } else if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                const resultado = "Error no se puede hacer division con booleanos";
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna
                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    opIzq.valor = Number((opIzq.valor).charCodeAt(0));
                }
                if (opDer.tipo === TIPO_DATO.CHAR) {
                    opDer.valor = Number((opDer.valor).charCodeAt(0));
                }
            }
            if (opDer.valor === 0) {
                const resultado = "Error división entre cero";
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opDer.linea,
                    columna: _opDer.columna
                }
            }
            const resultado = Number(opIzq.valor) / Number(opDer.valor);
            return {
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _opizq.linea,
                columna: _opizq.columna
            }
        }
    }
}

function potencia(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    }

    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)


    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
                if (opIzq.tipo === TIPO_DATO.ENTERO) {
                    if (opDer.tipo === TIPO_DATO.ENTERO) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                } else if (opIzq.tipo === TIPO_DATO.DECIMAL) {
                    if (opDer.tipo === TIPO_DATO.ENTERO) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
            }
        } else {
            const resultado = "Error no se puede hacer potencia";
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna
            }
        }
    }
}

function modular(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    }
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL) {
            if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
                if (opIzq.tipo === TIPO_DATO.ENTERO) {
                    if (opDer.tipo === TIPO_DATO.ENTERO) {
                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                } else if (opIzq.tipo === TIPO_DATO.DECIMAL) {

                    if (opDer.tipo === TIPO_DATO.ENTERO) {

                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
            }
        } else {

            const resultado = "Error no se puede hacer modulo";
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna
            }
        }
    }
}

function menosUnario(_opDer, _ambito) {
    var opDer = Aritmetica(_opDer, _ambito)
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if (opDer.tipo === TIPO_DATO.DECIMAL || opDer.tipo === TIPO_DATO.ENTERO) {
        const resultado = opDer.valor * -1;
        return {
            valor: resultado,
            tipo: opDer.tipo,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    } else {
        const resultado = "Error no se puede hacer negación.";
        return {
            valor: resultado,
            tipo: opDer.tipo,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    }
}


module.exports = Aritmetica;


// const TIPO_DATO = require("../Enums/TipoDato")
// const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
// const TIPO_OPERACION = require("../Enums/TipoOperacion")
// const TIPO_VALOR = require("../Enums/TipoValor")
// const TipoResultado = require("./TipoResultado")
// const ValorExpresion = require("./ValorExpresion")



// function Aritmetica(_expresion, _ambito) {
//     if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
//         _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
//       return ValorExpresion(_expresion, _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.SUMA) {
//       return suma(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.RESTA) {
//       return resta(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
//       return multiplicacion(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.DIVISION) {
//       return division(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.POTENCIA) {
//       return potencia(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.MODULO) {
//       return modular(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
//     } else if (_expresion.tipo === TIPO_OPERACION.UNARIA) {
//       return menosUnario(Aritmetica(_expresion.opDer, _ambito), _ambito);
//     }
//   }
  


// function suma(_opizq, _opDer, _ambito) {
//     var opIzq = Aritmetica(_opizq, _ambito)
//     var opDer = Aritmetica(_opDer, _ambito)   
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if(opIzq === undefined){
//         opIzq = _opizq; 
//     }
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)


//     if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 if (opIzq.tipo === TIPO_DATO.BOOL) {
//                     if (opIzq.valor === true) {
//                         const resultado = 1 + Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = 0 + Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.BOOL) {
//                     if (opDer.valor === true) {
//                         const resultado = Number(opIzq.valor) + 1;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = Number(opIzq.valor) + 0;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number((opIzq.valor).charCodeAt(0)) + Number(opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number(opIzq.valor) + Number((opDer.valor).charCodeAt(0));
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }
//                 }
//             } else {
//                 const resultado = Number(opIzq.valor) + Number(opDer.valor);
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna

//                 }
//             }


//         }
//         if (tipores === TIPO_DATO.CADENA) {
//             const resultado = opIzq.valor.toString() + opDer.valor.toString();
//             return {
//                 valor: resultado,
//                 tipo: tipores,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna

//             }

//         }

//     }

// }

// function resta(_opizq, _opDer, _ambito) {
//     var opIzq = Aritmetica(_opizq, _ambito)
//     var opDer = Aritmetica(_opDer, _ambito)   
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if(opIzq === undefined){
//         opIzq = _opizq; 
//     }



//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)

//     if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
//         return {
//             valor: "No se puede realizar la resta con cadenas",
//             tipo: tipores,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     } else if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 if (opIzq.tipo === TIPO_DATO.BOOL) {
//                     if (opIzq.valor === true) {
//                         const resultado = 1 - Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = 0 - Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.BOOL) {
//                     if (opDer.valor === true) {
//                         const resultado = Number(opIzq.valor) - 1;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = Number(opIzq.valor) - 0;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number((opIzq.valor).charCodeAt(0)) - Number(opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number(opIzq.valor) - Number((opDer.valor).charCodeAt(0));
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }
//                 }
//             } else {
//                 const resultado = Number(opIzq.valor) - Number(opDer.valor);
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna

//                 }
//             }


//         }
//     }
// }

// function multiplicacion(_opizq, _opDer, _ambito) {
//     var opIzq = Aritmetica(_opizq, _ambito)
//     var opDer = Aritmetica(_opDer, _ambito)   
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if(opIzq === undefined){
//         opIzq = _opizq; 
//     }
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
//     if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
//         return {
//             valor: "No se puede realizar la multiplicacion con cadenas",
//             tipo: tipores,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     } else if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 if (opIzq.tipo === TIPO_DATO.BOOL) {
//                     if (opIzq.valor === true) {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 }
//                 else if (opDer.tipo === TIPO_DATO.BOOL) {
//                     if (opDer.valor === true) {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number((opIzq.valor).charCodeAt(0)) * Number(opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//                 else if (opDer.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number(opIzq.valor) * Number((opDer.valor).charCodeAt(0));
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//             } else {
//                 const resultado = Number(opIzq.valor) * Number(opDer.valor);
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna
//                 }
//             }
//         }
//     }
// }

// function division(_opizq, _opDer, _ambito) {
//     var opIzq = Aritmetica(_opizq, _ambito);
//     var opDer = Aritmetica(_opDer, _ambito);
    
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if(opIzq === undefined){
//         opIzq = _opizq; 
//     }


//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo);
//     if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
//         return {
//             valor: "No se puede realizar la division con cadenas",
//             tipo: tipores,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     } else if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 const resultado = "Error no se puede hacer division con booleanos";
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna
//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     opIzq.valor = Number((opIzq.valor).charCodeAt(0));
//                 }
//                 if (opDer.tipo === TIPO_DATO.CHAR) {
//                     opDer.valor = Number((opDer.valor).charCodeAt(0));
//                 }
//             }
//             if (opDer.valor === 0) {
//                 const resultado = "Error división entre cero";
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opDer.linea,
//                     columna: _opDer.columna
//                 }
//             }
//             const resultado = Number(opIzq.valor) / Number(opDer.valor);
//             return {
//                 valor: resultado,
//                 tipo: TIPO_DATO.DECIMAL,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna
//             }
//         }
//     }
// }

// function potencia(_opizq, _opDer, _ambito) {
//     var opIzq = Aritmetica(_opizq, _ambito)
//     var opDer = Aritmetica(_opDer, _ambito)   
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if(opIzq === undefined){
//         opIzq = _opizq; 
//     }

//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)


//     if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
//                 if (opIzq.tipo === TIPO_DATO.ENTERO) {
//                     if (opDer.tipo === TIPO_DATO.ENTERO) {
//                         const resultado = Math.pow(opIzq.valor, opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                         const resultado = Math.pow(opIzq.valor, opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 } else if (opIzq.tipo === TIPO_DATO.DECIMAL) {
//                     if (opDer.tipo === TIPO_DATO.ENTERO) {
//                         const resultado = Math.pow(opIzq.valor, opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                         const resultado = Math.pow(opIzq.valor, opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 }
//             }
//         } else {
//             const resultado = "Error no se puede hacer potencia";
//             return {
//                 valor: resultado,
//                 tipo: tipores,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna
//             }
//         }
//     }
// }

// function modular(_opizq, _opDer, _ambito) {
//     var opIzq = Aritmetica(_opizq, _ambito)
//     var opDer = Aritmetica(_opDer, _ambito)   
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if(opIzq === undefined){
//         opIzq = _opizq; 
//     }
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
//     if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL) {
//             if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
//                 if (opIzq.tipo === TIPO_DATO.ENTERO) {
//                     if (opDer.tipo === TIPO_DATO.ENTERO) {
//                         const resultado = opIzq.valor % opDer.valor;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                         const resultado = opIzq.valor % opDer.valor;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 } else if (opIzq.tipo === TIPO_DATO.DECIMAL) {

//                     if (opDer.tipo === TIPO_DATO.ENTERO) {

//                         const resultado = opIzq.valor % opDer.valor;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                         const resultado = opIzq.valor % opDer.valor;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 }
//             }
//         } else {

//             const resultado = "Error no se puede hacer modulo";
//             return {
//                 valor: resultado,
//                 tipo: tipores,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna
//             }
//         }
//     }
// }

// function menosUnario(_opDer, _ambito) {
//     var opDer = Aritmetica(_opDer, _ambito)
//     if(opDer === undefined){
//         opDer = _opDer; 
//     }
//     if (opDer.tipo === TIPO_DATO.DECIMAL || opDer.tipo === TIPO_DATO.ENTERO) {
//         const resultado = opDer.valor * -1;
//         return {
//             valor: resultado,
//             tipo: opDer.tipo,
//             linea: _opDer.linea,
//             columna: _opDer.columna
//         }
//     } else {
//         const resultado = "Error no se puede hacer negación.";
//         return {
//             valor: resultado,
//             tipo: opDer.tipo,
//             linea: _opDer.linea,
//             columna: _opDer.columna
//         }
//     }
// }


// module.exports = Aritmetica;

// /*const TIPO_DATO = require("../Enums/TipoDato")
// const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
// const TIPO_OPERACION = require("../Enums/TipoOperacion")
// const TIPO_VALOR = require("../Enums/TipoValor")
// const TipoResultado = require("./TipoResultado")
// const ValorExpresion = require("./ValorExpresion")   

// function Aritmetica(_expresion,_ambito){
//     if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
//         _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR
//         ||_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO ||_expresion.tipo === TIPO_OPERACION.INCREMENTO) {
//         return ValorExpresion(_expresion, _ambito) 
//     }else if (_expresion.tipo === TIPO_OPERACION.SUMA) {
//         // console.log("suma")
//         return suma(_expresion.opIzq, _expresion.opDer, _ambito)
//     }else if (_expresion.tipo === TIPO_OPERACION.RESTA) {
//         // console.log("resta")
//         return resta(_expresion.opIzq, _expresion.opDer, _ambito)
//     }else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
//         // console.log("multiplicacion")
//         return multiplicacion(_expresion.opIzq, _expresion.opDer, _ambito)
//     }else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
//         // console.log("division")
//         return division(_expresion.opIzq, _expresion.opDer, _ambito)
//     }else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
//         // console.log("potencia")
//         return potencia(_expresion.opIzq, _expresion.opDer, _ambito)
//     }else if(_expresion.tipo === TIPO_OPERACION.MODULO){
//         // console.log("modulo")
//         return modular(_expresion.opIzq, _expresion.opDer, _ambito)
//     }else if(_expresion.tipo === TIPO_OPERACION.UNARIA){
//         // console.log("menos unario")
//         //console.log(_expresion.opDer)
//         return menosUnario(_expresion.opDer, _ambito)
//     }else if(_expresion.tipo === TIPO_OPERACION.INCREMENTO){
//         // console.log("incremento")
//         return incremento(_expresion.opIzq, _ambito)
//     }
// }

// function suma(_opizq, _opDer, _ambito) {
//     const opIzq = Aritmetica(_opizq, _ambito)  
//     const opDer = Aritmetica(_opDer, _ambito)
  
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  


//     if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 if (opIzq.tipo === TIPO_DATO.BOOL) {
//                     if (opIzq.valor === true) {
//                         const resultado = 1 + Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = 0 + Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.BOOL) {
//                     if (opDer.valor === true) {
//                         const resultado = Number(opIzq.valor) + 1;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = Number(opIzq.valor) + 0;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number((opIzq.valor).charCodeAt(0)) + Number(opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number(opIzq.valor) + Number((opDer.valor).charCodeAt(0));
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }
//                 }
//             } else {
//                 const resultado = Number(opIzq.valor) + Number(opDer.valor);
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna

//                 }
//             }


//         }
//         if (tipores === TIPO_DATO.CADENA) {
//             const resultado = opIzq.valor.toString() + opDer.valor.toString();
//             return {
//                 valor: resultado,
//                 tipo: tipores,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna

//             }

//         }

//     } 

// }

// function resta(_opizq, _opDer, _ambito) {
//     const opIzq = Aritmetica(_opizq, _ambito)  
//     const opDer = Aritmetica(_opDer, _ambito)
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
    
//     if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
//         return {
//            valor: "No se puede realizar la resta con cadenas",
//            tipo: tipores,
//            linea: _opizq.linea,
//            columna: _opizq.columna
//         }
//     } else if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 if (opIzq.tipo === TIPO_DATO.BOOL) {
//                     if (opIzq.valor === true) {
//                         const resultado = 1 - Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = 0 - Number(opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.BOOL) {
//                     if (opDer.valor === true) {
//                         const resultado = Number(opIzq.valor) - 1;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     } else {
//                         const resultado = Number(opIzq.valor) - 0;
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna

//                         }
//                     }

//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number((opIzq.valor).charCodeAt(0)) - Number(opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }

//                 }
//                 else if (opDer.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number(opIzq.valor) - Number((opDer.valor).charCodeAt(0));
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna

//                     }
//                 }
//             } else {
//                 const resultado = Number(opIzq.valor) - Number(opDer.valor);
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna

//                 }
//             }


//         }
//    }
// }

// function multiplicacion(_opizq, _opDer, _ambito) {
//     const opIzq = Aritmetica(_opizq, _ambito)
//     const opDer = Aritmetica(_opDer, _ambito)
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
//     if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
//         return {
//               valor: "No se puede realizar la multiplicacion con cadenas",
//                 tipo: tipores,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna
//         }
//     } else if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 if (opIzq.tipo === TIPO_DATO.BOOL) {
//                     if (opIzq.valor === true) {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,   
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 }
//                 else if (opDer.tipo === TIPO_DATO.BOOL) {
//                     if (opDer.valor === true) {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     } else {
//                         const resultado = "Error no se puede hacer multiplicacion con booleanos";
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                     }
//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number((opIzq.valor).charCodeAt(0)) * Number(opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//                 else if (opDer.tipo === TIPO_DATO.CHAR) {
//                     const resultado = Number(opIzq.valor) * Number((opDer.valor).charCodeAt(0));
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//             } else {
//                 const resultado = Number(opIzq.valor) * Number(opDer.valor);
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna
//                 }
//             }
//         }
//     }
// }

// function division(_opizq, _opDer, _ambito) {
//     const opIzq = Aritmetica(_opizq, _ambito);
//     const opDer = Aritmetica(_opDer, _ambito);
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo);
//     if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
//         return {
//             valor: "No se puede realizar la division con cadenas",
//             tipo: tipores,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     } else if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
//                 const resultado = "Error no se puede hacer division con booleanos";
//                 return {
//                     valor: resultado,   
//                     tipo: tipores,
//                     linea: _opizq.linea,
//                     columna: _opizq.columna
//                 }
//             } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
//                 if (opIzq.tipo === TIPO_DATO.CHAR) {
//                     opIzq.valor = Number((opIzq.valor).charCodeAt(0));
//                 }
//                 if (opDer.tipo === TIPO_DATO.CHAR) {
//                     opDer.valor = Number((opDer.valor).charCodeAt(0));
//                 }
//             }
//             if (opDer.valor === 0) {
//                 console.log("Error división entre cero")
//                 const resultado = "Error división entre cero";
//                 return {
//                     valor: resultado,
//                     tipo: tipores,
//                     linea: _opDer.linea,
//                     columna: _opDer.columna
//                 }
//             }
//             const resultado = Number(opIzq.valor) / Number(opDer.valor);
//             return {
//                 valor: resultado,
//                 tipo: TIPO_DATO.DECIMAL,
//                 linea: _opizq.linea,
//                 columna: _opizq.columna
//             }
//         }
//     }
// }

// function potencia(_opizq, _opDer, _ambito){
//     const opIzq = Aritmetica(_opizq, _ambito)  
//     const opDer = Aritmetica(_opDer, _ambito)
    
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  


//     if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
//             if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
//                 if (opIzq.tipo === TIPO_DATO.ENTERO) {
//                     if(opDer.tipo === TIPO_DATO.ENTERO){
//                         const resultado = Math.pow(opIzq.valor, opDer.valor);
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                 } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                     const resultado = Math.pow(opIzq.valor, opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//             }else if(opIzq.tipo === TIPO_DATO.DECIMAL){
//                 if(opDer.tipo === TIPO_DATO.ENTERO){
//                     const resultado = Math.pow(opIzq.valor, opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                     const resultado = Math.pow(opIzq.valor, opDer.valor);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//             }
//         }
//     }else{
//         const resultado = "Error no se puede hacer potencia";
//         return {
//             valor: resultado,
//             tipo: tipores,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     }
//     }
// }

// function modular(_opizq, _opDer, _ambito){
//     const opIzq = Aritmetica(_opizq, _ambito)  
//     const opDer = Aritmetica(_opDer, _ambito)
//     console.log(opIzq);
//     const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
//     if (tipores != null) {
//         if (tipores === TIPO_DATO.DECIMAL) {
//             if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
//                 if (opIzq.tipo === TIPO_DATO.ENTERO) {
//                     if(opDer.tipo === TIPO_DATO.ENTERO){
//                         const resultado = opIzq.valor % opDer.valor;
//                         console.log(resultado, "mod1");
//                         return {
//                             valor: resultado,
//                             tipo: tipores,
//                             linea: _opizq.linea,
//                             columna: _opizq.columna
//                         }
//                 } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                     const resultado = opIzq.valor % opDer.valor;
//                     console.log(resultado, "mod2");
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//             }else if(opIzq.tipo === TIPO_DATO.DECIMAL){
                
//                 if(opDer.tipo === TIPO_DATO.ENTERO){
                    
//                     const resultado = opIzq.valor % opDer.valor;
//                     //console.log(resultado);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
//                     const resultado = opIzq.valor % opDer.valor;
//                     //console.log(resultado);
//                     return {
//                         valor: resultado,
//                         tipo: tipores,
//                         linea: _opizq.linea,
//                         columna: _opizq.columna
//                     }
//                 }
//             }
//         }
//     }else{

//         const resultado = "Error no se puede hacer modulo";
//         return {
//             valor: resultado,
//             tipo: tipores,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     }
//     }
// }

// function menosUnario(_opDer, _ambito){
//     console.log(_opDer);
//     const opDer = Aritmetica(_opDer, _ambito)
//     if (opDer.tipo === TIPO_DATO.DECIMAL || opDer.tipo === TIPO_DATO.ENTERO) {
//         const resultado = opDer.valor * -1;
//         return {
//             valor: resultado,
//             tipo: opDer.tipo,
//             linea: _opDer.linea,
//             columna: _opDer.columna
//         }
//     }else{
//         const resultado = "Error no se puede hacer negación.";
//         return {
//             valor: resultado,
//             tipo: opDer.tipo,
//             linea: _opDer.linea,
//             columna: _opDer.columna
//         }
//     }
// }

// function incremento(_opizq, _ambito){
//     console.log("incremento")
//     const opIzq = Aritmetica(_opizq, _ambito)  
//     if (opIzq.tipo === TIPO_DATO.ENTERO) {
//         const resultado = opIzq.valor + 1;
//         return {
//             valor: resultado,
//             tipo: opIzq.tipo,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     }else{
//         const resultado = "Error no se puede hacer incremento.";
//         return {
//             valor: resultado,
//             tipo: opIzq.tipo,
//             linea: _opizq.linea,
//             columna: _opizq.columna
//         }
//     }
// }

// module.exports = Aritmetica;

// //Completado :v 

// */