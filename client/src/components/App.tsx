import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Twitter from './Twitter';
import DisplayMoviesByGenre from './movieByGenre';

const App:FC = () => {

  return (
    <div className ='App'>
      <DisplayMoviesByGenre/>
      {/* <SearchMovie/> */}
      {/* <Home /> */}
      {/* <Home /> */}
      {/* <Twitter/> */}
    </div>
  );
};


export default App;