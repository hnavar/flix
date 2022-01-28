import React, { useEffect, useState, FC } from 'react';
import { Button, Grid, Paper, Typography, Avatar, } from '@material-ui/core';

//MUI
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const paperStyle = {
  padding: '2rem',
  height: 350,
  width: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(4px)',
  borderRadius: '0.5rem',
  boxShadow: '0 0 1rem rgba(25, 25, 25, 1)',
};

const avatarStyle = { width: 225, height: 225, opacity: 1.0, variant: 'square', borderRadius: 0 };

const buttonStyles = {
  background: 'rgba(254, 213, 2, 1)',
  color: 'rgba(25, 25, 25, 1)',
  fontWeight: 900,
  fontSize: '1rem'
};

export const Login: FC<any> = ({ user }) => !user ? (
  <Grid container
    style={{ height: '90vh' }}
    justifyContent='center'
    alignItems='center'
  >
    <Paper elevation={10} style={paperStyle}>
      <Grid container
        style={{ height: '100%' }}
        direction='column'
        justifyContent='space-between'
        alignItems='center'
      >
        <Avatar style={avatarStyle} src='/assets/flixar.png' />
        <Typography style={{ paddingBottom: '1rem', fontWeight: 600 }} variant='h5'>Sign in!</Typography>
        <Grid container
          direction='row'
          justifyContent='space-evenly'
          alignItems='flex-end'
        >
          <Button style={buttonStyles} type='submit' variant='contained' startIcon={<GoogleIcon />} href='/auth/google'>Google</Button>
          <Button style={buttonStyles} type='submit' variant='contained' startIcon={<TwitterIcon />} href='/auth/twitter' >Twitter</Button>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
) : null

export default Login;
