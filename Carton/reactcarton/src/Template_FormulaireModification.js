import React from 'react'

class Template_FormulaireModification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      tab: [],
      text2: '',
      tab2: [],
      leTest: 'try',
      inputLongueur: this.props.longueur,
      inputLargeur: this.props.largeur,
      inputHauteur: this.props.hauteur,
      origine: this.props.origine,
      nameError: '',
      hauteurError: '',
      largeurError: '',
      longueurError: '',
      origineError: '',
      inputFragile: '',
      inputDestination: this.props.destination,
      selectCouleur: '',
      inputFile: '',
      idDestination: '',
      valID: ''
    };
  }

  handleChange = event => {
    console.log(event.target.value + " et " + [event.target.id]);
    this.setState({ [event.target.id]: event.target.value });
  };


  render() {
    return (
      <form>
        <br />
        <div>
          <form>
            <div class="form-group">
              {this.props.photo}
            </div>
          </form>
        </div>
        <br />
        <select id="selectCouleur" width="100%" value={this.props.couleur} onChange={this.handleChange}>
          <option></option>
          <option>Rouge</option>
          <option>Bleu</option>
          <option>Vert</option>
          <option>Jaune</option>
          <option>Violet</option>
        </select>
        <br />
        <div>
          <div>
            <input type="checkbox" id="Fragile" name="Fragile" value={this.state.fragile} />
            <label for="Fragile">Fragile</label>
          </div>
        </div>
        <br />
        <div class="form-group">
          <input type="text" class="form-control" id="destination" value={this.state.inputDestination} placeholder="Destination" onChange={this.handleChange}></input>
        </div>
        <br />
        <div class="form-group">
          <input type="text" class="form-control" id="origine" value={this.state.origine} onChange={this.handleChange} placeholder="Origine" />
        </div>
        <br />
        <div>
          <div>
            <label>Largeur</label>
            <input type="number" class="form-control" id="inputLargeur" value={this.state.inputLargeur} onChange={this.handleChange} placeholder="Largueur"></input>
          </div>
          <br />
          <div>
            <label>Longueur</label>
            <input type="text" class="form-control" id="inputLongueur" value={this.state.inputLongueur} onChange={this.handleChange} placeholder="Longueur"></input>
          </div>
          <br />
          <div>
            <label>Hauteur</label>
            <input type="text" class="form-control" id="inputHauteur" value={this.state.inputHauteur} onChange={this.handleChange} placeholder="Hauteur"></input>
          </div>
        </div>
        <br />
      </form>
    );
  }
}
export default Template_FormulaireModification