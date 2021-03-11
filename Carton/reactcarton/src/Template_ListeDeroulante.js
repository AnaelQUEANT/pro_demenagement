import React from 'react'



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