import React, { useEffect, useState, FC } from 'react';
import { Button, Box, Grid, Card, TextField, Paper, Typography, Avatar, Link, CardMedia } from '@material-ui/core';
import TsParticles from './tsParticle/tsParticles';
import axios from 'axios';
// import flixar from '../images/flixar.png';
// let img = '../images/flixar.png';
// const flixar = require('../images/flixar.png');

export const Login:FC<any> = ({user}) => {
  const [currentUser, setCurrentUser] = useState<any>();



  //profile button that lets me see profile, that lets me see my favorite genres/movies/actors
  //conditional render of log-in vs log-out depending if the user object is present

  useEffect(() => {
    //setTimeout b/c will throw 'unmounted' error without it.
    setTimeout(() => {
      setCurrentUser(user);
    })
  }, [user]);

  // const Content = () => {
  //   // const image = URL.createObjectURL(img);
  //   return (
  //   <div>
  //     <img src={flixar} />
  //   </div>
  //   );
  // }
  // https://res.cloudinary.com/doruu9b3f/image/upload/v1641818928/snap_flixar_ngn5ui.png
  // console.log(flixar);
  return (
  <>
  <div>
    <TsParticles />
    {!currentUser ?
    <>
        <div
          style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}
        >
            <Button variant='contained' color='inherit'
        style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
        >
          <a href="/auth/google">Login with Google</a>
        </Button>
            <img src='https://res.cloudinary.com/doruu9b3f/image/upload/v1641818928/snap_flixar_ngn5ui.png' alt="flixar" />

        </div>
    </>
    :
    <>
    {null}
    </>
    }
  </div>
  </>




    // <div style={{ padding: 30 }}>
    //   <Paper>
    //     <Grid container
    //           spacing={3}
    //           direction={'column'}
    //           justify={'center'}
    //           alignItems={'center'}
    //           >
    //   {!currentUser ? <a href="/auth/google">Login with Google</a> : <a href="/logout">Logout</a> }
    //     </Grid>
    //   </Paper>
    //   <br/>
    // </div>
    // </>
  );
};

export default Login;

{/* <a href="/logout">Logout</a> */}