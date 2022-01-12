import React, { useState, FC } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'






const Theme:FC = () => {
  const [dark, setDark] = useState<boolean>(false);

  const theme = createTheme({
      palette: {
        type: dark ? 'dark' : 'light',
      }
  })



  return (
    <>
    <ThemeProvider theme={theme}>
      <Switch checked={dark} onChange={() => setDark(!dark)} />
      <Paper>
        <Typography variant='h1'>This is h1 test text</Typography>
      </Paper>
      </ThemeProvider>
    </>
  );
};


export default Theme;