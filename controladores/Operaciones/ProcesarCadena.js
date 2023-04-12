const Operacion = require("./Operacion")

function procesarCadena(_expresion, _ambito){
    return Operacion(_expresion, _ambito)
}
module.exports= procesarCadena

// const Operacion = require('../Operaciones/Operacion');

// function procesarCadena (_expresion, _ambito){
//     return Operacion(_expresion, _ambito);
// }

// module.exports = procesarCadena;

// //terminar bien Operacion.js