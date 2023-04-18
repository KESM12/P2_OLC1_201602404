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
    addMetodo(_s, _metodo){ //agregar metodo
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
    }
    getMetodo(_s){ 
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    existeMetodo(_s){ //verificar si existe metodo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) 
            if(encontrado!=null){
                return true
            }
        }
        return false
    }

}
module.exports= Ambito



// class Ambito{
//     constructor(_anterior, _actual){ // new Ambito(null, "global")
//         this.anterior = _anterior;
//         this.nombre = _actual;
//         this.tablaSimbolos = new Map();
//         this.tablaMetodos = new Map();
//         this.tablaFunciones = new Map();
//     }

//     agregarSimbolo(_clave, _simbolo){
//         this.tablaSimbolos.set(_clave.toLowerCase(), _simbolo);
//     }

//     getSimbolo(_clave){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaSimbolos.get(_clave.toLowerCase());
//             if(encontrado != null){
//                 return encontrado;
//             }
//         }
//         return null;
//     }

//     existeSimbolo(_clave){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaSimbolos.get(_clave.toLowerCase());
//             if(encontrado != null){
//                 return true;
//             }
//         }
//         return false;
//     }

//     actualizar(_clave, _simbolo){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaSimbolos.get(_clave.toLowerCase());
//             if(encontrado != null){
//                 e.tablaSimbolos.set(_clave, _simbolo);
//                 return;
//             }
//         }
//         return false;
//     }

//     agregarMetodo(_s, _metodo){ // _s = "print"
//         this.tablaMetodos.set(_s.toLowerCase(), _metodo);
//     }

//     getMetodo(_s){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaMetodos.get(_s.toLowerCase());
//             if(encontrado != null){
//                 return encontrado;
//             }
//         }
//         return null;
//     }

//     existeMetodo(_s){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaMetodos.get(_s.toLowerCase());
//             if(encontrado != null){
//                 return true;
//             }
//         }
//         return false;
//     }

//     agregarFuncion(_s, _funcion){
//         this.tablaFunciones.set(_s.toLowerCase(), _funcion);
//     }   

//     getFuncion(_s){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaFunciones.get(_s.toLowerCase());
//             if(encontrado != null){
//                 return encontrado;
//             }
//         }
//         return null;
//     }

//     existefuncion(_s){
//         for(let e=this; e!=null; e=e.anterior){
//             var encontrado = e.tablaFunciones.get(_s.toLowerCase());
//             if(encontrado != null){
//                 return true;
//             }
//         }
//         return false;
//     }
    
//     existeSimboloAmbitoActual(_clave){
//         var encontrado = this.tablaSimbolos.get(_clave.toLowerCase());
//         if(encontrado != null){
//             return true;
//         }
//         return false;
//     }
// }

// module.exports = Ambito;