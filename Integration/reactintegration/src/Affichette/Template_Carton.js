import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '../../@material-ui/core'
import {ArrowBack, GetApp} from '../../@material-ui/icons'
import QRcode from '../../qrcode.react'

class TemplateCarton extends React.Component {
    render() {
      return (

        <tbody id="message">
            
            <tr classname="row">
                <td className="col-3">
                    <p>{this.props.contenu}</p>
                </td>

            </tr>

        </tbody>
 
             
      );
    }
  }
  export default TemplateCarton