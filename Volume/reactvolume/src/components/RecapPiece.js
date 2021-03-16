import { useEffect, useState} from 'react';
import { getMobilier } from '../services/mobilier';
import { getSalle } from '../services/salle';
import './RecapPiece.css';

export const RecapPiece = (props) => {

  // Créer une donnée réactive
  const [salles, setSalle] = useState([]);
  const [mobiliers, setMobilier] = useState([]);
  const [selection, setSelection] = useState([])

  useEffect(() => {
    // Execute une action au ComponentDidMount
    const getDatas = async () => {
      const salle = await getSalle();
      const mobilier = await getMobilier();
      const selectionTempo = props.select.split`,`.map(x=>+x);
      setSalle(salle);
      setMobilier(mobilier);
      setSelection(selectionTempo);
    }
    getDatas()
    // Execute une action au ComponentDidUnMount
    // return
  }, [props.select]);

  // Execute à chaque changement de valeur de '[]'
  useEffect(() => {
  }, []);


  const handleClickPlus = ((mobi) => {
    const newCompteur = [...selection];
      newCompteur[mobi.Mobilier_id] = newCompteur[mobi.Mobilier_id] + 1;
      setSelection(newCompteur)
  })

  const handleClickMoins = ((mobi) => {
    if(selection[mobi.Mobilier_id] > 0) {
      const newCompteur = [...selection];
      newCompteur[mobi.Mobilier_id] = newCompteur[mobi.Mobilier_id] - 1;
      setSelection(newCompteur)
    }
  })

  const handleClickDel = ((mobi) => {
    if(selection[mobi.Mobilier_id] > 0) {
      const newCompteur = [...selection];
      newCompteur[mobi.Mobilier_id] = 0;
      setSelection(newCompteur)
    }
  })


  const SalleListe = salles.map((lesSalles, i) => {
      

    const ListeMobilier = mobiliers.map((lesMobiliers, i) => {
        if(lesMobiliers.Piece_id === lesSalles.Piece_id && selection[lesMobiliers.Mobilier_id] > 0) {
            return (
            <div key={i} className="mobilier-elem">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </div>
                <div className="mobilier-info">
                    <div>
                        {lesMobiliers.Mobilier_nom}
                    </div>
                    <div>
                        Dim : {lesMobiliers.Mobilier_longueur} x {lesMobiliers.Mobilier_largeur} x {lesMobiliers.Mobilier_hauteur}
                    </div>
                </div>
                <span className="quantite">{selection[lesMobiliers.Mobilier_id]}</span>
                <div className="bouton">
                    <button type="button" className="btn btn-danger btn-p" onClick={() => handleClickPlus(lesMobiliers)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-danger btn-m" onClick={() =>handleClickMoins(lesMobiliers)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </button>
            
         
                </div>
                <div className="cross">
                    <button type="button" className="btn btn-sm btn-del" onClick={() => handleClickDel(lesMobiliers)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
            </div>
        ); 
        } else return null;

        
    })
    return (
      <div key={i} className="piece-list">
          <h3 className="titre">{([...ListeMobilier].filter(elem => elem != null).length !== 0) ? lesSalles.Piece_nom : null}</h3>
          <div className="mobilier-liste">
              {ListeMobilier}
              {/* {console.log(ListeMobilier.Array === new Array(10).fill(null) ? true : false)}
              {console.log(([...ListeMobilier].filter(elem => elem != null).length !== 0) ? lesSalles.Piece_nom : null)}
              {console.log([...new Array(10).fill(null)])}
              {console.log([...ListeMobilier] === [...(new Array(10).fill(null))])} */}
          </div>
      </div>

    );
  });
  
  return (
      <div>
      {SalleListe}
      </div>
  );
}
