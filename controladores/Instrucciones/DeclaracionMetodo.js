const Metodo = require('../Metodo');

function DeclaracionMetodo(_instruccion, _ambito){
    var nuevoMetodo = new Metodo(_instruccion.id, _instruccion.parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna);
    if(_ambito.existeSimbolo(nuevoMetodo.id) != false){
        return "Error: El metodo " + nuevoMetodo.id + " ya existe en la linea: " + nuevoMetodo.linea + " y columna: " + nuevoMetodo.columna;
    }
    else if(_ambito.existeMetodo(nuevoMetodo.id) != false){
        return "Error: El metodo " + nuevoMetodo.id + " ya existe en la linea: " + nuevoMetodo.linea + " y columna: " + nuevoMetodo.columna;
    }
    _ambito.agregarMetodo(nuevoMetodo.id, nuevoMetodo);
    return null;

}

module.exports = DeclaracionMetodo;
