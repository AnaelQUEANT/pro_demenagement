import React from 'react'

import {Link} from 'react-router-dom'
import './ListeCartons.css';


class TemplateNavigation extends React.Component {
    render() {
      return (
        <ul class="pager">
            <Link to={this.props.nom}>
                <li class="previous"><input type="button" value="<- Précédent"/></li>

            </Link>
            <li><a href="/ListeSalles">Pièces</a></li>
        </ul>
     
      );
    }
  }
  export default TemplateNavigation