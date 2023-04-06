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
//console.log(JSON.stringify($1,null,2));
INI
    : LINS EOF  {imprimibles = [];errores = [];EntornoGlobal = Entorno(null);EjecutarBloque($1, EntornoGlobal); return {Entorno:EntornoGlobal, Imprimibles:imprimibles,Errores:errores,Arbol:JSON.stringify($1,null,2)}}
    | error EOF {errores.push("Sintactico","Error en : '"+yytext+"'",this._$.first_line,this._$.first_column); console.log("Sintactico","Error en : '"+yytext+"'",this._$.first_line,this._$.first_column)}
;

LINS 
    : LINS INS   { $$=$1; $$.push($2) }
    | INS        { $$=[]; $$.push($1) }
;

INS 
    : Rprint PARIZQ Exp PARDER PTCOMA {$$=Imprimir("print",$3);}
    | DECLARAR  PTCOMA                {$$ = $1}
    | ASIGNAR   PTCOMA                {$$ = $1}
    | IF                              {$$ = $1}
    | DOWHILE PTCOMA                  {$$ = $1}
    | WHILE                           {$$ = $1}
    | FOR                             {$$ = $1}
    | SWITCH                          {$$ = $1}
    | Rbreak PTCOMA                   {$$ = Romper()}
    | Rcontinue PTCOMA                {$$ = Continuar()}
    | FUNCIONES                       {$$ = $1}
    | LLAMADA  PTCOMA                 {$$ = $1}
    | RETORNO                         {$$ = $1}
	| error INS {errores.push("Se recupero en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); console.log("Sintactico","Error en : '"+yytext+"'",this._$.first_line,this._$.first_column);console.log("Se recupero en ",yytext," (",this._$.last_line,",",this._$.last_column,")");}
;

RETORNO   
    : Rretorno Exp PTCOMA    { $$ = Retorno($2); }
    | Rretorno PTCOMA        { $$ = Retorno(Simbolo("@Vacio@","void")); }
;

DECLARAR
    : TIPO ID                                                       {$$ = Crear($2,$1,null,null,null)}
    | TIPO ID IGUAL Exp                                             {$$ = Crear($2,$1,null,null,$4)}
    | TIPO CORIZR CORDER ID IGUAL Rnew TIPO CORIZR Exp CORDER       {$$ = Crear($4,$1,$7,$9,null)} 
    | TIPO CORIZR CORDER ID IGUAL LLAVEIZQ L_EXP LLAVEDER           {$$ = Crear($4,$1,$1,null,$7)}
    | Rlist MENOR TIPO MAYOR ID IGUAL Rnew Rlist MENOR TIPO MAYOR   {$$ = Crear($5,$3,$10,null,null)}
    | TIPO error PTCOMA                                             {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")")}
;

FUNCIONES
    : TIPO ID PARIZQ PARDER BLOQUE                  { $$ = Funcion($2,[],$1,$5); }
    | Rvoid ID PARIZQ PARDER BLOQUE                 { $$ = Funcion($2,[],"void",$5); }
    | TIPO ID PARIZQ PARAMETROS PARDER BLOQUE       { $$ = Funcion($2,$4,$1,$6); }
    | Rvoid ID PARIZQ PARAMETROS PARDER BLOQUE      { $$ = Funcion($2,$4,"void",$6); }
    | TIPO ID PARIZQ error BLOQUE                   {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;
PARAMETROS
    : PARAMETROS COMA TIPO ID   { $$=$1;$$.push(Crear($4,$3,null,null)) }
    | TIPO ID                   { $$=[];$$.push(Crear($2,$1,null,null)) }
;

ASIGNAR
    : ID IGUAL Exp                                      {$$ = Asignar($1,$3,null)}
    | ID INCRE                                          {$$ = Asignar($1,NuevaOperacion(nuevoSimbolo($1,"ID"),nuevoSimbolo(parseFloat(1),"numero"),$2),null)}
    | ID CORIZR Exp CORDER IGUAL Exp                    {$$ = Asignar($1,$6,$3)}  
    | ID PUNTO Radd PARIZQ Exp PARDER                   {$$ = Asignar($1,$5,nuevoSimbolo("","lista"))} 
    | ID CORIZR CORIZR Exp CORDER CORDER IGUAL Exp      {$$ = Asignar($1,$8,NuevaOperacion($4,nuevoSimbolo(parseFloat(1),"numero"),"+"))}
    | ID error PTCOMA                                   {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")")}
;

INCRE
    : MAS MAS   {$$= $1}
    | MENOS MENOS {$$=$1}
;

TERNARIO
    : Exp TERNARIO Exp DPUNTOS Exp                  {$$ = Ternario($1,$3,$5)} 
    | Exp error PTCOMA                        {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

IF
    : Rif PARIZQ Exp PARDER BLOQUE              {$$ = Si($3,$5,null)}       //If(){}
    | Rif PARIZQ Exp PARDER BLOQUE Relse BLOQUE {$$ = Si($3,$5,$7)}         //If(){}else{}
    //| Rif PARIZQ Exp PARDER BLOQUE Relse IF 
    | Rif error LLAVEDER                        {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

SWITCH
    : Rswitch PARIZQ Exp PARDER LLAVEIZQ LCASOS Rdefault DPUNTOS LINS LLAVEDER  {$$ = Seleccionar($3,$6,$9)}
    | Rswitch PARIZQ Exp PARDER LLAVEIZQ LCASOS LLAVEDER                        {$$ = Seleccionar($3,$6,null)}
    | Rswitch error LLAVEDER                                                    {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

ELSEIF
    : Rif PARIZQ Exp PARDER BLOQUE        {$$=[];$$.push(ElseIf($3,$5))}
    | ELSEIF Rif PARIZQ Exp PARDER BLOQUE {$$=$1;$$.push(ElseIf($4,$6))}
    | Rif error PARDER
;

LCASOS
    :Rcase Exp DPUNTOS LINS               {$$=[];$$.push(Caso($2,$4));}
    |LCASOS Rcase Exp DPUNTOS LINS        {$$=$1;$$.push(Caso($3,$5));}
    |Rcase error PARDER                   {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

DOWHILE
    :Rdo BLOQUE Rwhile PARIZQ Exp PARDER    {$$ = HacerMientras($5,$2)}
    |Rdo error PTCOMA                       {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

WHILE
    :Rwhile PARIZQ Exp PARDER BLOQUE        {$$ = new Mientras($3,$5);}
    |Rwhile error PARDER                    {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

BLOQUE
    : LLAVEIZQ LINS LLAVEDER    {$$ = $2}
    | LLAVEIZQ LLAVEDER         {$$ = []}
    | LLAVEDER error LLAVEDER   {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

FOR
    :Rfor PARIZQ ASIGNAR PTCOMA Exp PTCOMA ACTUALIZAR PARDER BLOQUE         {$$ = Desde($3,$5,$7,$9)}
    |Rfor PARIZQ DECLARAR PTCOMA Exp PTCOMA ACTUALIZAR PARDER BLOQUE        {$$ = Desde($3,$5,$7,$9)}
    |Rfor error LLAVEDER                                                    {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

ACTUALIZAR
    : ID IGUAL Exp         {$$ = Actualizacion($1,$3)}
    | ID INCRE             {$$ = Actualizacion($1,NuevaOperacion(nuevoSimbolo($1,"ID"),nuevoSimbolo(parseFloat(1),"numero"),$2))}
    | ID error              {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

LLAMADA 
    : ID PARIZQ PARDER                  { $$=Llamada($1,[]); }
    | ID PARIZQ L_EXP PARDER            { $$=Llamada($1,$3); }
    | Rmain ID PARIZQ PARDER            { $$=Llamada($2,[]); }
    | Rmain ID PARIZQ L_EXP PARDER      { $$=Llamada($2,$4); }
;

CASTEO
    : PARIZQ TIPO2 PARDER Exp       {$$ = Casteo({Expresion:$4,Tipo:$2}, "casteo") }
    | PARIZQ error Exp              {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

TIPO2
    : Rint          {$$ = "numero"}
    | Rdouble       {$$ = "decimal"}
    | Rstring       {$$ = "cadena"}
    | Rchar         {$$ = "char"}
;

TIPO 
    : Rint          {$$ = "numero"}
    | Rdouble       {$$ = "decimal"}
    | Rstring       {$$ = "cadena"}
    | Rboolean      {$$ = "bool"}
    | Rchar         {$$ = "char"}
;
Exp 
    : Exp MAS Exp                                   { $$=NuevaOperacion($1,$3,"+"); }
    | Exp MENOS Exp                                 { $$=NuevaOperacion($1,$3,"-"); }
    | Exp POR Exp                                   { $$=NuevaOperacion($1,$3,"*"); }
    | Exp DIV Exp                                   { $$=NuevaOperacion($1,$3,"/"); }
    | Exp POT Exp                                   { $$=NuevaOperacion($1,$3,"^"); }
    | Exp MOD Exp                                   { $$=NuevaOperacion($1,$3,"%"); }
    | Exp MENOR Exp                                 { $$=NuevaOperacion($1,$3,"<"); }
    | Exp MAYOR Exp                                 { $$=NuevaOperacion($1,$3,">"); }
    | Exp DIFERENTE Exp                             { $$=NuevaOperacion($1,$3,"!="); }
    | Exp IGUALDAD Exp                              { $$=NuevaOperacion($1,$3,"=="); }
    | Exp MAYORI Exp                                { $$=NuevaOperacion($1,$3,">="); }
    | Exp MENORI Exp                                { $$=NuevaOperacion($1,$3,"<="); }
    | Exp AND Exp                                   { $$=NuevaOperacion($1,$3,"&&"); }
    | Exp OR Exp                                    { $$=NuevaOperacion($1,$3,"||"); }
    | Exp MAS MAS                                   { $$=NuevaOperacion($1,nuevoSimbolo(parseFloat(1),"numero"),"+")}
    | Exp MENOS MENOS                               { $$=NuevaOperacion($1,nuevoSimbolo(parseFloat(1),"numero"),"-")}
    | NOT Exp                                       { $$=NuevaOperacionUnario($2,"!"); }
    | MENOS Exp %prec UMENOS                        { $$=NuevaOperacionUnario($2,"umenos"); }
    | Cadena                                        { $$=nuevoSimbolo($1,"cadena"); }
    | Char                                          { $$=nuevoSimbolo($1,"char"); }
    | ID							                { $$=nuevoSimbolo($1,"ID");}
    | ID PARIZQ PARDER                              { $$=nuevoSimbolo({Id:$1,Params:[]},"funcion"); }
    | ID PARIZQ L_EXP PARDER                        { $$=nuevoSimbolo({Id:$1,Params:$3},"funcion"); }
    | ID CORIZR Exp CORDER                          { $$=nuevoSimbolo({Id:$1,Params:$3},"vector")}
    | ID CORIZR CORIZR Exp CORDER CORDER            { $$=nuevoSimbolo({Id:$1,Params:$4},"lista")}
    | NUMERO                                        { $$=nuevoSimbolo(parseFloat($1),"numero"); }
    | DECIMAL                                       { $$=nuevoSimbolo(parseFloat($1),"decimal"); }
    | TRUE                                          { $$=nuevoSimbolo(true,"bool"); }
    | FALSE                                         { $$=nuevoSimbolo(false,"bool"); }
    | PARIZQ Exp PARDER                             { $$=$2}
    | PARIZQ TIPO2 PARDER Exp     %prec FCAST       { $$ = nuevoSimbolo({Id:$4,Tipo:$2}, "casteo") }
    | RtoString PARIZQ Exp PARDER %prec FCAST       { $$ = nuevoSimbolo({Id:$3,Tipo:"cadena"}, "casteo") }
    | RtoLower PARIZQ Exp PARDER  %prec FCAST       { $$ = nuevoSimbolo({Id:$3,Tipo:"lower"}, "casteo") }
    | RtoUpper PARIZQ Exp PARDER  %prec FCAST       { $$ = nuevoSimbolo({Id:$3,Tipo:"upper"}, "casteo") } 
    | Rtruncate PARIZQ Exp PARDER  %prec FCAST      { $$ = nuevoSimbolo({Id:$3,Tipo:"truncate"}, "casteo") }
    | Rround PARIZQ Exp PARDER  %prec FCAST         { $$ = nuevoSimbolo({Id:$3,Tipo:"round"}, "casteo") }
    | Rlength PARIZQ Exp PARDER %prec FCAST         { $$ = nuevoSimbolo({Id:$3,Tipo:"length"}, "casteo")}
    | Rtypeof PARIZQ Exp PARDER %prec FCAST         { $$ = nuevoSimbolo({Id:$3,Tipo:"typeof"}, "casteo")}
;

L_EXP 
    :L_EXP COMA Exp                 { $$=$1;$$.push($3); }
    |Exp                            { $$=[];$$.push($1); }
;
