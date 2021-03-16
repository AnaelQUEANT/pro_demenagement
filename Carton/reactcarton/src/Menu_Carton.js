import React from 'react'
import './MenuCarton.css';
import { Link } from 'react-router-dom'
import ImageChevron from './Image/chevron2.png';
import ImageInfo from './Image/info.png';


class MenuCarton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="ListeSalles" >
        <div className="row liste-elem">

          <div className="col-2 photo-info">
            <img className="ImageCarton" src={ImageInfo} width="160%" alt="image temporaire de carton"></img>
          </div>
          <div className="col-6 liste-info" >
            <span>Préparer</span>
            <br />
            <span>ses cartons</span>

          </div>

          <img className="ImageChevron col-4" src={ImageChevron} alt="image temporaire de carton"></img>


        </div>
      </Link >
    )
  }
}
export default MenuCarton