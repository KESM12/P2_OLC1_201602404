const TIPO_DATO = require("../Enums/TipoDato");


function TipoResultado(_tipo1, _tipo2) {
  if(_tipo1===TIPO_DATO.ENTERO && _tipo2===TIPO_DATO.ENTERO){
    return TIPO_DATO.ENTERO;