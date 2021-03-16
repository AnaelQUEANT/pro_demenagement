import React, { useEffect, useState} from 'react';
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

  const handleChangeSalle = (id) => {
    props.onSalleSelected(id)
  }

  const SalleList = salles.map((e, i) => {
    return (
      <React.Fragment key={i}>
        <input key={i} type="button" className="btn-check" id={e.Piece_id} autoComplete="off" onClick={() => handleChangeSalle(e.Piece_id)} />
        <label className="btn btn-outline-danger" htmlFor={e.Piece_id}>{e.Piece_nom}</label>
      </React.Fragment>
    )
  })
  
  return (
    <div className="list-salle btn-group" role="group">
      {SalleList}
    </div>

  );
}
