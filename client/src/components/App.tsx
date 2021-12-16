import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';


const App:FC = () => {

  return (
    <div className ='App'>
      <SearchMovie/>
      <Home />
    </div>
  );
};


export default App;