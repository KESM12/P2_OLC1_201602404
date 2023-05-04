const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./If");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIf = require("./IfElseIf");
const SentenciaWhile = require("./While");
const SentenciaDoWhile = require("./doWhile");
const Incremento = require("./Incremento")
const Decremento = require("./Decremento")
const SentenciaFor = require("./For")
const SentenciaSwitch = require("./Switch")


function Bloque(_instrucciones, _ambito) {
    var cadena = ""
    var hayBreak = false
    var hayContinue = false

    _instrucciones.forEach(instruccion => {
        if (hayBreak) {
            return {
                hayBreak: hayBreak,
                cadena: cadena
            }
        }
        if (hayContinue) {
            return {
                hayContinue: hayContinue,
                cadena: cadena
            }
        }
        if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
            cadena += Print(instruccion, _ambito) + "\n"
        } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(instruccion, _ambito)

            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
            var ejec = SentenciaIf(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.IFCE) {
            var ejec = SentenciaIfElse(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.IFCEIF) {
            var ejec = SentenciaIfElseIf(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
            var ejec = SentenciaWhile(instruccion, _ambito)
            var mensaje = ejec.cadena
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
           // console.log(instruccion, "do while")
            var ejec = SentenciaDoWhile(instruccion, _ambito)
            var mensaje = ejec.cadena
            if (mensaje != null) {
                cadena += mensaje
            }
        }else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            hayBreak = true
            return {
                hayBreak: hayBreak,
                cadena: cadena
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            hayContinue = true
            return {
                hayContinue: hayContinue,
                cadena: cadena
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.INCREMENTO){
            //ASTdiagrama.push('Incremento')
            var mensaje = Incremento(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DECREMENTO){
            //ASTdiagrama.push('Decremento')
            var mensaje = Decremento(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            //ASTdiagrama.push('Llamada metodo')
            //console.log("Llamada metodo")
            const Main = require("./Main");
            var mensaje = Main(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION){
            //ASTdiagrama.push('Llamada funcion')
            //console.log("Llamada metodo")
            const Main = require("./Main");
            var mensaje = Main(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var ejec = SentenciaFor(instruccion, _ambito)
            //console.log(ejec)
            var mensaje = ejec.cadena
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            var ejec = SentenciaSwitch(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = false
            hayContinue = ejec.hayContinue
            if(mensaje!=null){
                cadena+=mensaje
            }
        }

    });
    return {
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        cadena: cadena
    }

}
module.exports = Bloque


