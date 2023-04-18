
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");


function nuevaOperacion(_opizq,_opDer,_tipo, _linea, _columna){
    return{
        opIzq:_opizq,
        opDer:_opDer,
        tipo:_tipo,
        linea:_linea,
        columna:_columna,
    }
}
function nuevaUnaria(_opDer,_tipo, _linea, _columna){
    return{
        opDer:_opDer,
        tipo:_tipo,
        linea:_linea,
        columna:_columna,
    }
}
const Instruccion ={
    nuevoPrint: function (_expresion,_linea,_columna) {
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },nuevoValor: function (_valor, _tipo, _linea, _columna) {
        return {
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },nuevaOperacionBinaria: function (_opizq,_opDer,_tipo, _linea, _columna) {
        return nuevaOperacion(_opizq,_opDer,_tipo, _linea, _columna);
    },nuevaOperacionUnaria: function (_opDer,_tipo, _linea, _columna) {
        return nuevaUnaria(_opDer,_tipo, _linea, _columna);
    },nuevaAsignacion: function (_id, _expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },nuevaDeclaracion: function (_id, _valor,_tipo, _linea, _columna) { 
        return{

            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },nuevoMain: function (_nombre,_lista_valores, _linea, _columna) {
        return{
            tipo: TIPO_INSTRUCCION.MAIN,
            nombre: _nombre,
            lista_valores:_lista_valores,
            linea: _linea,
            columna: _columna
        }
    },nuevoMetodo: function (_nombre, _lista_parametros, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIf: function (_expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoElse: function (_instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ELSE,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevotoLower: function(_expresion, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.TOLOWER,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    }

}
module.exports = Instruccion;

//aqui si falta terminar

// const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");

// function nuevaOperacion(_opIzquierdo, _opDerecho, _tipo, _linea, _columna){
//     return {
//         opIzquierdo: _opIzquierdo,
//         opDerecho: _opDerecho,
//         tipo: _tipo,
//         linea: _linea,
//         columna: _columna,
//     }
// }

// function nuevaUnaria(_opDerecho, _tipo, _linea, _columna){
//     return {
//         opDerecho: _opDerecho,
//         tipo: _tipo,
//         linea: _linea,
//         columna: _columna,
//     }
// }

// const Instruccion ={
//     nuevoPrint: function(_expresion, _linea, _columna){
//         return {
//             tipo: TIPO_INSTRUCCION.PRINT,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoValor: function(_valor, _tipo, _linea, _columna){
//         return{
//             tipo: _tipo,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevaOperacionBinaria: function(_opIzquierdo, _opDerecho, _tipo, _linea, _columna){
//         return nuevaOperacion(_opIzquierdo, _opDerecho, _tipo, _linea, _columna);
//     }, nuevaOperacionUnaria: function(_opDerecho, _tipo, _linea, _columna){
//         return nuevaUnaria(_opDerecho, _tipo, _linea, _columna);
//     }, nuevaAsignacion: function(_id, _expresion, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.ASIGNACION,
//             id: _id,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoDeclaracion: function(_id, _valor, _tipo, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.DECLARACION,
//             id: _id,
//             valor: _valor,
//             tipo: _tipo,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoIf: function(_expresion, _instrucciones, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.IF,
//             expresion: _expresion,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoElse: function(_instrucciones, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.ELSE,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoElseIf: function(_expresion, _instrucciones, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.ELSEIF,
//             expresion: _expresion,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoSwitch: function(_expresion, _casos, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.SWITCH,
//             expresion: _expresion,
//             casos: _casos,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoCase: function(_expresion, _instrucciones, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.CASE,
//             expresion: _expresion,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoDefault: function(_instrucciones, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.DEFAULT,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.WHILE,
//             condicion: _expresion,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoFor: function(_declaracion, _asignacion, _condicion, _actualizacion, _instrucciones, _linea, _columna){//revisar porque o viene asignación o vienen declaración
//         return{
//             tipo: TIPO_INSTRUCCION.FOR,
//             declaracion: _declaracion,
//             asignacion: _asignacion,
//             condicion: _condicion,
//             actualizacion: _actualizacion,
//             instrucciones: _instrucciones,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoDoWhile: function(_instrucciones, _expresion, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.DOWHILE,
//             instrucciones: _instrucciones,
//             condicion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoBreak: function(_linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.BREAK,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoContinue: function(_linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.CONTINUE,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoReturn: function(_expresion, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.RETURN,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoFuncion: function(_tipo, _id, _parametros, _linea, _columna){ //parametros viene dentro de () y puede estar vacio.
//         return{
//             tipo: TIPO_INSTRUCCION.FUNCION,
//             tipo: _tipo,
//             id: _id,
//             parametros: _parametros,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoMetodo: function(_id, _tipo, _parametros, _linea, _columna){ //void como palabra princial parametros dentro de () y puede estar vacio.
//         return{
//             tipo: TIPO_INSTRUCCION.DEC_METODO,
//             id: _id,
//             tipo: _tipo,
//             parametros: _parametros,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoParametro: function(_tipo, _id, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.PARAMETRO,
//             tipo: _tipo,
//             id: _id,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoLlamada: function(_id, _parametros, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.LLAMADA,
//             id: _id,
//             parametros: _parametros,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoPrint: function(_expresion, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.PRINT,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         } 
//     }, nuevotoLower: function(_expresion, _linea, _columna){ //solamente para strings
//         return{
//             tipo: TIPO_INSTRUCCION.TOLOWER,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevotoUpper: function(_expresion, _linea, _columna){ //solamente para strings
//         return{
//             tipo: TIPO_INSTRUCCION.TOUPPER,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoLength: function(_valor, _linea, _columna){ //strings y arreglos (vector y lista)
//         return{
//             tipo: TIPO_INSTRUCCION.LENGTH,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoTruncate: function(_valor, _linea, _columna){ //solamente para doubles ya que devuelve enteros
//         return{
//             tipo: TIPO_INSTRUCCION.TRUNCATE,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoRound: function(_valor, _linea, _columna){ //aproximación de decimales >5 t <5 retornar valores enteros.
//         return{
//             tipo: TIPO_INSTRUCCION.ROUND,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoTypeOf: function(_valor, _linea, _columna){ //retorna el tipo de dato que es
//         return{
//             tipo: TIPO_INSTRUCCION.TYPEOF,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoToString: function(_valor, _linea, _columna){ //retorna strings de un valor numerio (int o double) y de los valores booleanos
//         return{
//             tipo: TIPO_INSTRUCCION.TOSTRING,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevotoCharArray: function(_valor, _linea, _columna){ //retorna un arreglo de caracteres de un string
//         return{
//             tipo: TIPO_INSTRUCCION.TOCHARARRAY,
//             valor: _valor,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevoMain: function(_id, _listadevalores, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.MAIN,
//             id: _id,
//             listadevalores: _listadevalores,
//             linea: _linea,
//             columna: _columna,
//         }
//     }, nuevalistaDeValores: function(_listadevalores, _expresion, _linea, _columna){
//         return{
//             tipo: TIPO_INSTRUCCION.LISTADEVALORES,
//             listadevalores: _listadevalores,
//             expresion: _expresion,
//             linea: _linea,
//             columna: _columna,
//         }
//     }
// }

// // module.exports = Instruccion;