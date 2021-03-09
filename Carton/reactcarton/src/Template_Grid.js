import React from 'react'


class TemplateGrid extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div class="grid-item" onClick="" >
            {this.props.nbCarton}
            <a class="nav-link" aria-current="page" href="ListeCartons">{this.props.mess}</a>
        </div>
      )
    }
  }
  export default TemplateGrid