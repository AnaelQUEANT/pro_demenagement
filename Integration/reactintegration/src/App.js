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
              <Route exact path="/" component={MenuCarton} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
export default App