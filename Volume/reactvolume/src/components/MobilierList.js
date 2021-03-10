import { useEffect, useState} from 'react';
import { getMobilier } from '../services/mobilier';
// import './EnseignantList.css';

export const MobilierList = (props) => {
  // Créer une donnée réactive
  const [mobiliers, setMobiliers] = useState([]);


  useEffect(() => {
    // Execute une action au ComponentDidMount
    const getDatas = async () => {
      const mobi = await getMobilier();
      setMobiliers(mobi);
    }
    getDatas()
    // Execute une action au ComponentDidUnMount
    // return
  }, []);

  // Execute à chaque changement de valeur de '[]'
  useEffect(() => {

  }, [mobiliers])



  const MobiList = mobiliers.map((e, i) => {
    return (
      <li key={i}>{e.Mobilier_nom}</li>
    )
  })
  
  return (
    <ul>{MobiList}
</ul>
      
  );
}
