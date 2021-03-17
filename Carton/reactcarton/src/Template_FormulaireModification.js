import React from 'react'
import './CSS/CreationCarton.css';
import cartonAjout from './Image/AjoutImage.PNG';
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
      destinationError: '',
      inputFragile: this.props.fragile,
      inputDestination: this.props.destination,
      selectCouleur: this.props.couleur,
      inputFile: '',
      idDestination: '',
      valID: '',
      get: props.location.search
    };
  }

  
  getArgument(elem) {
    var param = elem.split('=');
    return param[1];
  }

  handleChange = event => {
    console.log(event.target.value + " et " + [event.target.id]);
    this.setState({ [event.target.id]: event.target.value });
  };
  validate = () => {
    let hauteurError = "";
    let origineError = "";
    let largeurError = "";
    let longueurError = "";
    let destinationError = "";
    if (!this.state.inputLargeur) {
      largeurError = "Le largeur est vide";
    }
    if (!this.state.inputLongueur) {
      longueurError = "Le longueur est vide";
    }
    if (!this.state.inputHauteur) {
      hauteurError = "La hauteur est vide";
    }
    if (!this.state.origine) {
      origineError = "L'origine est vide";
    }
    if (!this.state.inputDestination) {
      origineError = "La destination est vide";
    }
    this.setState({ largeurError });
    this.setState({ longueurError });
    this.setState({ hauteurError });
    this.setState({ origineError });
    this.setState({ destinationError });
    if (!this.state.inputLargeur || !this.state.inputLongueur || !this.state.inputHauteur || !this.state.origine || !this.state.inputDestination) {
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      var elementCheck = document.getElementById('inputFragile').checked;
      var nomDestination = document.getElementById('inputDestination').value;
      var row = this.state.tab2.map(function (cell) {
        console.log("ICIIIIIIIII " + cell.nom + " et " + nomDestination + " donc " + cell.id);
        if (cell.nom == nomDestination) {
          this.state.idDestination = cell.id;

          return cell.id;
        }
      }.bind(this));
      try {
        let monAPI = "http://localhost:16500/UpdateCarton/" + this.getArgument(this.state.get);
        if (elementCheck) {
          elementCheck = 1;
        } else {
          elementCheck = 0;
        }
        console.log(this.state.origine + this.state.selectCouleur + this.state.inputLargeur + this.state.inputLongueur + this.state.inputHauteur + elementCheck + this.state.idDestination);

        fetch(monAPI, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            "origine": this.state.origine,
            "couleur": this.state.selectCouleur,
            "largeur": this.state.inputLargeur,
            "longueur": this.state.inputLongueur,
            "hauteur": this.state.inputHauteur,
            "fragile": elementCheck,
            "piece": this.state.idDestination
          })

        })
      } catch (e) {
        console.log(e);
      }


      /*var row = this.state.tab.map(function(cell) {
        var value = "id" + cell.id;
        var elemID = document.getElementByID(value).checked;
        if(elemID){
          try{
            let monAPI = "http://localhost:16500/ajoutObjetCarton";
            fetch(monAPI, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
              })
            })
          }catch(e){
            console.log(e);
          }
            this.state.idDestination = cell.id;
            return cell.id;       
        }
      }.bind(this));
      //this.setState(initialState);
      */
      this.props.history.push('/ListeSalles');
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />
          <div className="row">
            <img className="col-6" src={cartonAjout} alt="Lien select carton (Image absente)"></img>
            <div className="col-6">
              <div className="col-">
                <label>Couleur</label>
                <br />
                <select id="selectCouleur" width="100%" value={this.state.selectCouleur} onChange={this.handleChange}>
                  <option></option>
                  <option>Rouge</option>
                  <option>Bleu</option>
                  <option>Vert</option>
                  <option>Jaune</option>
                  <option>Violet</option>
                </select>
              </div>
              <br />
              <br />
              <div>
                <input type="checkbox" id="inputFragile" value={this.state.fragile} name="Fragile" onChange={this.handleChange} />
                <label for="Fragile">Fragile</label>
              </div>
            </div>
          </div>
          <br />
          <div class="form-group">
            <div class=" ">
              <input class="input100 form-control" type="text" name="name" placeholder="Destination" id="inputDestination" value={this.state.inputDestination} onChange={this.handleChange} />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.destinationError}
              </div>
            </div>
          </div>
          <br />
          <div class="form-group">
            <div class=" ">
              <input class="input100 form-control" type="text" name="name" placeholder="Origine" id="origine" value={this.state.origine} onChange={this.handleChange} />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.origineError}
              </div>
            </div>
          </div>
          <br />
          <div >
            <div className="row">
              <div className="col-4 ">
                <input type="number" className="form-control input101" id="inputLargeur" value={this.state.inputLargeur} placeholder="Largeur" onChange={this.handleChange} ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.largeurError}
                </div>
              </div>

              <div className="col-4"> 
                <input type="number" className="form-control input101" id="inputLongueur" placeholder="Longueur" value={this.state.inputLongueur} onChange={this.handleChange}></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.longueurError}
                </div>
              </div>

              <div className="col-4">
                <input type="number" className="form-control input101" id="inputHauteur" placeholder="Hauteur" value={this.state.inputHauteur} onChange={this.handleChange}></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.hauteurError}
                </div>

              </div>

            </div>
          </div>
          <br />
          <div>
            {this.state.text}
          </div>
          <br />
          <input type="submit" value="Créer" />
        </form>
      </div>
    );
  }
}
export default Template_FormulaireModification