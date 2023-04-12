const Ambito = require("../Ambito/Ambito")
const Instruccion = require("./Instruccion")
const Bloque = require("./Bloque")

function Main(_instruccion, _ambito) {
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    
    var cadena=""
    if(metodoEjecutar!=null){
       var nuevoAmbito = new Ambito(_ambito,"Main")
       if(metodoEjecutar.lista_parametros!=null){

       }else{
        
            var ejec = Bloque(metodoEjecutar.instrucciones,nuevoAmbito)
            var mensaje = ejec.cadena
            return mensaje
       }
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Main;
// const Bloque = require("./Bloque");

// function Main(_instruccion, _ambito){
//     var metodoEjecutar = _ambito.getMetodo(_instruccion.id);
//     var cadena = "";

//     if(metodoEjecutar != null){
//         var nuevoAmbito = new Ambito(_ambito, "Main");
//         if(metodoEjecutar.parametros != null){

//         }else{
//             var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito);
//             var mensaje = ejec.cadena;
//             return mensaje;
//         }
//     }
//     return "Error: No existe el metodo " + _instruccion.id + " en la linea: " + _instruccion.linea + " y columna: " + _instruccion.columna;
// }

// module.exports = Main;

// // creo que falta el main que venga con parametros :v