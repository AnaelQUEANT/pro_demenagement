import React from 'react'
import boutonModif from './Image/bouton_modifier.png';
import ImageCarton from './Image/carton.png';
import ImageFragile from './Image/fragile.png';
import { Link } from 'react-router-dom'
import './CSS/ListeCartons.css';


class TemplateListe extends React.Component {
    render() {
        return (
            <div className="row col-12 carton-elem">
                <div className="col-2 photo-carton">
                    {/*{this.props.photo}*/}
                    <img className="ImageCarton" src={ImageCarton} width="200%" alt="image temporaire de carton"></img>
                </div>
                <div className="col-2 circle">
                    {this.props.id}
                </div>
                <div className="col-6 carton-info" >
                    <span>{this.props.origine} vers {this.props.destination}</span>
                    <br />
                    <span>Dim : {this.props.dim}</span>
                    <br />
                    <span id="x"><img className="ImageCarton" src={this.props.fragile} width="200%" alt=""></img></span>
                </div>
                <div className="col-2" >
                    <Link to={"ModifierCarton?id=" + this.props.id}>
                        <img className="boutonModif" src={boutonModif} width="200%" alt="Lien modif de carton"></img>

                    </Link>
                </div>
            </div>
        );
    }
}
export default TemplateListe