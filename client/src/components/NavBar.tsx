import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

//MUI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  Autocomplete,
  CircularProgress,
  Avatar,
  Typography,
  Skeleton,
  Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { withStyles } from '@material-ui/core/styles';
import { mapFinderOptions } from 'sequelize/dist/lib/utils';


interface UserProps {
  id: number;
  username: string;
  email_Oauth: string;
  twitter_Oauth?: string;
  twitter_user_name?: string;
  first_name: string;
  last_name: string;
  profile_image_url?: string;
  age: number;
}

// interface Props {
//   id: number;
// }

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const pages = ['Movies', 'Actors', 'Directors', 'Genres'];
const settings = ['Home', 'Profile', 'Account', 'Log out'];



const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF'
  }
})(Typography);

const NavBar:FC = ({children}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<object>>([]);
  const [view, setView] = useState<Array<object>>([]);
  const loading = open && options.length === 0;

  const [user, setUser] = useState<any>();

  //Appbar states
  const [anchorElNav, setAnchorElNav] = useState<any>(null);
  const [anchorElUser, setAnchorElUser] = useState<any>(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  }
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (e: any) => {
    e.preventDefault();

  };

  // const getCurrentUser = (id: number) => {
  //   axios.get(`/api/users/${id}`)
  //     .then((data: any) => {
  //       console.log("user in navbar", data)
  //       setUser(data) })
  //     .catch((err) => { console.log('Unable to set current user', err)});
  // };

  const [currentUser, setCurrentUser] = useState<any>();


  useEffect(() => {
    //setTimeout b/c will throw 'unmounted' error without it.
    setTimeout(() => {
      setCurrentUser(children);
    }, 1000)
  }, [children]);

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            FLIX
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            FLIX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={!currentUser ? null : currentUser.profile_image_url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </>
  );
};

export default NavBar;

