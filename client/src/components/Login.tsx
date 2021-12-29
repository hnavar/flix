import React, { useEffect, useState, FC } from 'react';

import axios from 'axios';

export const Login:FC = ({children}) => {
  const [currentUser, setCurrentUser] = useState<any>();



  //profile button that lets me see profile, that lets me see my favorite genres/movies/actors
  //conditional render of log-in vs log-out depending if the user object is present

  useEffect(() => {
    //setTimeout b/c will throw 'unmounted' error without it.
    setTimeout(() => {
      setCurrentUser(children);
    })
  }, [children]);


  return (
    <div>
      {!currentUser ? <a href="/auth/google">Login with Google</a> : <a href="/logout">Logout</a> }
      <br/>
    </div>
  );
};

export default Login;