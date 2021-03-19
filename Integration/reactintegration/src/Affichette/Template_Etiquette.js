import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import QRcode from 'qrcode.react'

class TemplateEtiquette extends React.Component {
    render() {
      return (

        <tbody id="message">
            
            <tr classname="row">
                <td>
                    {
                        <QRcode 
                            id="myqr"
                            value={"http://localhost:3000/Carton?id="+this.props.id} 
                            size={100}
                            includeMargin={true}
                        />
                    }
                </td>
                <td className="col-3">
                    <p>{this.props.origine}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.description}</p>
                </td>
                <td className="col-3">
                    <p>{this.props.destination}</p>
                </td>

            </tr>

        </tbody>
 
             
      );
    }
  }
  export default TemplateEtiquette