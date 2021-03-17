import React from 'react'
import retour from './Image/chevron_left.png';
import { Link } from 'react-router-dom'
import './CSS/BarreDeNav.css';
import ListeSalles from './Liste_Salles';
class TemplateNavigation extends React.Component {
  render() {
    return (
      <nav className="row laBarreDeNav">
        <div className="col-3">
          <Link to={this.props.nom}>
            <img className="imageNav" src={retour} width="80%" alt="Lien modif de carton"></img>
          </Link>
        </div>
        <div className="col-3">
          <Link to="ListeSalles">
            <label>Liste salles</label>
          </Link>
        </div>
      </nav>
    );
  }
}
export default TemplateNavigation