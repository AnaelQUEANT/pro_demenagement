import React from 'react'
import {Link} from 'react-router-dom'

class TemplateLogement extends React.Component {
    render() {
      return (

        <tbody id="message">
            
            <tr classname="row">
                <td className="col-3">
                    <p>{this.props.id}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.adresse}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.etage}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.ascenseur}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.type}</p>
                </td>

            <Link class="le-link" to={"AffichetteLogement?id="+this.props.id}>
              <button type="button"  className="btn btn-outline-danger">
              Voir affichette
              </button>
            </Link>
            </tr>

        </tbody>
 
             
      );
    }
  }
  export default TemplateLogement