import React from 'react'

class TemplateListeDeroulante extends React.Component {
  render() {
    return (
      <option>{this.props.nom}</option>
    )
  }
}
export default TemplateListeDeroulante