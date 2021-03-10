import React from 'react'

class TemplateListe extends React.Component {
    render() {
      return (
        <li id="message">
            
            <div class="row">
                <div>
                    <p>{this.props.photo}</p>
                </div>
                <div>
                    <p>{this.props.id}</p>
                </div>
                <div>
                    <p>{this.props.origine} vers {this.props.destination}</p>
                    <p>Dim : {this.props.dim}</p>
                    <p>{this.props.fragile}</p>
                </div>
                <input type="button" value="Modifier"></input>
            </div>
 
             
        </li>
      );
    }
  }
  export default TemplateListe