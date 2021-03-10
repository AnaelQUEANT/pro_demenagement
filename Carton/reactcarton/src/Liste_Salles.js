import React from 'react'
import TemplateGrid from './Template_Grid.js'

class ListeSalles extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: '',
        text : '',
        tab : []
      };
    }
    
    componentDidMount() {

        let monAPI = "http://localhost:16500/LesPieces/" + "1";

        console.log("api : " + monAPI);
        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
                for(var i=0;i<response.length;i++){
                    test[i] = { nom: response[i].Piece_nom, id : response[i].Piece_id ,nbCarton : response[i].nbCarton};
                    console.log("id : " + response[i].Piece_id);
                }
                console.log(test);
                var listItems = this.state.tab.map(e => (
                    <TemplateGrid mess={e.nom} id={e.id} nbCarton={e.nbCarton} />
        
                ));
                this.setState({text:listItems})
                
            });
        }

    render() {
      return (
        <div class="grid-container">
            
            <div class="grid-item" >
                <a  class="nav-link" aria-current="page" href="CreationCarton">Ajouter un carton</a>
            </div>

            {this.state.text}
        </div>
      )
    }
  }
  export default ListeSalles