import React, { Component } from 'react'
import {
    BrowserRouter,
    Link,
    Route,
    Switch
} from 'react-router-dom'

import Affichette from './Affichette.js'
import Logement from './Logement.js'
import AffichetteLogement from './AffichetteLogement.js'
import Etiquette from './Etiquette.js'
import Test from './QRgenerator.js'

class App extends React.Component {

  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div>
                <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
                    <div>
                         <Switch>
                            <Route path="/Affichette" component={Affichette} />
                            <Route path="/Logement" component={Logement}/>
                            <Route path="/AffichetteLogement" component={AffichetteLogement}/>
                            <Route path="/Etiquette" component={Etiquette}/>
                            <Route path="/Test" component={Test}/>
                            <Route path="/" component={Affichette} />
                       </Switch>
                    </div>
                </BrowserRouter>


      </div>
    )
  }
}

export default App