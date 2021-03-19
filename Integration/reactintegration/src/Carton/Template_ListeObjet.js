import React from 'react'

class TemplateListeObjet extends React.Component {
  render() {
    return (
      <li>
        {this.props.nom}
      </li>
    );
  }
}
export default TemplateListeObjet