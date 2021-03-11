import React from 'react'

class TemplateListe extends React.Component {
    render() {
      return (

        <tbody id="message">
            
            <tr classname="row">
                <td className="col-3">
                    <p>{this.props.id}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.nom}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.couleur}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.taille}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.idLogement}</p>
                </td>
                <td className="col-3">
                    <button>Imprimer</button>
                </td>
            </tr>

        </tbody>
 
             
      );
    }
  }
  export default TemplateListe