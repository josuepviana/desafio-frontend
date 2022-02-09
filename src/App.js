import './App.css';
import Simulador from './resources/simulador/Simulador.js';
import Resultado from './resources/resultado/Resultado';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Simulador de Investimentos</h1>

        <div className="App-container">
          <Simulador></Simulador>

        </div>
      </header>
    </div>
  );
}

export default App;
