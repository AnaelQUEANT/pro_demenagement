import React from 'react'


class TemplateGrid extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div class="grid-item">
            {this.props.mess}
        </div>
      )
    }
  }
  export default TemplateGrid