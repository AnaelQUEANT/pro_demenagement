import React from 'react'

class TemplateListe extends React.Component {
    render() {
      return (

        <div className="col-3"  class="affichette">
            <p style={{"margin": "auto"}}>{this.props.nom}</p>
        </div>
             
      );
    }
  }
  export default TemplateListe