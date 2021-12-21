import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Twitter from './Twitter';
import TemporaryDrawer from './NavDrawer';

const App:FC = () => {

  return (
    <div className ='App'>
      <TemporaryDrawer />
      <SearchMovie/>
      <Home />
      {/* <Home /> */}
      <Twitter/>
    </div>
  );
};


export default App;