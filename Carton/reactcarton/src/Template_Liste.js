import React from 'react'

class TemplateListe extends React.Component {
    render() {
      return (
       
            
        
                <div className="row">
                    <div className="col-3">
                       {this.props.photo}
                    </div>
                    <div className="col-3">
                        {this.props.id}
                    </div>
                    <div className="col-3">
                        <span>{this.props.origine} vers {this.props.destination}</span>
                        <br/>
                        <span>Dim : {this.props.dim}</span>
                        <br/>
                        <span>{this.props.fragile}</span>
                    </div>
                    <div className="col-3" >
                        <a className="nav-link" aria-current="page" href={"ModifierCarton?id="+this.props.id}>Modifier</a>
                    </div>
                    
                </div>
     
 
             
     
      );
    }
  }
  export default TemplateListe