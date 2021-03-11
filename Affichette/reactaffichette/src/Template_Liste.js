import React from 'react'

class TemplateListe extends React.Component {
    render() {
      return (
        <li id="message">
            
            <div class="row">
                <div>
                    <p>{this.props.id}</p>
                </div>
                <div>
                    <p>{this.props.nom}</p>
                </div>
                <div>
                    <p>{this.props.couleur}</p>
                </div>
                <div>
                    <p>{this.props.taille}</p>
                </div>
                <div>
                    <p>{this.props.idLogement}</p>
                </div>
            </div>
 
             
        </li>
      );
    }
  }
  export default TemplateListe