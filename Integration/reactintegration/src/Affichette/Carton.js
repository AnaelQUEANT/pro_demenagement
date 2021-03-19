import React from 'react'
import TemplateListe from './Template_Carton.js'
import './css/styles.css';

class Carton extends React.Component {

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

        let monAPI = "http://localhost:16500/carton/"+ this.getArgument(this.state.get);;

        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];

                this.setState({origine: response[0].Carton_origine, description : response[0].Carton_description})

                for(var i=0;i<response.length;i++){
                    test[i] = { contenu : response[i].Equipement_Carton_nom};

                }
                console.log(this.state.tab.length);
                var listItems = this.state.tab.map(e => (
                    <TemplateListe origine={e.origine} description={e.description} contenu={e.contenu} />
        
                ));
                this.setState({text:listItems})
                
            });
        }

  render() {
    return (
      <div>

        <h2>Origine : {this.state.origine}</h2>
        <h2>Description : {this.state.description}</h2>

        <table>
        <thead>
        <tr> 
          <th>Contenu</th>
        </tr>
        </thead>
        {this.state.text}
        </table>
      </div>
    )
  }

}
export default Carton