import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Twitter from './Twitter';
import Paths from '../Routes';
import NavigationBar from './NavigationBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App:FC = () => {

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        {Paths.map((route: any, index: number) => {
          return <Route
            path={route.path}
            key={index}
            element={<route.component />}
          />
        })}
        <Route path ="*" element={<h2>404: Not found</h2>}/>
      </Routes>
    </BrowserRouter>
  );
};


export default App;