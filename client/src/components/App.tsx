import React, { FC } from 'react';
import SearchMovie from './movieSearch';
import Home from './Home';
import Twitter from './Twitter';
import TemporaryDrawer from './NavDrawer';
import NavigationBar from './NavigationBar';
import Routes from '../Routes';
import {Switch, Route} from 'react-router-dom';

const App:FC = () => {

  return (
    <div className ='App'>
      <NavigationBar />
      <Switch>
        {Routes.map((route: any) => {
          <Route exact path={route.path} key={route.path}>
            <Route.component />
          </Route>
        })}
      </Switch>
      {/* <SearchMovie/>
      <Home />\
      <Twitter/> */}
    </div>
  );
};


export default App;