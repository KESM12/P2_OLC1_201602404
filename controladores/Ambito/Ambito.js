class Ambito{

    constructor(_anterior, _actual){   // new Ambito(null, "global")
        this.anterior = _anterior;
        this.nombre = _actual;
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();
    }
    addSimbolo(_clave, _simbolo){ //agregar simbolo
        this.tablaSimbolos.set(_clave.toLowerCase(), _simbolo)  

    }
    getSimbolo(_clave){  //retornar simbolo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    existeSimbolo(_clave){  //retornar simbolo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if(encontrado!=null){
                return true
            }
        }
        return false
    }
    existeSimboloAmbitoActual(_clave){  //retornar simbolo
        
        var encontrado = this.tablaSimbolos.get(_clave.toLowerCase())
        if(encontrado!=null){
            return true
        }
        return false
    }
    actualizar(_clave,_simbolo){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if(encontrado!=null){
                e.tablaSimbolos.set(_clave,_simbolo)
                return true;
            }
            
        }
        return false;
    }
    addMetodo(_clave, _simbolo){ //agregar metodo
        this.tablaMetodos.set(_clave.toLowerCase(), _simbolo)
    }
    getMetodo(_clave){ 
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_clave.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    existeMetodo(_clave){ //verificar si existe metodo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_clave.toLowerCase()) 
            if(encontrado!=null){
                return true
            }
        }
        return false
    }    addFuncion(_clave, _funcion) {
        this.tablaFunciones.set(_clave.toLowerCase(), _funcion)
    }

    getFuncion(_clave) { //(hola, clase simbolo)
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_clave.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    existeFuncion(_clave) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_clave.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

}
module.exports= Ambito
