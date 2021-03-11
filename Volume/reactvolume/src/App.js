import './App.css';
import { MobilierList } from './components/MobilierList';
import { SalleList } from './components/SalleList';
import { CompteurVolume } from './components/CompteurVolume';

function App() {
  return (
    <div className="App">
      <div className="menu">
        <button type="button" className="btn">
          <span className="input-group-text glyphicon glyphicon-menu-left" aria-hidden="true">-
          </span>
        </button>
        <h1 className="titre"> Calculateur de volume </h1>
      </div>
    
      <div>
        <SalleList />
      </div>
      <MobilierList />
      <CompteurVolume />
    </div>
  );
}

export default App;
