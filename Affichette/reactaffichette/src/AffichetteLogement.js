import React from 'react'
import TemplateListe from './Template_Liste.js'

class AffichetteLogement extends React.Component {

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

        let monAPI = "http://localhost:7251/affichette/" + this.getArgument(this.state.get);

        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
                for(var i=0;i<response.length;i++){
                    test[i] = { id:  response[i].Piece_id, nom : response[i].Piece_nom, couleur :  response[i].Piece_couleur, taille : response[i].Piece_taille, idLogement : response[i].Logement_id};

                }
                console.log(this.state.tab.length);
                var listItems = this.state.tab.map(e => (
                    <TemplateListe id={e.id} nom={e.nom} couleur={e.couleur} taille={e.taille} idLogement={e.idLogement}/>
        
                ));
                this.setState({text:listItems})
                
            });
        }

  render() {
    return (
      <div>
        <h1 class="titre">Affichettes à Imprimer</h1>
        <div class="affichetteContainer">
          {this.state.text}
        </div>
      </div>
    )
  }

}
export default AffichetteLogement