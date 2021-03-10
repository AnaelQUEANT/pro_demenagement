import React, { Component } from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

import ListeSalles from './Liste_Salles.js'
import CreationCarton from './Creation_Carton.js'
import ListeCartons from './Liste_Cartons.js'
import ModifierCarton from './Modifier_Carton.js'


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
                       </Switch>
                    </div>
                </BrowserRouter>


      </div>
    )
  }
}

export default App