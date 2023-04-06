/* Definición Léxica */

%lex
%options case-insensitive
%x string
%%


\s+ /*salto de espacios en blanco*/
"//".*             /*comentario lineal*/
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /*comentario multilinea*/
[ \r\t]+           
\n                 
(\/\/).* 



"int"               return 'Rint';
"double"            return 'Rdouble';
"boolean"           return 'Rboolean';
"char"              return 'Rchar';
"string"            return 'Rstring';
"if"                return 'Rif';
"else"              return 'Relse';
"switch"            return 'Rswitch';
"case"              return 'Rcase';
"default"           return 'Rdefault';
"void"              return 'Rvoid';
"print"		        return 'Rprint';
"return"            return 'Rretorno';
"continue"          return 'Rcontinue';
"toString"          return 'RtoString';
"toLower"           return 'RtoLower';
"toUpper"           return 'RtoUpper';
"round"             return 'Rround';
"truncate"          return 'Rtruncate';
"while"             return 'Rwhile';
"break"             return 'Rbreak';
"for"               return 'Rfor';
"new"               return 'Rnew';
"list"              return 'Rlist';
"add"               return 'Radd';
"exec"              return 'Rexec';
"length"            return 'Rlength';
"typeof"            return 'Rtypeof';
"do"                return 'Rdo';
"toCharArray"       return 'Rtochar';
"true"              return 'Rtrue';
"false"             return 'Rfalse';
"main"              return 'Rmain';



"."                 return 'PUNTO';
":"                 return 'DPUNTOS'
";"                 return 'PTCOMA';
","                 return 'COMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZR';
"]"                 return 'CORDER';
"{"                 return 'LLAVEIZQ';
"}"                 return 'LLAVEDER';



"++"                return 'INCRE';
"--"                return 'DECRE';
">="                return 'MAYORI';
"<="                return 'MENORI';
"=="                return 'IGUALDAD';
"!="                return 'DIFERENTE';
"="                 return 'IGUAL';
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIV';
"%"                 return 'MOD';
"^"                 return 'POT'; //exponente
"?"                 return 'TERNARIO'; //RTER
">"                 return 'MAYOR';
"<"                 return 'MENOR';
"&&"                return 'AND';
"||"                return 'OR';
"!"                 return 'NOT';

[a-zA-Z][a-zA-Z0-9_]*   return 'IDENTIFICADOR';
[0-9]+\b                return 'ENTERO'; 
[0-9]+("."[0-9]+)+\b    return 'DECIMAL';
["\""]([^"\""])*["\""]  return 'STRING'
["\'"]([^"\'"])*["\'"]  return 'CHAR'

["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'Cadena';}

<<EOF>>             return'EOF'
.                   {
                        console.log('Este es un error léxico: ' + yytext + ', en la linea: '+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                    }

/lex
%{
const TIPO_DATO = require("../Enums/TipoDato");
const INSTRUCCION = require("../controladores/Instrucciones/Instruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
%}

/* Asociación de operadores y precedencia */
%left JError
%left 'OR'
%left 'AND'
%right 'NOT'
%right 'FCAST'
%left 'IGUALDAD' 'MENOR' 'MENORI' 'MAYOR' MAYORI' 'DIFERENTE'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIV' 'MOD'
%left 'POT'
%left UMENOS

%start INICIO

%% /* Definición de la gramática */

INICIO: OPCIONESCUERPO EOF{return $1;}
;
OPCIONESCUERPO: OPCIONESCUERPO CUERPO{$1.push($2); $$=$1;}
            |CUERPO {$$=[$1];}
;
CUERPO: DEC_VAR ptcoma {$$=$1;}                                           //DECLARACION DE CADA COMPONENTE DEL CUERPO DE MANERA RECURSIVA
        |ASIG_VAR ptcoma {$$=$1;}
        |METODOS {$$=$1;}
        |MAIN {$$=$1;} 

        
;
METODOS: Rvoid identificador parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)}
        
;

MAIN: Rmain identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoMain($2, null, this._$.first_line,this._$.first_column+1)}
      
       
;
DEC_VAR: TIPO identificador  {$$= INSTRUCCION.nuevaDeclaracion($2,null, $1,this._$.first_line, this._$.first_column+1)}
        |TIPO identificador IGUAL EXPRESION  {$$= INSTRUCCION.nuevaDeclaracion($2, $4, $1,this._$.first_line, this._$.first_column+1);
        }

;
ASIG_VAR: identificador IGUAL EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3,this._$.first_line, this._$.first_column+1)}
        
;
TIPO: Rint{$$= TIPO_DATO.ENTERO}
    |Rdouble{$$= TIPO_DATO.DECIMAL}
    |Rchar {$$= TIPO_DATO.CHAR}
    |Rboolean{$$= TIPO_DATO.BOOL}
    |Rstring {$$= TIPO_DATO.CADENA}
;
INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$$ = $1; $1.push($2);}
            |INSTRUCCION {$$ = [$1];}

;
INSTRUCCION: DEC_VAR ptcoma {$$=$1;}                                           //DECLARACION DE CADA COMPONENTE DEL CUERPO DE MANERA RECURSIVA
        |ASIG_VAR ptcoma {$$=$1;}
        |PRINT {$$=$1;}

;
PRINT: Rprint parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1)}
;
EXPRESION: EXPRESION suma EXPRESION{$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line, this._$.first_column+1);}
         | EXPRESION div EXPRESION   {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line, this._$.first_column+1);}
         | EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menor EXPRESION    {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line, this._$.first_column+1);}
         | EXPRESION mayor EXPRESION    {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menorIgual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line, this._$.first_column+1);}
         | EXPRESION mayorIgual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line, this._$.first_column+1);}
         | EXPRESION diferente EXPRESION  {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line, this._$.first_column+1);}
         | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line, this._$.first_column+1);}
         | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line, this._$.first_column+1);}
         | menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.UNARIA,this._$.first_line, this._$.first_column+1);}
         | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria(null,$2, TIPO_OPERACION.NOT,this._$.first_line, this._$.first_column+1);}
         | parA EXPRESION parC {$$=$2}
         | EXPRESION IGUALDAD EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALDAD,this._$.first_line, this._$.first_column+1);}
         | decimal {$$= INSTRUCCION.nuevoValor(Number($1),TIPO_VALOR.DECIMAL,this._$.first_line, this._$.first_column+1);}
         | entero {$$= INSTRUCCION.nuevoValor(Number($1),TIPO_VALOR.ENTERO,this._$.first_line, this._$.first_column+1);}
         | Rtrue {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
         | Rfalse {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
         | string {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CADENA,this._$.first_line, this._$.first_column+1);}
         | identificador{$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR,this._$.first_line, this._$.first_column+1);}
         | char {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CHAR,this._$.first_line, this._$.first_column+1);}
;