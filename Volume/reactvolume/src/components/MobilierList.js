import { useEffect, useState} from 'react';
import { getMobilier } from '../services/mobilier';
import './MobilierList.css';

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
      <div key={i} className="mobilier-container">
        <div  className="mobilier-img-btn-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg>
          

          <div className="btn-group-plus-moins" role="group">
            <button type="button" className="btn btn-outline-secondary btn-moins">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
            </button>
            
            <span className="nombre">0</span>
            
            <button type="button" className="btn btn-outline-secondary btn-plus">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </button>
          </div>

          
        </div>
        <span>{e.Mobilier_nom}</span>
        <span>Dim : .. x ..</span>
      </div>
      
    )
  })
  
  return (
    <div className="list-mobilier">{MobiList}</div>
      
  );
}
