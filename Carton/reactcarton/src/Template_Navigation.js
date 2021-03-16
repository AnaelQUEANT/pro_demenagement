import React from 'react'
import retour from './Image/chevron_left.png';
import {Link} from 'react-router-dom'
import './ListeCartons.css';


class TemplateNavigation extends React.Component {
    render() {
      return (
        <ul class="pager">
            <Link to={this.props.nom}>
                <img className="retour" src={retour} width="15%"  alt="Lien modif de carton"></img>
                
            </Link>
   
        </ul>
     
      );
    }
  }
  export default TemplateNavigation