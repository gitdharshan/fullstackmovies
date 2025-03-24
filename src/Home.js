import React from 'react';
import './Home.css';
const movies = [

  {
    title: "Avengers: Endgame",
    description: 'The epic conclusion of the Avengers saga.',
    image: "https://th.bing.com/th/id/OIP.WVWesbet0E70HmkG7weOjQHaKC?rs=1&pid=ImgDetMain",
   
  },
  {
    title: "Spider-Man: No Way Home",
    description: 'Peter Parker’s multiverse adventure.',
    image: "https://images3.alphacoders.com/247/247849.jpg",
   
  },
  {
    title: "The Batman",
    description: 'A dark and gritty version of the iconic superhero.',
    image: "https://th.bing.com/th/id/R.ebf693b9e77eedf6380e01cf0ec89639?rik=YaG%2fhFoXgQHYPg&riu=http%3a%2f%2fbamsmackpow.com%2ffiles%2f2016%2f04%2fBatman4.jpg&ehk=egi6WZKGsaSGwfCILM2ELNLLT2WSCOLTA0tgqnYSURk%3d&risl=&pid=ImgRaw&r=0",
   
  },
  {
    title: "The Dark Knight",
    description: 'A masterpiece of modern superhero cinema.',
    image: "https://th.bing.com/th/id/R.a64310aeeb38ceb1e3224435933cf524?rik=qti0rIt8iuCrPQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fVg6ESpH.jpg&ehk=WHfL2mA0UkIPwTjQh0w%2fljyAQyRtPZhoemSNP8%2bj6Ww%3d&risl=&pid=ImgRaw&r=0",
   
  },
  {
    title: "Interstellar",
    description: 'A visually stunning, mind-bending sci-fi film.',
    image: "https://th.bing.com/th/id/OIP.jVVUF1D1uEuSPvQtvM5uXgHaLH?rs=1&pid=ImgDetMain",
  
  },

 
];

const MoviesCard = ({title,image,trailer,description,primeLink}) => {
  return(
    <div className='movie-card'>
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
   
  
    </div>
  )
};

const MovieList = () =>{
  return(
    <div className='movie-list'>
     {movies.map((movie,index) =>(
      <MoviesCard key={index} {...movie}/>
     ))}
    </div>
  )
}

export default MovieList;