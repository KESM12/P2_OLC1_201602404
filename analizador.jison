/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
"//".*                 //comentario lineal
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas   



[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"clase"               return 'clase'
"double"             return 'decimal'
"string"              return 'cadena'
"boolean"             return 'booleano'
"true"                  return 'Rtrue'
"false"                 return 'Rfalse'
"int"                 return 'intpr'
"char"                  return 'Rchar'
"print"                 return 'Rprint'
"while"               return 'while'
"for"                 return 'for'
"main"               return 'Rmain'
"if"               return 'if'
"break"               return 'break'
"continue"            return 'continue'
"return"              return 'return'
"else"               return 'else'
"switch"              return 'switch'
"case"                return 'case'
"default"             return 'default'
"do"                  return 'do'
"void"                return 'void'
"writeline"           return 'writeline'
"tolower"             return 'tolower'
"toupper"             return 'toupper'
"start"               return 'start'
"with"                return 'with'
"length"              return 'length'
"truncate"            return 'truncate'
"round"               return 'round'
"typeof"              return 'typeof'
"tostring"            return 'tostring'
"new"                 return 'nuevo'
"dynamiclist"         return 'dynamiclist'
"append"              return 'append'
"getvalue"            return 'getvalue'
"setvalue"            return 'setvalue'
"tochararray"         return 'tochararray'


"||"                   return 'or'
"&&"                   return 'and'
"=="                   return 'igualigual'
"="                     return 'igual'
"!="                   return 'diferente'
"<="                   return 'menorigual'
">="                   return 'mayorigual'
">"                   return 'mayor'
"<"                   return 'menor'
","                   return 'coma'
";"                   return 'ptcoma'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
"*"                   return 'multi'
"/"                   return 'div'
"--"                  return 'decremento'
"-"                   return 'menos'
"++"                  return 'incremento'
"+"                   return 'suma'
("^")|("ˆ")          return 'exponente'
"!"                   return 'not'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"?"                   return 'interrogacion'
":"                   return 'dospuntos'
"["                   return 'corA'
"]"                   return 'corC'

([a-zA-Z])([a-zA-Z0-9_])*               return 'identificador'
["\""]([^"\""])*["\""]                  return 'string'
["\'"]([^"\'"])*["\'"]                  return 'char'

<<EOF>>               return 'EOF'
.                     {
        
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
}
/lex
%{
       const TIPO_OPERACION= require('./controladores/Enums/TipoOperacion');
        const TIPO_VALOR = require('./controladores/Enums/TipoValor');
        const TIPO_DATO= require('./controladores/Enums/TipoDato');
        const INSTRUCCION = require('./controladores/Instruccion/Instruccion');
    
%}

/* operator associations and precedence */

%left 'interrogacion'
%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo' 
%left 'exponente' 

%left umenos

%right 'incremento' 'decremento'

%start INICIO

%% /* language grammar */

INICIO: OPCIONESCUERPO EOF{return $1;}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1;}
              | CUERPO {$$=[$1];}
;

CUERPO: DEC_VAR {$$=$1}
      | DEC_MET {$$=$1}
      | AS_VAR ptcoma {$$=$1}
      | MAIN {$$=$1}
      | DEC_FUN {$$=$1}
    
;

MAIN: Rmain identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoMain($2, null, this._$.first_line,this._$.first_column+1)}
        |Rmain identificador parA PARAMETROS_LLAMADA parC ptcoma {$$ = INSTRUCCION.nuevoMain($2, $4, this._$.first_line,this._$.first_column+1)}
       
;

LLAMADA_METODO: identificador parA parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1)}
              | identificador parA LISTAVALORES parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line,this._$.first_column+1)}
;

LISTAVALORES: LISTAVALORES coma EXPRESION {$1.push($3); $$=$1}
            | EXPRESION {$$=[$1]}
;


AS_VAR: identificador igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1)}
;

INC_VAR: identificador incremento {$$= INSTRUCCION.nuevoIncremento($1,this._$.first_line,this._$.first_column+1);}
;

DECR_VAR: identificador decremento {$$= INSTRUCCION.nuevoDecremento($1,this._$.first_line,this._$.first_column+1);}
;

DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO identificador LISTADEC ptcoma {var temp=$2; for(var i=0;i<$3.length;i++){temp=temp + "," + $3[i]}; $$ = INSTRUCCION.nuevaDeclaracion(temp, null, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO identificador LISTADEC igual EXPRESION ptcoma {var temp=$2; for(var i=0;i<$3.length;i++){temp=temp + "," + $3[i]}; $$ = INSTRUCCION.nuevaDeclaracion(temp, $5, $1, this._$.first_line,this._$.first_column+1)}
;

LISTADEC: LISTADEC coma identificador {$1.push($3); $$=$1;}
        | coma identificador {$$=[$2];}
;

TIPO: decimal {$$ = TIPO_DATO.DECIMAL}
    | cadena {$$ = TIPO_DATO.CADENA}
    | booleano {$$ = TIPO_DATO.BOOLEANO}
    | intpr {$$ = TIPO_DATO.ENTERO}
    | Rchar {$$= TIPO_DATO.CHAR}
    | dynamiclist {$$ = TIPO_DATO.LISTA}
    | corA corC {$$ = TIPO_DATO.VECTOR}
;


EXPRESION: EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
        | EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1);}
        | EXPRESION div EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1);}
        | EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1);}
        | EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1);}
        | menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionBinaria($2,$2, TIPO_OPERACION.NEGACION,this._$.first_line,this._$.first_column+1);}
        | parA EXPRESION parC {$$=$2}
        | EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION diferente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION menorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
        | EXPRESION mayor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION mayorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);} 
        | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
        | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
        | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($2,$2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1);}
        | EXPRESION incremento {$$= INSTRUCCION.nuevaOperacionBinaria($1,$1, TIPO_OPERACION.INC,this._$.first_line,this._$.first_column+1);}
        | EXPRESION decremento {$$= INSTRUCCION.nuevaOperacionBinaria($1,$1, TIPO_OPERACION.DEC,this._$.first_line,this._$.first_column+1);}
        | EXPRESION interrogacion EXPRESION dospuntos EXPRESION {$$= INSTRUCCION.nuevaOperacionTernaria($1,$3,$5, TIPO_OPERACION.TERNARIO,this._$.first_line,this._$.first_column+1);}
        | toupper parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TOUPPER,this._$.first_line,this._$.first_column+1);}
        | tolower parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TOLOWER,this._$.first_line,this._$.first_column+1);}
        | length parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.LENGTH,this._$.first_line,this._$.first_column+1);}
        | truncate parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TRUNCATE,this._$.first_line,this._$.first_column+1);}
        | round parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.ROUND,this._$.first_line,this._$.first_column+1);}
        | typeof parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TYPEOF,this._$.first_line,this._$.first_column+1);}
        | tostring parA EXPRESION parC {$$= INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TOSTRING,this._$.first_line,this._$.first_column+1);}
        | identificador corA EXPRESION corC {$$ = INSTRUCCION.nuevoValorVector($1,$3, TIPO_VALOR.VECTOR, this._$.first_line,this._$.first_column+1)}
        | getvalue parA identificador coma EXPRESION parC {$$ = INSTRUCCION.nuevoValorLista($3,$5, TIPO_VALOR.LISTA, this._$.first_line,this._$.first_column+1)}
        | identificador parA LISTAVALORES parC {$$ = INSTRUCCION.nuevaLlamadaFuncion($1, $3, this._$.first_line,this._$.first_column+1)}
        | identificador parA parC {$$ = INSTRUCCION.nuevaLlamadaFuncion($1, null, this._$.first_line,this._$.first_column+1)}
        | NUMBER {
          split1 = String($1).split(".");
          if(split1.length === 1){
             $$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1)
           } else{
             $$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)
           }
          }
        | Rtrue {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
        | Rfalse {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
        | string {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
        | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
        | char {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CHAR,this._$.first_line, this._$.first_column+1);}
;

DEC_MET : void identificador parA parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)}
        | void identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line,this._$.first_column+1)}
;

DEC_FUN : TIPO identificador parA parC llaveA OPCIONESMETODO return EXPRESION ptcoma llaveC {$$ = INSTRUCCION.nuevaFuncion($1, $2, null, $6, $7, this._$.first_line,this._$.first_column+1)}
        | TIPO identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO return EXPRESION ptcoma llaveC {$$ = INSTRUCCION.nuevaFuncion($1, $2, $4, $7, $8, this._$.first_line,this._$.first_column+1)}
;


LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS {$1.push($3); $$=$1;}
               | PARAMETROS {$$=[$1];}
;

PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
      | TIPO menor TIPO mayor identificador {$$ = INSTRUCCION.nuevaDeclaracion($5, null, $1, this._$.first_line,this._$.first_column+1)}
      | TIPO TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($3, null, $2, this._$.first_line,this._$.first_column+1)}
;

OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO  {$1.push($2); $$=$1;}
              | CUERPOMETODO {$$=[$1];}
;

CUERPOMETODO: DEC_VAR {$$=$1}
            | WHILE {$$=$1}
            | FOR {$$=$1}
            | DOWHILE {$$=$1}
            | PRINT {$$=$1}
            | AS_VAR ptcoma {$$=$1}
            | LLAMADA_METODO {$$=$1}
            | IF {$$=$1}
            | BREAK {$$=$1}
            | INC_VAR ptcoma {$$=$1}
            | DECR_VAR ptcoma {$$=$1}
            | SWITCH {$$=$1}
            | CONTINUE {$$=$1}
            | RETURN {$$=$1}


;

PRINT: Rprint parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1)}
;

WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;

FOR : for parA DEC_VAR EXPRESION ptcoma INC_VAR parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $4, $6, $9, this._$.first_line,this._$.first_column+1)}
  | for parA DEC_VAR EXPRESION ptcoma DECR_VAR parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $4, $6, $9, this._$.first_line,this._$.first_column+1)}
  | for parA AS_VAR ptcoma EXPRESION ptcoma INC_VAR parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line,this._$.first_column+1)}
  | for parA AS_VAR ptcoma EXPRESION ptcoma DECR_VAR parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line,this._$.first_column+1)}
  | for parA DEC_VAR EXPRESION ptcoma AS_VAR parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $4, $6, $9, this._$.first_line,this._$.first_column+1)}
  | for parA AS_VAR ptcoma EXPRESION ptcoma AS_VAR parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line,this._$.first_column+1)}
;

DOWHILE: do llaveA OPCIONESMETODO llaveC while parA EXPRESION parC ptcoma {$$ = new INSTRUCCION.nuevoDowhile($3, $7 , this._$.first_line,this._$.first_column+1)}
;

IF: if parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoIf($3, $6 , this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC else llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoIfElse($3, $6, $10 , this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC ELSEIF {$$= new INSTRUCCION.nuevoIfConElseIf($3, $6, $8, null, this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC ELSEIF else llaveA OPCIONESMETODO llaveC {$$= new INSTRUCCION.nuevoIfConElseIf($3, $6, $8, $11, this._$.first_line,this._$.first_column+1)}
;

ELSEIF: ELSEIF CONEIF {$1.push($2); $$=$1;}
      | CONEIF {$$=[$1];}
;

CONEIF: else if parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoElseIf($4, $7 , this._$.first_line,this._$.first_column+1) }
;

SWITCH: switch parA EXPRESION parC llaveA CUERPOSWITCH DEFAULT llaveC {$$= new INSTRUCCION.nuevoSwitch($3, $6, $7, this._$.first_line,this._$.first_column+1)}
      | switch parA EXPRESION parC llaveA CUERPOSWITCH llaveC {$$= new INSTRUCCION.nuevoSwitch($3, $6, null, this._$.first_line,this._$.first_column+1)}
      | switch parA EXPRESION parC llaveA DEFAULT llaveC {$$= new INSTRUCCION.nuevoSwitch($3, null, $6, this._$.first_line,this._$.first_column+1)}
; 

CUERPOSWITCH: CUERPOSWITCH CONSWITCH {$1.push($2); $$=$1;}
            | CONSWITCH {$$=[$1];}
;

CONSWITCH: case EXPRESION dospuntos OPCIONESMETODO {$$ = new INSTRUCCION.nuevoCase($2, $4 , this._$.first_line,this._$.first_column+1) }
;

DEFAULT: default dospuntos OPCIONESMETODO {$$ = $3}
;

BREAK: break ptcoma {$$ = new INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1)}
;

CONTINUE: continue ptcoma {$$ = new INSTRUCCION.nuevoContinue(this._$.first_line,this._$.first_column+1)}
;





