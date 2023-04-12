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
  return (
    <div className="App">
      <header className="App-header">
      <div className='editores' >
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
          <div>
            <Button variant="primary" className="boton" onClick={()=>{analizar()} }>Analizar</Button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;


//aqui es donde se jala todo el codigo de react y se muestra en el navegador para poder usar el backend