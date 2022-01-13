import React, { FC, useState, useEffect } from 'react';
import Paths from '../Routes';
import NavigationBar from './NavigationBar';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './MovieDetail';
import axios from 'axios';
import Login from './Login';
import TsParticles from './tsParticle/tsParticles';
import Theme from './Theme';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import styles from '../styles/styles';






const App:FC = () => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [currentTheme, setCurrentTheme] = useState<boolean>(false);


  const theme = createTheme({
    palette: {
      type: currentTheme ? 'dark' : 'light',
    },
})

  const getLoggedInUser = () => {
    axios.get('/verify')
      .then(({data}) => {
        console.log(data);
        setCurrentUser(data);
        setCurrentTheme(data.theme);
      })
      .catch((err) => {
        console.log('Unable to verify user', err);
      });
  };

  const setUserTheme = () => {
    axios.patch(`/api/users/${currentUser.id}`, {theme: !currentTheme})
    .then(() => {
      console.log('Updated user theme', currentTheme)
      setCurrentTheme(!currentTheme);

    })
    .catch((err: any) => { console.log('Unable to update user theme')})
  }

  const handleTheme = () => {
    console.log('theme clicked')
    // setCurrentTheme(!currentTheme);
    setUserTheme();
  }

// currentUser.photos[0].value
  //this only needs to run once, will update when the user logs out and is redirected to login page.
  useEffect(() => {
    getLoggedInUser();
  }, []);


  return (
    <>
      {!currentUser
      ? <Login />
      : (<>
          <Login user={currentUser} />
          <ThemeProvider theme={theme}>
            <Paper>
            <CssBaseline />
            <Switch checked={currentTheme} onChange={() => handleTheme()}/>

          <NavigationBar/>
          <TsParticles />
          <Routes>
            {Paths.map((route: any, index: number) => {
              return <Route
                path={route.path}
                key={index}
                element={<route.component user={currentUser} />} />;
            })}
            <Route path='movies/:id' element={<MovieDetail />} />
            <Route path="*" element={<h2>404: Not found</h2>} />
          </Routes>
          </Paper>
          </ThemeProvider>
        </>
      )}
    </>
  );
};


export default App;
