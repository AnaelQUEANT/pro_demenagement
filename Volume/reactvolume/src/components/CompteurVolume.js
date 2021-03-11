import { useEffect, useState} from 'react';
import './CompteurVolume.css';

export const CompteurVolume = (props) =>{
    const [volume, setVolume] = useState([]);
    return (
        
        <div>
            <div><p>elements</p></div>
            <div><p>surface</p></div>
            <i class="bi bi-truck"></i>
        </div>
      );

}