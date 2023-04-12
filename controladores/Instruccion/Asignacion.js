
const Operacion = require("../Operaciones/Operacion");

function Asignacion(_instruccion,_ambito){
    const id=_instruccion.id;
    const existe= _ambito.existeSimbolo(id);
    if(existe){
        var valor=Operacion(_instruccion.expresion,_ambito)
        var simbolo=_ambito.getSimbolo(id);  
        var tipos={
            tipoSimbolo:simbolo.tipo,  
            tipoNuevoValor:valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){ //int a = 5
            simbolo.valor=valor.valor;
            _ambito.actualizar(id,simbolo);
            return null
        }
    }else{
        return "La variable " + id + " no existe Linea: " + _instruccion.linea + " columna: " + _instruccion.columna;

    }
}
module.exports = Asignacion;
// const Operacion = require('../Operaciones/Operacion');

// function Asignacion(_instruccion, _ambito){
//     const id = _instruccion.id;
//     const existe = _ambito.existe(id);
//     if(existe){
//         var  valor = Operacion(_instruccion.valor, _ambito);
//         var simbolo = _ambito.getSimbolo(id);
//         var tipos ={
//             TipoSimbolo: simbolo.tipo,
//             TipoNuevoValor: valor.tipo
//         } 
//         if (tipos.TipoSimbolo === tipos.TipoNuevoValor){
//             simbolo.valor = valor.valor;
//             _ambito.actualizar(id, simbolo);
//             return null
//         }else{
//             return "Error: No se puede asignar un valor de tipo " + tipos.TipoNuevoValor + " a una variable de tipo " + tipos.TipoSimbolo;
//         }
//     }else{
//         return "Error: No existe la variable " + id +"en la linea: " + _instruccion.linea;
//     }

// }

// module.exports = Asignacion;
// //no se que mas falta la dvd
