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
              <div>
                <label>Largeur</label>
                <input type="number"  class="form-control" id="formGroupExampleInput" placeholder={this.props.largeur}></input>
              </div>
              <br/>
              <div>
                <label>Longueur</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder={this.props.longueur}></input>
              </div>
              <br/>
              <div>
                <label>Hauteur</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder={this.props.hauteur} ></input>
              </div>
            </div>
            <br/>
        </form>
      );
    }
  }
  export default Template_FormulaireModification