
function Incremento(_instruccion, _ambito){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    //console.log(_instruccion)
    //console.log(_ambito)
    if(existe){
        //var valor = Operacion(id, _ambito)
        var simbolo = _ambito.getSimbolo(id)

        //console.log(simbolo)
        /*var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }*/
        if(simbolo.tipo == 'ENTERO' || simbolo.tipo == 'DECIMAL'){
            simbolo.valor = simbolo.valor + 1
            _ambito.actualizar(id,simbolo)
            return null
        }
        return "\n Error: No es posible incrementar un valor de tipo "+ simbolo.tipo;
    }
    return `\n Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Incremento