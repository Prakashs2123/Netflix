import React, { useEffect, useState } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({title,category}) => {
  const [apiData,setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2NhODcxM2M1Yzc0ZWExOGM4YjI4OGE4NzZhNzFkZSIsIm5iZiI6MTcyMzEwMjE4OC44ODM4MzYsInN1YiI6IjY2YjQ3MmZhMGM1Y2I5NGZlMDI3ZjBjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tox0zjy1cANeMazjahu9IIy4IxE7GLz_8emPuyL4GwM'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  },[]);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.map((card,index)=>{
             return <Link to={`/player/${card.id}`} className="card" key={index}>
             <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
             <p>{card.original_title}</p>
             </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
