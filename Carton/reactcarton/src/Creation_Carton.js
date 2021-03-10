import React from 'react'
import TemplateListeObjet from './Template_ListeEquipementCarton.js'


class CreationCarton extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: '',
        text : '',
        tab : []
      };
    }

    componentDidMount() {

      let monAPI = "http://localhost:16500/lesObjets/";

      fetch(monAPI)
          .then(response => response.json())
          .then(response => {
              this.state.tab = [];
              var test = this.state.tab;
              var tableauID = [];
              for(var i=0;i<response.length;i++){
                  test[i] = { nom:  response[i].Equipement_Carton_nom, id : response[i].Equipement_Carton_id };
                
              }
              console.log(this.state.tab);
              var listItems = this.state.tab.map(e => (
                  <TemplateListeObjet nom={e.nom} id={e.id} />
      
              ));
              this.setState({text:listItems})
              
          });
      }

    render() {
      return (
        <form>
            <br/>
            <div>
              <form>
                <div class="form-group">
                  <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                </div>
              </form>
            </div>
            <br/>
            <div>
                <div>
                  <input type="color" id="head" name="head" />
                </div>
            </div>
            <br/>
            <div>
              <div>
                <input type="checkbox" id="Fragile" name="Fragile"/>
                <label for="scales">Fragile</label>
              </div>
            </div>
            <br/>
            <div class="form-group">
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Destination"></input>
            </div>
            <br/>
            <div class="form-group">
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Origine"/>
            </div>
            <br/>
            <div>
                <div class="row">
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" placeholder="Largeur"></input>
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" placeholder="Longueur"></input>
                    <input type="text" class="form-control col-sm" id="formGroupExampleInput" placeholder="Hauteur"></input>
                </div>
            </div>
            <br/>
            <div>
              {this.state.text}
            </div>
            

        </form>
      )
    }
  }
  export default CreationCarton
