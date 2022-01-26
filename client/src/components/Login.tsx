import React, { useEffect, useState, FC, SyntheticEvent } from 'react';
import { Button, Box, Grid, Card, TextField, Paper, Typography, Avatar, Link, CardMedia } from '@material-ui/core';
import TsParticles from './tsParticle/tsParticles';
import axios from 'axios';

//MUI
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';


export const Login: FC<any> = ({ user }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleUsernameChange = (e: SyntheticEvent) => {
    e.preventDefault();
  }

  const handlePasswordChange = (e: SyntheticEvent) => {
    e.preventDefault();
  };



  //profile button that lets me see profile, that lets me see my favorite genres/movies/actors
  //conditional render of log-in vs log-out depending if the user object is present

  useEffect(() => {
    //setTimeout b/c will throw 'unmounted' error without it.
    setTimeout(() => {
      setCurrentUser(user);
    })
  }, [user]);


  // https://res.cloudinary.com/doruu9b3f/image/upload/v1641818928/snap_flixar_ngn5ui.png

  const paperStyle = { padding: 20, height: 300, width: 280, margin: '20px auto' };
  const avatarStyle = { width: 200, height: 200, opacity: 1.0 };
  return (
      <div>
        {/* <TsParticles /> */}
        {!currentUser ?
          <Grid>
            <Paper elevation={10} style={paperStyle}>
              <Grid container
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing={4}
              >
                <Avatar style={avatarStyle} src='/assets/flixar.png' />
                <Typography variant='h6'>Sign in</Typography>
                {/* <TextField label='Username *' placeholder='Enter username' />
                  <TextField label='Password *' placeholder='Enter password' type='password' />
                  <Grid container
                    direction='row'
                    justifyContent='space-evenly'
                    alignItems='center'
                  >
                    <Button type='submit' color='primary' variant='contained'>Sign In!</Button>
                    <Button type='submit' color='primary' variant='contained'>Sign Up!</Button>
                  </Grid> */}
                <Typography variant='caption'>Sign in with:</Typography>
                <Grid container
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='flex-end'
                >
                  <Button type='submit' color='primary' variant='contained' startIcon={<GoogleIcon />} href='/auth/google'>Google</Button>
                  <Button type='submit' color='primary' variant='contained' startIcon={<TwitterIcon />} href='/auth/twitter' >Twitter</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          : null
        }
      </div>
  );
};

export default Login;

{/* <a href="/logout">Logout</a> */ }