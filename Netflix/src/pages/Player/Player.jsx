import React, { useEffect, useState } from 'react'
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const [apiData,setApiData] = useState({
    name: "",
    key:"",
    published_at: "",
    typeof: ""
  })

  const {id} = useParams();
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2NhODcxM2M1Yzc0ZWExOGM4YjI4OGE4NzZhNzFkZSIsIm5iZiI6MTcyMzEwMjE4OC44ODM4MzYsInN1YiI6IjY2YjQ3MmZhMGM1Y2I5NGZlMDI3ZjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tox0zjy1cANeMazjahu9IIy4IxE7GLz_8emPuyL4GwM'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])

  return (
    <div>
      <div className="player">
        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
        <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}title='trailer' frameBorder='0' allowFullScreen></iframe>
        <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      </div>
    </div>
  )
}

export default Player
