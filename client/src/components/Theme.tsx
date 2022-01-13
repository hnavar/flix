import React, { useState, FC } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'




// const buttonTheme = createTheme({

// })

// const globalTheme = ({
//   typography: {
//     button: {}
//   }
// })


// let theme = createTheme({
//   palette: {
//     primary: {
//       main: '#0052cc',
//     },
//     secondary: {
//       main: '#edf2ff',
//     },
//   },
// });

// theme = createTheme(theme, {
//   palette: {
//     info: {
//       main: theme.palette.secondary.main,
//     },
//   },
// });


const themeLight = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00'
    }
  }
});



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
        asdfasdf
    </ThemeProvider>
    </>
  );
};


export default Theme;