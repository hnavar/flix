import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';

interface Props {
  id?: number;
}
import Twitter from './Twitter';

const App:FC<Props> = (props) => {

  return (
    <div className ='App'>
      <Profile />
      <Login />
      <SearchMovie/>
      <Home />
      <Twitter/>
    </div>
  );
};


export default App;