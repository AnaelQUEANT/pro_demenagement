import { useEffect, useState} from 'react';
import { getSalle } from '../services/salle';
import './SalleList.css';

export const SalleList = (props) => {
  // Créer une donnée réactive
  const [salles, setSalle] = useState([]);

  //TODO Selectionner la premiere salle par défaut


  useEffect(() => {
    // Execute une action au ComponentDidMount
    const getDatas = async () => {
      const salle = await getSalle();
      setSalle(salle);
    }
    getDatas()
    // Execute une action au ComponentDidUnMount
    // return
  }, []);

  // Execute à chaque changement de valeur de '[]'
  useEffect(() => {
  }, [salles])



  const SalleList = salles.map((e, i) => {
    return (

      // https://getbootstrap.com/docs/5.0/components/button-group/#checkbox-and-radio-button-groups
      // <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
      // <label class="btn btn-outline-primary" for="btnradio1">{e.Mobilier_nom}</label>

      <button key={i} type="button"  className="col-sm-2 btn btn-outline-danger">{e.Nom_Piece}</button>

    )
  })
  
  return (
    <div className="list-salle btn-group" >
      {SalleList}
    </div>

  );
}
