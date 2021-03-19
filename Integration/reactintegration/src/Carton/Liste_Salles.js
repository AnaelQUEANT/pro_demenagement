import React from 'react'
import TemplateGrid from './Template_Grid.js'
import TemplateMenu from './Template_Navigation.js'
import { Link } from 'react-router-dom'
import cartonAjout from './Image/AjoutCarton.PNG';
class ListeSalles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      tab: [],
      nav: ''
    };
  }
  componentDidMount() {
    let monAPI = "http://localhost:16500/LesPieces/" + "1";
    fetch(monAPI)
      .then(response => response.json())
      .then(response => {
        this.state.tab = [];
        var test = this.state.tab;
        var tableauID = [];
        for (var i = 0; i < response.length; i++) {
          test[i] = { nom: response[i].Piece_nom, id: response[i].Piece_id, nbCarton: response[i].nbCarton };
        }
        var listItems = this.state.tab.map(e => (
          <TemplateGrid mess={e.nom} id={e.id} nbCarton={e.nbCarton} />
        ));
        this.setState({ text: listItems })
      });
  }

  render() {
    return (
      <div>
        <title>Liste des salles</title>
        <div>
          <TemplateMenu nom="/" />
        </div>
        <div className="row laDivDesSalles">
          <div className="col-4 flex-column btn_carton_virtuel" >
            <Link to="CreationCarton">
              <img className="image_carton_virtuel" src={cartonAjout} width="100%" height="100%" alt="Lien d'ajout de carton (Image absente)"></img>
            </Link>
          </div>
          {this.state.text}
        </div>
        <div className="laDivAffichette">
          <Link to="AffichetteLogement/?id=1">
            <button type="button" className="btn btn-primary bouttonAffichette">
              Editer des affichettes
          </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default ListeSalles
