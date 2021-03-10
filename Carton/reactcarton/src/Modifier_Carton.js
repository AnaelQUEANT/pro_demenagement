import React from 'react'
import TemplateFormulaireModif from './Template_FormulaireModification.js'


class ModifierCarton extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: '',
        text : '',
        tab : [],
        get : props.location.search
      };
    }

    getArgument(elem){
        var param = elem.split('=');
        return param[1];
      }

    componentDidMount() {

      let monAPI = "http://localhost:16500/infoCarton/" + this.getArgument(this.state.get);
      console.log("coucou " + monAPI);
      fetch(monAPI)
          .then(response => response.json())
          .then(response => {
              this.state.tab = [];
              var test = this.state.tab;
              var tableauID = [];
              for(var i=0;i<response.length;i++){
                  test[i] = {  photo:  response[i].Carton_photo, id : response[i].Carton_id, origine :  response[i].Carton_origine, destination : response[i].Piece_nom, largeur : response[i].Carton_largeur ,longueur : response[i].Carton_longueur, hauteur : response[i].Carton_hauteur, fragile : response[i].Carton_fragile};
                
              }
              console.log(this.state.tab);
              var listItems = this.state.tab.map(e => (
                  <TemplateFormulaireModif photo={e.photo} id={e.id} origine={e.origine} destination={e.destination} largeur={e.largeur} longueur={e.longueur} hauteur={e.hauteur} fragile={e.fragile} idBouton={e.id} />
      
              ));
              this.setState({text:listItems})
              
          });
      }

    render() {
      return (
        <div>
            {this.state.text}
        </div>
      )
    }
  }
  export default ModifierCarton
