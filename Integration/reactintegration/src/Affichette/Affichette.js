import React from 'react'
import TemplateListe from './Template_Piece.js'
import './css/styles.css';

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

        let monAPI = "http://localhost:16500/affichettes";

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
        <table>
        <thead>
        <tr> 
        	<th>ID</th> 
        	<th>Nom</th> 
        	<th>Couleur</th> 
        	<th>Taille</th> 
        	<th>Logement</th> 
        </tr>
        </thead>
        {this.state.text}
        </table>
      </div>
    )
  }

}
export default Affichette