import React from 'react'
import {Link} from 'react-router-dom'

class TemplatePiece extends React.Component {
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

            <Link class="le-link" to={"Etiquette?id="+this.props.id}>
              <button type="button"  className="btn btn-outline-danger">
              Voir étiquette
              </button>
            </Link>
            </tr>

        </tbody>
 
             
      );
    }
  }
  export default TemplatePiece