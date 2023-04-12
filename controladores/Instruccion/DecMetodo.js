const Metodo = require("../Ambito/Metodo")


function DecMetodo(_instruccion,_ambito){
    const nuevoMetodo= new Metodo(_instruccion.nombre, _instruccion.lista_parametros,_instruccion.instrucciones,_instruccion.linea,_instruccion.columna)
    if(_ambito.existeSimbolo(nuevoMetodo.id)!=false){ 
        return `Error: No se puede declarar un metodo con el mismo nombres de una variable '${nuevoMetodo.id}'... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    
    }
    else if(_ambito.existeMetodo(nuevoMetodo.id)!=false){
        return `Error: El método '${nuevoMetodo.id}' ya existe... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
   
    }
    _ambito.addMetodo(nuevoMetodo.id,nuevoMetodo)
    return null

}
module.exports = DecMetodo;

// const Metodo = require('../Ambito/Metodo');

// function DeclaracionMetodo(_instruccion, _ambito){
//     var nuevoMetodo = new Metodo(_instruccion.id, _instruccion.parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna);
//     if(_ambito.existeSimbolo(nuevoMetodo.id) != false){
//         return "Error: El metodo " + nuevoMetodo.id + " ya existe en la linea: " + nuevoMetodo.linea + " y columna: " + nuevoMetodo.columna;
//     }
//     else if(_ambito.existeMetodo(nuevoMetodo.id) != false){
//         return "Error: El metodo " + nuevoMetodo.id + " ya existe en la linea: " + nuevoMetodo.linea + " y columna: " + nuevoMetodo.columna;
//     }
//     _ambito.agregarMetodo(nuevoMetodo.id, nuevoMetodo);
//     return null;

// }

// module.exports = DeclaracionMetodo;
