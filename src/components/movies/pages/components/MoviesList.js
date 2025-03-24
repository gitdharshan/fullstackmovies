import React from 'react';
import Card from '../../../UIELEMENTS/Card';
import  MoviesItem from './MoviesItem';
 import './MoviesList.css';
const MovieList=  (props) =>{
  if(props.items.length === 0){
    return(
      <div className='movie-list center'>
        <Card>
        <h2>No Movies found. May be create one</h2>
        <button>Share Movies</button>
        </Card>
      </div>
    )
  }
return(
 <ul className='movie-list'>
   {props.items.map(movie =>
    <MoviesItem 
    key={movie.id}
    id={movie.id}
    image={movie.image}
    movie_name={movie.movie_name}
    description={movie.description}
    year={movie.year}
    rating={movie.rating}
    creatorId ={movie.creator}
    onDelete={props.onDeleteMovie}

    />
   )}
 </ul>
)
}

export default MovieList;