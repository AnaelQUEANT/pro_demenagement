import React from 'react'
import './ListeSalle.css';


class TemplateListeDeroulante extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
            <option>{this.props.nom}</option>
      )
    }
  }
  export default TemplateListeDeroulante