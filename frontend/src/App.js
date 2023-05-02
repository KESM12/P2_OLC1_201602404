import './App.css';
import  { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [resultado, setResultado] = useState('');
  function analizar(){
    axios.post('http://localhost:5000/analizar', JSON.stringify({
      entrada: code
    }),{headers:{"Content-Type" : "application/json"}})
    .then(function (response) {
      console.log(response);
      setResultado(response.data.resultado);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function crearAst(){
    axios.get('http://localhost:5000/CrearAST')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function SubirArchivo(){
    var SubirArch = document.getElementById('btnSubArch');
    var jsonFileInput = document.getElementById('json-file-input');

    SubirArch.addEventListener('click', function () {
      jsonFileInput.click();
    });

    jsonFileInput.addEventListener('change', function () {
      var file = jsonFileInput.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var fileContent = e.target.result;
        // Hacer lo que necesites con el contenido del archivo
        //console.log(fileContent,"hola");
        setCode(fileContent);
      };
      reader.readAsText(file);
      //console.log("hiloo", file);  
    });
    
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className='editores' >
          <div className='opciones'>
            <Button variant="primary" className="boton" onClick={() => { analizar() }}>Analizar</Button>
            <Button variant="primary" className="boton" onClick={() => { crearAst() }}>CrearAST</Button>
            <Button variant="primary" className="boton" onClick={() => { setCode('') }}>Limpiar</Button>
            <Button variant="primary" className="boton" onClick={() => { setResultado('') }}>Limpiar Resultado</Button>
            <Button variant="primary" className="boton" id="btnSubArch" onClick={() => { SubirArchivo()}}>Subir Archivo</Button>
            <input type="file" id="json-file-input" accept=".tw"></input>
          </div>
        <div className='containerE'>
          <div className="editor1">
            <MonacoEditor
              width="700"
              height="600"
              language="javascript"
              theme="vs-dark"
              value={code}
              options={{ minimap: { enabled: false } }}
              onChange={setCode}
            />
          </div>
          <div className="editor2">
            <MonacoEditor
              width="700"
              height="600"
              language="javascript"
              theme="vs-dark"
              value={resultado}
              options={{ readOnly: true }}
            />
          </div>
        </div>
          
        </div>
      </header>
    </div>
  );
}

export default App;


//aqui es donde se jala todo el codigo de react y se muestra en el navegador para poder usar el backend