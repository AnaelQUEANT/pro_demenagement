import React from 'react'
import './CSS/StyleCheckBox.css';

class TemplateListeObjet extends React.Component {
  render() {
    return (

      <div >

        <input type="checkbox" class="demo5" id={"id" + this.props.id} />
        <label>{this.props.nom}</label>

      </div>

    );
  }
}
export default TemplateListeObjet