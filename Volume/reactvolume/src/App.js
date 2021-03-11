import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Recapitulatif from './Recapitulatif';
import CalculateurVolume from './CalculateurVolume';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path='' component={App} /> */}
        <Route exact path='/CalculateurVolume' component={CalculateurVolume} />
        <Route exact path='/Recapitulatif' component={Recapitulatif} />
      </div>
      <Link to="CalculateurVolume" > CalculateurVolume </Link>
      <Link to="Recapitulatif" > CalculateurVolume </Link>
    </Router>
    
    
  );
}

export default App;
