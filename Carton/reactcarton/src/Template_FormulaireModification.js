import React from 'react'

class Template_FormulaireModification extends React.Component {
    render() {
      return ( 
        <form>
            <br/>
            <div>
              <form>
                <div class="form-group">
                    {this.props.photo}
                </div>
              </form>
            </div>
            <br/>
            <div>
                <div>
                  <input type="color" id="head" name="head" value={this.props.couleur} />
                </div>
            </div>
            <br/>
            <div>
              <div>
                <input type="checkbox" id="Fragile" name="Fragile" value={this.props.fragile} />
                <label for="Fragile">Fragile</label>
              </div>
            </div>
            <br/>
            <div class="form-group">
                <input type="text" class="form-control" id="formGroupExampleInput" value={this.props.destination} placeholder="Destination"></input>
            </div>
            <br/>
            <div class="form-group">
                <input type="text" class="form-control" id="formGroupExampleInput2" value={this.props.origine} placeholder="Origine"/>
            </div>
            <br/>
            <div>
                <div class="row">
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" value={this.props.largeur} placeholder="Largeur"></input>
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" value={this.props.longueur} placeholder="Longueur"></input>
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" value={this.props.hauteur} placeholder="Hauteur"></input>
                </div>
            </div>
            <br/>
        </form>
      );
    }
  }
  export default Template_FormulaireModification