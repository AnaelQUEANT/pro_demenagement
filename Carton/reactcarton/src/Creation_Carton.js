import React from 'react'
import TemplateListeObjet from './Template_ListeEquipementCarton.js'
import TemplateListeDeroulante from './Template_ListeDeroulante.js'
import {Redirect} from 'react-router-dom'


class CreationCarton extends React.Component {

    //state = initialState;
    
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        text : '',
        tab : [],
        text2 : '',
        tab2 : [],
        leTest : 'try',
        inputLongueur : '',
        inputLargeur : '',
        inputHauteur : '',
        origine : '',
        nameError : '',
        hauteurError : '',
        largeurError : '',
        longueurError : '',
        origineError : '',
        inputFragile : '',
        inputDestination :'',
        selectCouleur: '',
        inputFile : ''


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
              for(var i=0;i<response.length;i++){
                  test[i] = { nom:  response[i].Equipement_Carton_nom, id : response[i].Equipement_Carton_id };
                
              }
              console.log(this.state.tab);
              var listItems = this.state.tab.map(e => (
                  <TemplateListeObjet nom={e.nom} id={e.id} />
      
              ));
              this.setState({text:listItems})
              
          });


          let monAPI2 = "http://localhost:16500/lesPieces/" + "1";

          fetch(monAPI2)
              .then(response => response.json())
              .then(response => {
                  this.state.tab2 = [];
                  var test2 = this.state.tab2;
                  var tableauID = [];
                  for(var i=0;i<response.length;i++){
                      test2[i] = {  nom: response[i].Piece_nom, id : response[i].Piece_id ,nbCarton : response[i].nbCarton};
                  }
                  console.log(this.state.tab2);
                  var listItems2 = this.state.tab2.map(e => (
                      <TemplateListeDeroulante nom={e.nom} id={e.id} />
                  ));
                  this.setState({text2:listItems2})
                  
              }); 
      }


      handleChange = event => {
        console.log(event.target.value);
        this.setState({[event.target.id]: event.target.value});
        
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
        this.setState({largeurError });
        this.setState({longueurError });
        this.setState({hauteurError });
        this.setState({origineError });
       
        if( !this.state.inputLargeur || !this.state.inputLongueur || !this.state.inputHauteur || !this.state.origine){
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

          console.log(elementCheck + " Couleur " + this.state.inputFragile.checked);
          //this.setState(initialState);
        }
        //this.props.history.push('/ListeSalles');
         
      };


    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          
            <br/>
            <div>
              <form>
                <div class="form-group">
                  <input type="file" className="form-control-file" id="inputFile" onChange={this.handleChange} />
                </div>
              </form>
            </div>
            <br/>
            <div>
              {/*
                <div>
                  <input type="color" id="head" name="head" />
                </div>
                */}
                <label>Couleur</label>
                <select id="selectCouleur" onChange={this.handleChange}>
                  <option></option>
	                <option>Rouge</option>
	                <option>Bleu</option>
	                <option>Vert</option>
                  <option>Jaune</option>
                  <option>Violet</option>
                </select>
            </div>
            <br/>
            <div>
              <div>
                <input type="checkbox" id="inputFragile" name="Fragile" onChange={this.handleChange} />
                <label for="Fragile">Fragile</label>
              </div>
            </div>
            <br/>
            <div class="form-group">
              <label>Destination</label>
              <select value={this.state.value} onChange={this.handleChange} id="inputDestination">
                  {this.state.text2}
              </select>
            </div>
            <br/>
            <div class="form-group">
                <input type="text" className="form-control" id="origine" placeholder="Origine" value={this.state.origine} onChange={this.handleChange}/>
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.origineError}
                </div>
            </div>
            <br/>
            <div>
                <div class="row">
                    <input type="number" className="form-control col-sm" id="inputLargeur" value={this.state.largeur} placeholder="Largeur" onChange={this.handleChange}></input>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.largeurError}
                    </div>
                    <input type="number" className="form-control col-sm" id="inputLongueur" placeholder="Longueur" value={this.state.longueur} onChange={this.handleChange}></input>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.longueurError}
                    </div>
                    <input type="number" className="form-control col-sm" id="inputHauteur" placeholder="Hauteur" value={this.state.hauteur} onChange={this.handleChange}></input>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.hauteurError}
                    </div>
                </div>
            </div>
            <br/>
            <div>
              {this.state.text}
            </div>
            <br/>
            <input type="submit" value="Créer" />       
        </form>
      )
    }
  }
  export default CreationCarton

  /* Copyright, 
   * Rémi RAGOT & Anaël QUEANT
   */