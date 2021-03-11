import './App.css';
import { MobilierList } from './components/MobilierList';
import { SalleList } from './components/SalleList';
import { CompteurVolume } from './components/CompteurVolume';

function App() {
  return (
    <div className="App">
      <div className="menu">
        <button type="button" className="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
          <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
        </button>
        <h1 className="titre"> Calculateur de volume </h1>
      </div>
    
      <SalleList />
      <MobilierList />
      <div className="compteur">
        <CompteurVolume />
      </div>
      
    </div>
  );
}

export default App;
