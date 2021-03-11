import React from 'react'
import './ListeSalle.css';
import {Link} from 'react-router-dom'

class TemplateGrid extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="list-salle btn-group col-4" >
            <Link class="le-link" to={"ListeCartons?id="+this.props.id}>
              <button type="button"  className="btn btn-outline-danger">
                {this.props.nbCarton}
                <br/>
                {this.props.mess}
              </button>
            </Link>
        </div>
      )
    }
  }
  export default TemplateGrid