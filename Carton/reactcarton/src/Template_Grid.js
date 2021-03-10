import React from 'react'


class TemplateGrid extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div class="grid-item" onClick="" >
            {this.props.nbCarton}
            <a class="nav-link" aria-current="page" href={"ListeCartons?id="+this.props.mess}>{this.props.mess}</a>
        </div>
      )
    }
  }
  export default TemplateGrid