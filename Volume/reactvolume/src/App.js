import './App.css';
import { MobilierList } from './components/MobilierList';
import { SalleList } from './components/SalleList';

function App() {
  return (
    <div className="App">
      <h1> Calculateur de volume </h1>
      <SalleList />
      <MobilierList />
    </div>
  );
}

export default App;
