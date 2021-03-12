import React from 'react'
import {Link} from 'react-router-dom'

class TemplateEtiquette extends React.Component {
    render() {
      return (

        <tbody id="message">
            
            <tr classname="row">
                <td className="col-3">
                    <p>{this.props.origine}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.description}</p>
                </td>

            </tr>

        </tbody>
 
             
      );
    }
  }
  export default TemplateEtiquette