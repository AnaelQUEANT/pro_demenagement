import { Link } from 'react-router-dom'
import { ReactComponent as DanaLogo } from './img/UBO_Mascotte_Dana.svg';
import { ReactComponent as SearchIcon } from './img/search.svg';
import { ReactComponent as RightIcon } from './img/chevron-right.svg';
import { ReactComponent as DanaF } from './img/UBO_Illustration_Dana_Gestion_des_contrats.svg';
import { ReactComponent as DanaH } from './img/UBO_Illustration_Dana_Taches_admin.svg';
import './TableauDeBord.css';

function TableauDeBord(props) {
    return (
        <div className="tdb">
            <div className="header">
                <h1> Tableau de bord </h1>
                <div className="progress-b"><DanaLogo width="32" /></div>
            </div>

            <div className="body">
                <div className="search-bar input-group">
                    <SearchIcon width="32" />
                    <input type="text" className="form-control" placeholder="Rechercher" aria-describedby="search-icon" />
                </div>

                <div className="menu-link">
                    <div className="menu-box">
                        <DanaH width="50%" />
                        <div className="titre-link">Tâches Administratives</div>
                        <div className="description-link">On vous accompagne pour vous faciliter la vie avec la "paperasse".</div>
                    </div>
                    <Link to={{ pathname: "" }} className="link">
                        <RightIcon className="icon" />
                    </Link>
                </div>

                <div className="menu-link">
                    <div className="menu-box">
                        <DanaF width="50%" />
                        <div className="titre-link">Gestion des contrats</div>
                        <div className="description-link">Laissez-vous guider pour tarnsférer ou souscrire à un contrat</div>
                    </div>
                    <Link to={{ pathname: "" }} className="link">
                        <RightIcon className="icon" />
                    </Link>
                </div>

                <div className="menu-link">
                    <div className="menu-box">
                        <DanaF width="50%" />
                        <div className="titre-link">Tri de ses affaires</div>
                        <div className="description-link">Vous ne savez plus où donner de la tête ? Trier, donner, jeter ?</div>
                    </div>
                    <Link to={{ pathname: "" }} className="link">
                        <RightIcon className="icon" />
                    </Link>
                </div>

                <div className="menu-link">
                    <div className="menu-box">
                        <DanaF width="50%" />
                        <div className="titre-link">Faire ses cartons</div>
                        <div className="description-link">Vous ne savez plus où donner de la tête ?</div>
                    </div>
                    <Link to={{ pathname: "MenuCarton" }} className="link">
                        <RightIcon className="icon" />
                    </Link>
                </div>

                <div className="menu-link">
                    <div className="menu-box">
                        <DanaF width="50%" />
                        <div className="titre-link">Transport</div>
                        <div className="description-link">Vous ne savez plus où donner de la tête ?</div>
                    </div>
                    <Link to={{ pathname: "CalculateurVolume" }} className="link">
                        <RightIcon className="icon" />
                    </Link>
                </div>
            </div>
            {/*
        <div className="footer">
            Le footer ici, prochainement
        </div>
        */}
            <div className="cheat"></div>

        </div>
    );
}

export default TableauDeBord;
