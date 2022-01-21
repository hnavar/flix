import React, { useEffect, useState, FC } from 'react';
import { Button, Box, Grid, Card, TextField, Paper, Typography, Avatar, Link, CardMedia } from '@material-ui/core';
import TsParticles from './tsParticle/tsParticles';
import axios from 'axios';

//MUI
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';


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


  // https://res.cloudinary.com/doruu9b3f/image/upload/v1641818928/snap_flixar_ngn5ui.png

  const paperStyle = {padding: 20, height: 450, width: 280, margin:'20px auto'};
  const avatarStyle = {width: 200, height: 200, opacity: 1.0};
  return (
  <>
  <div>
    <TsParticles />
    {!currentUser ?
    <>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid container
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={4}
        >
          <Avatar style={avatarStyle}
                  src='https://res.cloudinary.com/doruu9b3f/image/upload/v1641818928/snap_flixar_ngn5ui.png'/>
          <Typography variant='h6'>Sign in</Typography>
        <TextField label='Username *' placeholder='Enter username' />
        <TextField label='Password *' placeholder='Enter password' type='password' />
        <Grid container
              direction='row'
              justifyContent='space-evenly'
              alignItems='center'
        >
        <Button type='submit' color='primary' variant='contained'>Sign In!</Button>
        <Button type='submit' color='primary' variant='contained'>Sign Up!</Button>
        </Grid>
        <Typography variant='caption'>Sign in with:</Typography>
        <Grid container
              direction='row'
              justifyContent='space-evenly'
              alignItems='flex-end'
        >
          <Button type='submit' color='primary' variant='contained' startIcon={<GoogleIcon />} href='/auth/google'>Google</Button>
          <Button type='submit' color='primary' variant='contained' startIcon={<TwitterIcon />}>Twitter</Button>
        </Grid>
        </Grid>
      </Paper>
    </Grid>



        {/* <div
          style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}
        >
            <Button variant='contained' color='inherit'
        style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
        >
          <a href="/auth/google">Login with Google</a>
        </Button>
            <img src='https://res.cloudinary.com/doruu9b3f/image/upload/v1641818928/snap_flixar_ngn5ui.png' alt="flixar" />

        </div> */}
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