import React from 'react'
import TemplateListe from './Template_Liste.js'

class Affichette extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        value: '',
        text : '',
        tab : [],
        get : props.location.search
      };
  }
  
  componentDidMount() {

        let monAPI = "http://localhost:7251/affichettes";

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
        <h2>Kess tu regardes, tarba ? </h2>
        <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
        {this.state.text}
      </div>
    )
  }

}
export default Affichette