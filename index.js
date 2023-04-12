'use strict'
const express = require('express')
const bodParser = require('body-parser')
let cors = require('cors')

const app = express()
const parser = require('./analizador')

app.use(bodParser.json({limit:'50mb', extended:true}))
app.use(bodParser.urlencoded({limit:'50mb', extended:true}))
app.use(cors())

app.get('/',(req,res)=>{
    var respuesta={
        message:"Todo bien"
    }
    res.send(respuesta)
})

const analizar = require('./endpoints/analizador')(parser, app)
app.listen('5000', ()=>{
    console.log("Servidor en puerto 5000")
})

// 'use strict'
// const express = require('express');
// const bodParser = require('body-parser');
// let cors = require('cors');

// const parser = require('./analizador')

// const app = express()
// app.use(bodParser.json({limit:'50mb', extended:true}))
// app.use(bodParser.urlencoded({limit:'50mb', extended:true}))
// app.use(cors())

// app.get('/',(req, res)=>{
//     var respuesta ={
//         message:"It's ok."
//     }
//     res.send(respuesta)
// })


// const analizar = require('./endpoints/analizador')(parser, app)
// app.listen('5000', ()=>{
//     console.log("Servidor en puerto 5000")
// })


// analizar.post('/analizar', (req, res) => {
//     const entrada = req.body.data;
//     const ast = parser.parse(entrada);
//     const AmbitoGlobal = new Ambito(null, "Global");
//     const cadena = new Global(ast, AmbitoGlobal);
//     const resultado = {
//         arbol: ast,
//         resultado: cadena
//     }
//     res.send(resultado);
// });
