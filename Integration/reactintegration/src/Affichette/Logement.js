import React from 'react'
import TemplateListe from './Template_Logement.js'
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

        let monAPI = "http://localhost:16500/logement";

        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
                for(var i=0;i<response.length;i++){
                    test[i] = { id:  response[i].Logement_id, adresse : response[i].Logement_adresse, etage :  response[i].Logement_etage, ascenseur : response[i].Logement_ascenseur, type : response[i].Type_Logement_id};

                }
                console.log(this.state.tab.length);
                var listItems = this.state.tab.map(e => (
                    <TemplateListe id={e.id} adresse={e.adresse} etage={e.etage} ascenseur={e.ascenseur} type={e.type}/>
        
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
        	<th>Adresse</th> 
        	<th>Etage</th> 
        	<th>Ascenseur</th> 
        	<th>Type</th> 
        </tr>
        </thead>
        {this.state.text}
        </table>
      </div>
    )
  }

}
export default Affichette