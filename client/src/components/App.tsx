import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Twitter from './Twitter';
import DisplayMoviesByRating from './movieByRating';

const App:FC = () => {

  return (
    <div className ='App'>
      <DisplayMoviesByRating/>
      {/* <SearchMovie/> */}
      {/* <Home /> */}
      {/* <Home /> */}
      {/* <Twitter/> */}
    </div>
  );
};


export default App;