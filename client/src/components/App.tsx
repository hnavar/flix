import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Twitter from './Twitter';
import Paths from '../Routes';
import NavigationBar from './NavigationBar';
import {Routes, Route} from 'react-router-dom';

const App:FC = () => {

  return (
    <div className ='App'>
      <NavigationBar />
      <Routes>
        {Paths.map((route: any) => {
          <Route path={route.path} key={route.path} element={route.component} />
        })}
      </Routes>
      {/* <SearchMovie/>
      <Home />\
      <Twitter/> */}
    </div>
  );
};


export default App;