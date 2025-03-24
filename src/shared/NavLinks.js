import React ,{useContext} from 'react';

import { NavLink } from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import Button from './FormElements/Button';
import './NavLink.css';
const NavLinks = (props) =>{

  const auth =  useContext(AuthContext);
  return(
    <ul className='nav-links'>
     <li>
     <NavLink to="/" exact >HOME</NavLink>
     </li>
     {auth.isLoggedIn && ( <li>
      <NavLink to="/user"> ALL USERS</NavLink>
     
      </li>)
    }
    {!auth.isLoggedIn && (
    <li>
    <NavLink to={`/${auth.userId}/movies`}>MY MOVIES</NavLink>
    </li>
    )}

    {auth.isLoggedIn && (
      <li>
      <NavLink to="/new">ADD MOVIE</NavLink>
      </li>
    )}  
    {!auth.isLoggedIn && (
      <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
   
    )}
    {auth.isLoggedIn && (
    
    <Button onClick={auth.logout}>LOGOUT</Button>
    
    )}
 
  
    </ul>
  )
}

export default NavLinks;