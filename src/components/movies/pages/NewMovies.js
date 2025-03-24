import React,{useContext,useState} from 'react'
import Input from '../../../shared/FormElements/Input';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/FormElements/Button';
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../../../shared/util/validators'
import ErrorModal from '../../UIELEMENTS/ErrorModal';
import LoadingSpinner from '../../UIELEMENTS/LoadingSpinner';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import './NewMovies.css';
const NewMovies = () =>{
  const auth = useContext(AuthContext);
 const{isLoading,error,sendRequest,clearError} =  useHttpClient();

 const[successMessage,setSuccessMessage] = useState("");

  const[formState,inputHandler] = useForm({
   movie_name:{
    value:'',
    isValid:false,
   },
   year:{
 value:'',
 isValid:false
   },

   description:{
    value:'',
    isValid:false,
   },
   rating:{
    value:'',
    isValid:false,
   }
   
  }
,false);

const history = useNavigate();

const movieSubmitHandler = async (event) =>{
  event.preventDefault()
  try{
    await
    sendRequest('http://localhost:5000/api/movies','POST',
      JSON.stringify({
        movie_name:formState.inputs.movie_name.value,
        year: formState.inputs.year.value,
        description:formState.inputs.description.value,
        rating:formState.inputs.rating.value,
        creator:auth.userId
      }),
      {'Content-Type':'application/json'}
    );
    setSuccessMessage("Movie added successfully");

     setTimeout(() =>history("/"),1000);
  }
  catch(err){}
 
};
return(
  <React.Fragment>
   <ErrorModal error={error} onClear={clearError}/>
  <form className='place-form' onSubmit={movieSubmitHandler}>
  {isLoading && <LoadingSpinner asOverlay/>}
  <Input 
  id="movie_name"
  element="input"
  type="text"
  label="Title"
  validators={[VALIDATOR_REQUIRE]}
  errorText="Please enter a valid moviename"
  onInput={inputHandler}
  />
  <Input 
  id="year"
  element="input"
  type="text"
  label="Year"
  validators={[VALIDATOR_REQUIRE]}
  errorText="Please enter a valid year"
  onInput={inputHandler} />
  <Input 
  id="description"
  element="input"
  type="text"
  label="Description"
  validators={[VALIDATOR_MINLENGTH(5)]}
  errorText="Please enter a valid moviename"
  onInput={inputHandler}
  />   

    <Input 
  id="rating"
  element="input"
  type="text"
  label="Rating"
  validators={[VALIDATOR_REQUIRE]}
  errorText="Please enter a rating 1-10"
  onInput={inputHandler}
  />
  <Button type="submit">
  ADD MOVIE
  </Button>
</form>
  </React.Fragment>


)
}

export default NewMovies;