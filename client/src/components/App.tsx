import React, { FC, useEffect, useState } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import NavBar from './NavBar';
import Login from './Login';
import Profile from './Profile';


interface Props {
  id?: number;
}
import Twitter from './Twitter';
import axios from 'axios';

const App:FC<Props> = () => {

  const [currentUser, setCurrentUser] = useState<any>();


  const getLoggedInUser = () => {
    axios.get('/verify')
      .then(({data}) => {
        console.log('Current User', data);
        setCurrentUser(data);
      })
  };

// currentUser.photos[0].value
  //this only needs to run once, will update when the user logs out and is redirected to login page.
  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <div className ='App'>
      <NavBar children={currentUser}/>
      <Login children={currentUser}/>
      <Profile children={currentUser}/>
      <SearchMovie/>
      <Home />
      <Twitter/>
    </div>
  );
};


export default App;