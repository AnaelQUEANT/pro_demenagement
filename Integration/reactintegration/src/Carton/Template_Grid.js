import React from 'react'
import './CSS/ListeSalle.css';
import { Link } from 'react-router-dom'
import cartonSelect from './Image/SelectCarton.PNG';

class TemplateGrid extends React.Component {
  render() {
    return (
      <div className="col-4 flex-column btn_carton_virtuel" height="100%">
        <Link to={"ListeCartons?id=" + this.props.id}>
          <label className="nbCarton"><b>{this.props.nbCarton}</b></label>
          <img className="image_carton_virtuel" src={cartonSelect} width="100%" height="80%" alt="Carton virtuel"></img>
        </Link>
        <label className="texte_carton_virtuel">{this.props.mess}</label>
      </div>
    )
  }
}
export default TemplateGrid