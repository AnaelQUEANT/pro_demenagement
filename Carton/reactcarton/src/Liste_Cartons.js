import React from 'react'
import TemplateListe from './Template_Liste.js'
import './ListeCartons.css';

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

        let monAPI = "http://localhost:16500/lesCartons/" + this.getArgument(this.state.get);
        console.log(monAPI);
        fetch(monAPI)
            .then(response => response.json())
            .then(response => {
                this.state.tab = [];
                var test = this.state.tab;
                var tableauID = [];
            
                for(var i=0;i<response.length;i++){
                  if(response[i].Carton_fragile == 1){
                    test[i] = { photo:  response[i].Carton_photo, id : response[i].Carton_id, origine :  response[i].Carton_origine, destination : response[i].Piece_nom, dim : response[i].Carton_largeur + "x" +  response[i].Carton_longueur + "x" +  response[i].Carton_hauteur, fragile : "ImageFragile"};

                  }else{
                    test[i] = { photo:  response[i].Carton_photo, id : response[i].Carton_id, origine :  response[i].Carton_origine, destination : response[i].Piece_nom, dim : response[i].Carton_largeur + "x" +  response[i].Carton_longueur + "x" +  response[i].Carton_hauteur, fragile : ""};

                  }
                    
                }
                console.log(this.state.tab.length + " YOPPPP");
      
                var listItems = this.state.tab.map(e => (

                    <TemplateListe  photo={e.photo} id={e.id} origine={e.origine} destination={e.destination} dim={e.dim} fragile={e.fragile} idBouton={e.id} />
        
                ));
                this.setState({text:listItems})
                
            });
        }

    render() {
      return (
        <div class="row test">
            {this.state.text}
        </div>
      )
    }
  }
  export default ListeCartons