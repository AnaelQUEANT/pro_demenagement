import React from 'react'
import TemplateListe from './Template_Liste.js'

class ListeCartons extends React.Component {


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

        let monAPI = "http://localhost:16500/lesCartons/" + "1";

        console.log("api : " + monAPI);
        console.log(this.getArgument(this.state.get));
        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
                for(var i=0;i<response.length;i++){
                    test[i] = { photo:  response[i].photo, id : response[i].id, origine :  response[i].origine, destination : response[i].destination, dim : response[i].largeur + "x" +  response[i].longueur + "x" +  response[i].hauteur, fragile : response[i].fragile,};

                }
                console.log(this.state.tab.length);
                var listItems = this.state.tab.map(e => (
                    <TemplateListe photo={e.photo} id={e.id} origine={e.origine} destination={e.destination} dim={e.dim} fragile={e.fragile} idBouton={e.id} />
        
                ));
                this.setState({text:listItems})
                
            });
        }

    render() {
      return (
        <div >
            {this.state.text}
        </div>
      )
    }
  }
  export default ListeCartons