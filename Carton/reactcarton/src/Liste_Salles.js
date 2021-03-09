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

        let monAPI = "http://localhost:7249/LesMessages/";

        console.log("api : " + monAPI);
        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
                for(var i=0;i<response.length;i++){
                    test[i] = { Message: "Salon" };

                }
                console.log(this.state.tab.length);
                var listItems = this.state.tab.map(e => (
                    <TemplateGrid mess={e.Message} idBouton={e.id} />
        
                ));
                this.setState({text:listItems})
                
            });
        }

    render() {
      return (
        <div class="grid-container">
            
            <div class="grid-item" >
            <a class="nav-link" aria-current="page" href="CreationCarton">Ajouter un carton</a>
            </div>

            {this.state.text}
        </div>
      )
    }
  }
  export default ListeSalles