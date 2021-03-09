import React from 'react'


class CreationCarton extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">Example label</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"></input>
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Another label</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
            </div>

        </form>
      )
    }
  }
  export default CreationCarton
