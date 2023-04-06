const Ambito = require("./Ambito");
const Global = require("./Global");

module.exports = (parse, app ) => {
    var prueba;
    var ast;
    app.post('/analizador', (req, res) => {
        prueba = req.body,entrada;
        ast = parse(prueba);
        const AmbitoGlobal = new Ambito(null, "Global");
        var cadana = new Global(ast, AmbitoGlobal);
        var resultado = {
            arbol: ast, 
            resultado: cadana
        }

        res.send(resultado);
    })
}