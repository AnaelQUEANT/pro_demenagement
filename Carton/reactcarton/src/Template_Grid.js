import React from 'react'
import './ListeSalle.css';
import {Link} from 'react-router-dom'
import cartonSelect from './Image/SelectCarton.PNG';

class TemplateGrid extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="col-4 flex-column btn_carton_virtuel" height="100%">
            <Link to={"ListeCartons?id="+this.props.id}>
              <label className="nbCarton"><b>{this.props.nbCarton}</b></label>
              <img className="image_carton_virtuel" src={cartonSelect} width="100%" height="80%" alt="Lien select carton (Image absente)"></img>
              {/*
              <button type="button"  className="btn btn-outline-danger">
                {this.props.nbCarton}
                <br/>
                {this.props.mess}
              </button>
              */}
            </Link>
            <label className="texte_carton_virtuel">{this.props.mess}</label>
            
        </div>
      )
    }
  }
  export default TemplateGrid