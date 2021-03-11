import React from 'react'

class TemplateListeObjet extends React.Component {
    render() {
      return (
        <div>
            <input type="checkbox" id={this.props.id} name={this.props.id}/>
            {this.props.nom}
        </div>
      );
    }
  }
  export default TemplateListeObjet