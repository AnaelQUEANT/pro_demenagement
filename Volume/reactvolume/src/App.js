import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Recapitulatif from './Recapitulatif';
import CalculateurVolume from './CalculateurVolume';
import TableauDeBord from './TableauDeBord';
sessionStorage.setItem('cle','valeur');

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path='' component={App} /> */}
        <Route exact path='/CalculateurVolume' component={CalculateurVolume} />
        <Route exact path='/Recapitulatif' component={Recapitulatif} />
        <Route exact path='/TableauDeBord' component={TableauDeBord} />
      </div>
      <Link to="CalculateurVolume" > CalculateurVolume </Link>
      <Link to="TableauDeBord" > Tableau de bord </Link>
      {/* <Link to="Recapitulatif" > CalculateurVolume </Link> */}
    </Router>
    
    
  );
}

export default App;
