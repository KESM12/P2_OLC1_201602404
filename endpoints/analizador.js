const Ambito = require("../controladores/Ambito/Ambito")
const Global = require("../controladores/Instruccion/Global")



module.exports=(parser, app)=>{

    var prueba;
    var ast;
    app.post('/analizar',(req,res)=>{
         prueba = req.body.entrada
             ast = parser.parse(prueba)
            //console.log(ast)
            const AmbitoGlobal= new Ambito(null,"Global")
            var cadena =Global(ast, AmbitoGlobal)

            var resultado= {
                arbol: ast,
                resultado:cadena

            }
           
            
            res.send(resultado)
        
    })
    
    
}

// const Ambito = require("../controladores/Ambito/Ambito");
// const Global = require("../controladores/Instrucciones/Global");

// module.exports = (parse, app ) => {
//     var prueba;
//     var ast;
//     app.post('/analizador', (req, res) => {
//         prueba = req.body,entrada;
//         ast = parse(prueba);
//         const AmbitoGlobal = new Ambito(null, "Global");
//         var cadana = Global(ast, AmbitoGlobal);
//         var resultado = {
//             arbol: ast, 
//             resultado: cadana
//         }

//         res.send(resultado);
//     })
// }