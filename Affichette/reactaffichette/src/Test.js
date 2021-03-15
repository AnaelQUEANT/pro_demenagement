import React from 'react'
import TemplateListe from './Template_Piece.js'

class Test extends React.Component {

	var React = require('react');
	var QRCode = require('qrcode.react');

React.render(
);

  constructor(props) {
    super(props);
      this.state = {
        value: '',
        text : '',
        tab : [],
        get : props.location.search
      };
  }

  render() {
    return (
      <div>
        <table>
        <thead>
        <tr> 
        	<th>ID</th> 
        	<th>Nom</th> 
        	<th>Couleur</th> 
        	<th>Taille</th> 
        	<th>Logement</th> 
        </tr>
        </thead>
        {this.state.text}
        </table>
      </div>
    )
  }

}
export default Test