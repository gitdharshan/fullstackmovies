import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "./components/MoviesList";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../components/UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../UIELEMENTS/LoadingSpinner";

const UserMovies = () => {
  const [loadedMovies, setLoadedMovies] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/movies/user/${userId}`);
        setLoadedMovies(responseData.movies);
      } catch (err) {}
    };
    fetchMovies();
  }, [sendRequest, userId]);

  // Function to remove deleted movie from UI
  const movieDeleteHandler = (deletedMovieId) => {
    setLoadedMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== deletedMovieId));
  };
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMovies && <MovieList items={loadedMovies} onDeleteMovie={movieDeleteHandler} />}
    </React.Fragment>
  );
};

export default UserMovies;
