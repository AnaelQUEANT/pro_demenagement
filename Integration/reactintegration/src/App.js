import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import ListeSalles from './Carton/Liste_Salles.js'
import CreationCarton from './Carton/Creation_Carton.js'
import ListeCartons from './Carton/Liste_Cartons.js'
import ModifierCarton from './Carton/Modifier_Carton.js'
import MenuCarton from './Carton/Menu_Carton.js'
import Recapitulatif from './Volume/Recapitulatif';
import CalculateurVolume from './Volume/CalculateurVolume';
import TableauDeBord from './Volume/TableauDeBord';
import Affichette from './Affichette/Affichette.js'
import Logement from './Affichette/Logement.js'
import AffichetteLogement from './Affichette/AffichetteLogement.js'
import Etiquette from './Affichette/Etiquette.js'
import Carton from './Affichette/Carton.js'
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <div>
            <Switch>
              <Route path="/ListeSalles" component={ListeSalles} />
              <Route path="/CreationCarton" component={CreationCarton} />
              <Route path="/ListeCartons" component={ListeCartons} />
              <Route path="/ModifierCarton" component={ModifierCarton} />
              <Route exact path="/MenuCarton" component={MenuCarton} />
              <Route exact path='/CalculateurVolume' component={CalculateurVolume} />
              <Route exact path='/Recapitulatif' component={Recapitulatif} />
              <Route path="/Affichette" component={Affichette} />
              <Route path="/Logement" component={Logement}/>
              <Route path="/AffichetteLogement" component={AffichetteLogement}/>
              <Route path="/Etiquette" component={Etiquette}/>
              <Route path="/Carton" component={Carton} />
              <Route exact path='/' component={TableauDeBord} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
export default App