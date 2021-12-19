import React, { FC } from 'react';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';

interface Props {
  id?: number;
}

const App:FC<Props> = (props) => {

  return (
    <div className ='App'>
      {/* <Home /> */}
      <Profile />
      <Login />
    </div>
  );
};


export default App;