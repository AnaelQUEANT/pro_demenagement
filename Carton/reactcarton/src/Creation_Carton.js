import React from 'react'


class CreationCarton extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <form>
            <br/>
            <div class="form-group">
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Destination"></input>
            </div>
            <br/>
            <div class="form-group">
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Origine"/>
            </div>
            <br/>
            <div>
                <div class="row">
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" placeholder="Largeur"></input>
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" placeholder="Longueur"></input>
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" placeholder="Hauteur"></input>
                </div>
            </div>
            

        </form>
      )
    }
  }
  export default CreationCarton
