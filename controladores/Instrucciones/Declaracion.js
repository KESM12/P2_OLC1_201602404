const Simbolo = require("../Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion =  require('../Operacion');

function Declaracion(_instruccion, _ambito){
    if(_instruccion.tipo_dato === TIPO_DATO.ENTERO){
        var valor = 0 
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito);
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
} else if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
    var valor = 0.0;
    if(_instruccion.valor != null){
        var op = Operacion(_instruccion.valor, _ambito);
        tipo = op.tipo;
        if(tipo === TIPO_DATO.DECIMAL){
            valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
} else if(_instruccion.tipo_dato === TIPO_DATO.CHAR){
    var valor = "";
    if(_instruccion.valor != null){
        var op = Operacion(_instruccion.valor, _ambito);
        tipo = op.tipo;
        if(tipo === TIPO_DATO.CHAR){
            valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
} else if(_instruccion.tipo_dato === TIPO_DATO.BOOLEANO){
    var valor = false;
    if(_instruccion.valor != null){
        var op = Operacion(_instruccion.valor, _ambito);
        tipo = op.tipo;
        if(tipo === TIPO_DATO.BOOLEANO){
            valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
} else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
    var valor = "";
    if(_instruccion.valor != null){
        var op = Operacion(_instruccion.valor, _ambito);
        tipo = op.tipo;
        if(tipo === TIPO_DATO.CADENA){
            valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
} else if(_instruccion.tipo_dato === TIPO_DATO.ARREGLO){
    var valor = [];
    if(_instruccion.valor != null){
        var op = Operacion(_instruccion.valor, _ambito);
        tipo = op.tipo;
        if(tipo === TIPO_DATO.ARREGLO){
            valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
} else if(_instruccion.tipo_dato === TIPO_DATO.OBJETO){
    var valor = {};
    if(_instruccion.valor != null){
        var op = Operacion(_instruccion.valor, _ambito);
        tipo = op.tipo;
        if(tipo === TIPO_DATO.OBJETO){
            valor = op.valor;
        }
    }
    const nuevoSimbolo = new Simbolo( _instruccion.id, valor, _instruccion.linea, _instruccion.columna);
    if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false){
        return "Error: La variable " + nuevoSimbolo.id + " ya existe en la linea: " + nuevoSimbolo.linea + " y columna: " + nuevoSimbolo.columna;
    }
    _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo);
    return null;
}
}

//esperar la validación del aux si se deja objeto y arreglo 