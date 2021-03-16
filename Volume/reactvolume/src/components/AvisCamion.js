//import { useEffect, useState} from 'react';
import './AvisCamion.css';
import {Link} from 'react-router-dom'

export const AvisCamion = (props) =>{

    return (
        <div className="footer">
            <div className="container-recommendation">
                <div className="header-recommendation">
                    <span>logo ici</span>
                    <h3 className="titre-conseil">Dana te conseille ...</h3>
                </div>
                
                <div className="body-recommendation">
                    <div className="volume-camion">
                        Un véhicule de <span className="valeur-volume">Xm³</span>
                    </div>
                    <div className="body-logo-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>
                        <div className="info-camion">
                            <span className="elem-info-camion">Longueur : XXX</span>
                            <span className="elem-info-camion">Hauteur : XXX</span>
                            <span className="elem-info-camion">Largeur : XXX</span>
                            <span className="elem-info-camion">Charge utile : XXX</span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-ok">Cette suggestion me convient</button>
            <button type="button" className="btn btn-non">Je souhaite utiliser mon véhicule personnel</button>
        </div>
      );

}