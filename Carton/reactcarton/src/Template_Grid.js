import React from 'react'


class TemplateGrid extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div class="grid-item" onClick="" >
            <a class="nav-link" aria-current="page" href="CreationCarton">{this.props.mess}</a>
        </div>
      )
    }
  }
  export default TemplateGrid