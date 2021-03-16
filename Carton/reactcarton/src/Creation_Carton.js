import React from 'react'
import TemplateListeObjet from './Template_ListeEquipementCarton.js'
import TemplateListeDeroulante from './Template_ListeDeroulante.js'
import './CreationCarton.css';
import cartonAjout from './Image/AjoutImage.PNG';
class CreationCarton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      tab: [],
      text2: '',
      tab2: [],
      leTest: 'try',
      inputLongueur: '',
      inputLargeur: '',
      inputHauteur: '',
      origine: '',
      nameError: '',
      hauteurError: '',
      largeurError: '',
      longueurError: '',
      origineError: '',
      inputFragile: '',
      inputDestination: '',
      selectCouleur: '',
      inputFile: '',
      idDestination: '',
      valID: ''
    };
  }
  componentDidMount() {
    let monAPI = "http://localhost:16500/lesObjets/";
    fetch(monAPI)
      .then(response => response.json())
      .then(response => {
        this.state.tab = [];
        var test = this.state.tab;
        var tableauID = [];
        for (var i = 0; i < response.length; i++) {
          test[i] = { nom: response[i].Equipement_Carton_nom, id: response[i].Equipement_Carton_id };
        }
        console.log(this.state.tab);
        var listItems = this.state.tab.map(e => (
          <TemplateListeObjet nom={e.nom} id={e.id} />

        ));
        this.setState({ text: listItems })

      });
    let monAPI2 = "http://localhost:16500/lesPieces/" + "1";
    fetch(monAPI2)
      .then(response => response.json())
      .then(response => {
        this.state.tab2 = [];
        var test2 = this.state.tab2;
        for (var i = 0; i < response.length; i++) {
          test2[i] = { nom: response[i].Piece_nom, id: response[i].Piece_id, nbCarton: response[i].nbCarton };
        }
        console.log(this.state.tab2);
        var listItems2 = this.state.tab2.map(e => (
          <TemplateListeDeroulante nom={e.nom} id={e.id} />
        ));
        this.setState({ text2: listItems2 })
      });
  }
  getIdCarton() {
    console.log("SNK C TRO B1");
    fetch("http://localhost:16500/getIDCarton")
      .then(response => response.json())
      .then(response => {
        for (var i = 0; i < response.length; i++) {
          this.state.valID = response[i].Carton_id;
        }
        console.log("YOOO : " + this.state.valID);
      });
    return true;
  }
  ajoutObjet() {
    this.state.tab.map(function (cell) {
      var idObjet = "id" + cell.id;
      var elementTrue = document.getElementById(idObjet).checked;
      console.log("ICCCCCCCCCI : " + cell.id + " ettt " + this.state.valID);
      if (elementTrue) {
        console.log('KOH LANTA ' + this.state.valID);

        let monAPI = "http://localhost:16500/ajoutEquipementCarton";
        fetch(monAPI, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            "idCarton": this.state.valID,
            "idObjet": cell.id
          })
        })
      }
    }.bind(this));
    return true;
  }
  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  };
  validate = () => {
    let hauteurError = "";
    let origineError = "";
    let largeurError = "";
    let longueurError = "";
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
    this.setState({ largeurError });
    this.setState({ longueurError });
    this.setState({ hauteurError });
    this.setState({ origineError });
    if (!this.state.inputLargeur || !this.state.inputLongueur || !this.state.inputHauteur || !this.state.origine) {
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
      var row = this.state.tab2.map(function (cell) {
        if (cell.nom == this.state.inputDestination) {
          this.state.idDestination = cell.id;
          return cell.id;
        }
      }.bind(this));
      try {
        let monAPI = "http://localhost:16500/ajoutCarton";
        console.log(this.state.origine + this.state.selectCouleur + this.state.inputLargeur + this.state.inputLongueur + this.state.inputHauteur + elementCheck + this.state.idDestination);
        if (elementCheck) {
          elementCheck = 1;
        } else {
          elementCheck = 0;
        }
        fetch(monAPI, {
          method: 'POST',

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

      let bitte = async () => {
        let oui = await this.getIdCarton();
        let oui2 = await this.ajoutObjet();
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
      <form onSubmit={this.handleSubmit}>
        <br />
        <div className="row">
          <img className="col-6" src={cartonAjout} alt="Lien select carton (Image absente)"></img>
          <div className="col-6">
            <div className="col-">
              <label>Couleur</label>
              <br/>
              <select id="selectCouleur" width="100%" onChange={this.handleChange}>
                <option></option>
                <option>Rouge</option>
                <option>Bleu</option>
                <option>Vert</option>
                <option>Jaune</option>
                <option>Violet</option>
              </select>
            </div>
            <br/>
            <br/>
            <div>
              <input type="checkbox" id="inputFragile" name="Fragile" onChange={this.handleChange} />
              <label for="Fragile">Fragile</label>
            </div>
          </div>
        </div>
        <br />
        <div class="form-group">
          <label>Destination</label>
          <br/>
          <select value={this.state.inputDestination} onChange={this.handleChange} id="inputDestination">
            {this.state.text2}
          </select>
        </div>
        <br />
        <div class="form-group">
          <div class="wrap-input100 validate-input">
            <input class="input100" type="text" name="name" placeholder="Origine" id="origine" value={this.state.origine} onChange={this.handleChange} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.origineError}
            </div>
          </div>
        </div>
        <br />
        <div>
          <div class="row">
            <input type="number" className="form-control col4" id="inputLargeur" value={this.state.largeur} placeholder="Largeur Carton (cm)" onChange={this.handleChange} ></input>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.largeurError}
            </div>
            <input type="number" className="form-control col-4" id="inputLongueur" placeholder="Longueur Carton (cm)" value={this.state.longueur} onChange={this.handleChange}></input>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.longueurError}
            </div>
            <input type="number" className="form-control col-4" id="inputHauteur" placeholder="Hauteur Carton (cm)" value={this.state.hauteur} onChange={this.handleChange}></input>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.hauteurError}
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
    )
  }
}
export default CreationCarton
/* Copyright,
 * Rémi RAGOT & Anaël QUEANT
 */