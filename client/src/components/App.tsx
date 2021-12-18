import React, { FC } from 'react';
import Home from './Home';
import Profile from './Profile';

interface Props {
  id?: number;
}

const App:FC<Props> = (props) => {

  return (
    <div className ='App'>
      {/* <Home /> */}
      <Profile />
    </div>
  );
};


export default App;