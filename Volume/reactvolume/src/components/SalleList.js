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
      <div key={i}>
        <input type="button" className="btn-check" id={i} autoComplete="off"/>
        <label className="btn btn-outline-danger" htmlFor={i}>{e.Piece_nom}</label>
      </div>

    )
  })
  
  return (
    <div className="list-salle btn-group" role="group">
      {SalleList}
    </div>

  );
}
