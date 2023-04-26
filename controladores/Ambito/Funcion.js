// Objetivo: Almacenar la informacion de una funcion
class Funcion{
    constructor(_tipo,_nombre,_lista_parametros,_instrucciones, _linea, _columna){
        this.tipo = _tipo;
        this.nombre = _nombre;
        this.lista_parametros = _lista_parametros;
        this.instrucciones = _instrucciones;
        this.linea = _linea;
        this.columna = _columna;
    }
}
module.exports = Funcion;