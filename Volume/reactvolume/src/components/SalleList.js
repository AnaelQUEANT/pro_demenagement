import { useEffect, useState} from 'react';
import { getSalle } from '../services/salle';
// import './EnseignantList.css';

export const SalleList = (props) => {
  // Créer une donnée réactive
  const [salles, setSalle] = useState([]);


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
    console.log("useEffect[mobiliers]")
  }, [salles])



  const SalleList = salles.map((e, i) => {
    return (
      <li key={i}>{e.Salle_nom}</li>
    )

  })





  
  return (
    <ul>
      {SalleList}
    </ul>

  );
}
