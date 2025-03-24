import React ,{useState,useCallback}from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home';
import MainNavigation from './shared/MainNavigation';
import Users from './components/UserMovies/pages/Users';
import UserMovies from './components/movies/pages/UserMovies';
import NewMovies from './components/movies/pages/NewMovies';
import EditMovies from './components/movies/pages/EditMovies';
import Auth from './components/UserMovies/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
const App = () => {
   const[isLoggedIn,setIsLoggedIn] = useState(false);
   const[userId,setUserId] = useState(false);
   const login  = useCallback((uid) =>{
    setIsLoggedIn(true);
    setUserId(uid);
   },[]);
   const logout = useCallback(() =>{
    setIsLoggedIn(false);
    setUserId(null);
   },[]);
   return(
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, userId:userId,login:login,
      logout:logout
    }}>
  
  <Router>
  <MainNavigation />
  <main>
  <Routes>
  <Route path="/" element={<Home />}/>
    <Route path="/user" element={<Users />}/>
    <Route path="/:userId/movies" element={<UserMovies />}/>
    <Route path="/new" element={<NewMovies />}/>
    <Route path="/movies/:moviesId" element={<EditMovies />}/>
    <Route path="/auth" element={<Auth />}/>
    </Routes>
  </main>
 
  </Router>
  </AuthContext.Provider>
   )
}

export default App;