const procesarCadena = require('../Operaciones/ProcesarCadena');

function Print(_instruccion, _ambito){
    var cadena = procesarCadena(_instruccion.expresion,_ambito).valor   ;
    return cadena;
}

module.exports = Print;