import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../../shared/FormElements/Input';
import Button from '../../../shared/FormElements/Button';
import Card from '../../UIELEMENTS/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import LoadingSpinner from '../../UIELEMENTS/LoadingSpinner';
import ErrorModal from '../../UIELEMENTS/ErrorModal';
import { AuthContext } from '../../../shared/context/auth-context';
import { useForm } from '../../../shared/hooks/form-hook';
import './NewMovies.css';

const EditMovies = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMovie, setLoadedMovie] = useState();
  const moviesId = useParams().moviesId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      movie_name: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/movies/${moviesId}`);
        setLoadedMovie(responseData.movie);
        setFormData(
          {
            movie_name: { value: responseData.movie.movie_name, isValid: true },
            description: { value: responseData.movie.description, isValid: true },
          },
          true
        );
      } catch (err) {}
    };
    fetchMovie();
  }, [sendRequest, moviesId, setFormData]);

  const movieUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/movies/${moviesId}`,
        'PATCH',
        JSON.stringify({
          movie_name: formState.inputs.movie_name.value,
          description: formState.inputs.description.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      navigate('/movies'); // Redirect after update
    } catch (err) {}
  };

  if (!loadedMovie && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the movie.</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {loadedMovie && (
        <form className="place-form" onSubmit={movieUpdateHandler}>
          <Input
            id="movie_name"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid movie name."
            onInput={inputHandler}
            initialValue={formState.inputs.movie_name.value}
            initialValid={formState.inputs.movie_name.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE MOVIE
          </Button>
        </form>
      )}
    </>
  );
};

export default EditMovies;
