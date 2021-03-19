import React from 'react'
import TemplateFormulaireModif from './Template_FormulaireModification.js'
import TemplateListeObjet from './Template_ListeObjet.js'
import TemplateMenu from './Template_Navigation.js'
class ModifierCarton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      text2: '',
      tab: [],
      tab2: [],
      get: props.location.search,
    };
  }
  getArgument(elem) {
    var param = elem.split('=');
    return param[1];
  }
  componentDidMount() {
    let idCarton;
    let monAPI = "http://localhost:16500/objetCarton/" + this.getArgument(this.state.get);
    fetch(monAPI)
      .then(response => response.json())
      .then(response => {
        this.state.tab = [];
        var test = this.state.tab;
        this.state.tab2 = [];
        var test2 = this.state.tab2;
        var tableauID = [];
        var non = 2;
        console.log("youhou " + response.length);
        for (var i = 0; i < response.length; i++) {
          if (non == 2) {
            idCarton = response[i].Piece_id;

            test[i] = { photo: response[i].Carton_photo, id: response[i].Carton_id, origine: response[i].Carton_origine, destination: response[i].Piece_nom, largeur: response[i].Carton_largeur, longueur: response[i].Carton_longueur, hauteur: response[i].Carton_hauteur, fragile: response[i].Carton_fragile, couleur: response[i].Carton_couleur };
          }
          non = 1;
          test2[i] = { nom: response[i].Equipement_Carton_nom, id: response[i].Equipement_Carton_id };
          console.log("hey");
        }
        console.log(this.state.tab);

        var listItems2 = this.state.tab2.map(e => (
          <TemplateListeObjet nom={e.nom} id={e.id} />
        ));

        console.log("HIBOOUUUUUU : " + idCarton);
        var listItems = this.state.tab.map(e => (
          <TemplateFormulaireModif text2={listItems2} leID={idCarton} photo={e.photo} id={e.id} origine={e.origine} destination={e.destination} largeur={e.largeur} longueur={e.longueur} hauteur={e.hauteur} fragile={e.fragile} idBouton={e.id} couleur={e.couleur} />
        ));
        this.setState({ text: listItems })
        //this.setState({ text2: listItems2 })
      });


  }

  render() {
    return (
      <div>
        <title>Modification Carton</title>
        <TemplateMenu nom="ListeSalles" />
        <div>
          {this.state.text}
        </div>

      </div>


    )
  }
}
export default ModifierCarton
