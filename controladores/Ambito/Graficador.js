// const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
// const TIPO_OPERACION = require("../Enums/TipoOperacion")
// const TIPO_VALOR = require("../Enums/TipoValor")

// class Graficador {
//     constructor(_raiz){
//         this.grafo = ""
//         this.contador = 0
//         this.raiz = _raiz
//     }

//     graficar(){
//         this.grafo = "digraph G {\n"
//         this.grafo += "node [shape=box];\n"
//         this.grafo += "rankdir=TB;\n"
//         this.grafo += "Nodo0[label=\"RAIZ\"];\n"
//         this.contador = 1
//         this.recorrerAST("Nodo0", this.raiz)
//         this.grafo += "}"
//         return this.grafo
//     }

//     recorrerAST(_padre, _hijo){
//         _hijo.forEach(instruccion => {
//             if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
//                 var nombreHijo = "Nodo" + this.contador
//                 this.contador++;

//                 this.grafo += nombreHijo + "[label=\"DECLARACION\"];\n"
//                 this.grafo += _padre + "->" + nombreHijo + ";\n"
//                 this.graficarDeclaracion(instruccion, nombreHijo)
//             }
//             else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
//                 var nombreHijo = "Nodo" + this.contador
//                 this.contador++;
//                 this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
//                 this.grafo += _padre + "->" + nombreHijo + ";\n"
//                 this.graficarAsignacion(instruccion, nombreHijo)
//             }
//             else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
//                 var nombreHijo = "Nodo" + this.contador
//                 this.contador++;
//                 this.grafo += nombreHijo + "[label=\"PRINT\"];\n"
//                 this.grafo += _padre + "->" + nombreHijo + ";\n"
//                 this.graficarPrint(instruccion, nombreHijo)
//             }
//             else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
//                 var nombreHijo = "Nodo" + this.contador
//                 this.contador++;
//                 this.grafo += nombreHijo + "[label=\"IF\"];\n"
//                 this.grafo += _padre + "->" + nombreHijo + ";\n"
//                 this.graficarIf(instruccion, nombreHijo)
//             }
                

// }});

//     }

//     recorrerInstrucciones(_padre, _hijo){ //bloques //graficación de if while metodos y funciones
//         _hijo.forEach(instruccion => {
//             if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
//                 var nombreHijo
//             }
//     }


//     graficarDeclaracion(_instruccion, _padre){
//        var tipoVar = "Nodo" + this.contador
//     }


// //ver la grabacioón alb 1 hora 44 minutos
// // agregar vectores, listas funciones y las sentencias de control

// //ptm muy rapido alv mira la grabacion si o si
// //agrego codigo a analizador.js el del endponint