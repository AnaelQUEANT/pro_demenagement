import React from 'react'
import './CSS/StyleCheckBox.css';

class TemplateListeObjet extends React.Component {
  render() {
    return (
      <tr>
        <td><label>{this.props.nom}</label></td>
        <td><input type="checkbox" class="demo5" id={"id" + this.props.id} /></td>
      </tr>
      /*
        <div className="row">
          <div className="col-2">
            <label>{this.props.nom}</label>
            <input type="checkbox" class="demo5" id={"id" + this.props.id} />
          </div>
        </div>
  */
    );
  }
}
export default TemplateListeObjet