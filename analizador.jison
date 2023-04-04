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
"case"              return 'Rcase"
"default"           return 'Rdefault"
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
