import React, { useEffect, useState } from 'react';

import axios from 'axios';

export const Login = () => {
  const [currentUser, setCurrentUser] = useState<any>();



  // const onSuccess = (res: Request) => {
  //   axios.post((user: any) => {
  //     console.log('User saved');
  //   })
  //   .catch((err) => { console.log('Unable to save user', err) })
  //   .finally(setCurrentUser(res.profileObj));
  //   // refreshTokenSetup(res);
  // };

  // const onFailure = (res: Request) => {
  //   console.log('Login failed, res: ', res);
  //   alert('Failed to login.');
  // }


  // useEffect(() => {
  // }, [currentUser]);

  //profile button that lets me see profile, that lets me see my favorite genres/movies/actors

  return (
    <div>
      Login
    </div>
  );
};

