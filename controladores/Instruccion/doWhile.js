const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaDoWhile(_instruccion, _ambito) {
    var mensaje = "";
    var mensajeC = "";
    console.log(_instruccion, "instruccion en el do while");
    var operacion = Operacion(_instruccion.expresionWhile, _ambito);
    do {
      var nuevoAmbito = new Ambito(_ambito, "While");
      const Bloque = require("./Bloque");
      var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito);
      mensaje += ejec.cadena;
      //console.log(mensaje, "mensaje dentro del while");
      operacion = Operacion(_instruccion.expresionWhile, _ambito);
      console.log(operacion, "operacion dentro del do while");
    }   while (operacion.valor);
    mensaje += mensajeC;
    return { cadena: mensaje };

  }
  

module.exports = SentenciaDoWhile;

