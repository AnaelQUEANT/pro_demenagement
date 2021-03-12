import React from 'react'
import TemplateListe from './Template_Etiquette.js'

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


    getArgument(elem){
      var param = elem.split('=');
      return param[1];
    }
  
  componentDidMount() {

        let monAPI = "http://localhost:7251/lesCartons/"+ this.getArgument(this.state.get);;

        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
                for(var i=0;i<response.length;i++){
                    test[i] = { origine:  response[i].Carton_origine, description : response[i].Carton_description};

                }
                console.log(this.state.tab.length);
                var listItems = this.state.tab.map(e => (
                    <TemplateListe origine={e.origine} description={e.description} />
        
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
        	<th>Origine</th> 
        	<th>Description</th> 
        </tr>
        </thead>
        {this.state.text}
        </table>
      </div>
    )
  }

}
export default Affichette