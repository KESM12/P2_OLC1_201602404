const Ambito = require("../Ambito/Ambito");

function SentenciaBreak(_instruccion,_ambito){
    var mensaje = "";
    var nuevoAmbito = new Ambito(_ambito,"Break");
    const Bloque = require("./Bloque");
    var ejec = Bloque(this, nuevoAmbito);
        mensaje+=ejec.cadena;
    return{
        cadena:mensaje
    }
}
module.exports = SentenciaBreak;