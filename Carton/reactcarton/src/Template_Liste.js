import React from 'react'
import boutonModif from './Image/bouton_modifier.PNG';
import ImageCarton from './Image/carton.jpg';
import {Link} from 'react-router-dom'


class TemplateListe extends React.Component {
    render() {
      return (
       
            
        
                <div className="row">
                    <div className="col-2">
                       {/*{this.props.photo}*/}
                       <img className="ImageCarton" src={ImageCarton} width="5%" height="5%" alt="image temporaire de carton"></img>
                    </div>
                    <div className="col-2">
                        {this.props.id}
                    </div>
                    <div className="col-5">
                        <span>{this.props.origine} vers {this.props.destination}</span>
                        <br/>
                        <span>Dim : {this.props.dim}</span>
                        <br/>
                        <span>{this.props.fragile}</span>
                    </div>
                    <div className="col-2" >
                        <Link to={"ModifierCarton?id="+this.props.id}>
                            <img className="boutonModif" src={boutonModif} width="5%" height="5%" alt="Lien modif de carton"></img>
                
                        </Link>
                    </div>
                    
                </div>
     
 
             
     
      );
    }
  }
  export default TemplateListe