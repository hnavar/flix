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
const settings = ['Home', 'Profile', 'Log out'];

const Profile:FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [favActors, setFavActors] = useState<any>([]);
  const [favDirectors, setFavDirectors] = useState<any>([]);
  const [favGenres, setFavGenres] = useState<any>([]);
  const [favMovies, setFavMovies] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<object>>([]);
  const [view, setView] = useState<Array<object>>([]);
  const loading = open && options.length === 0;

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


  const bubby = {
    id: 0,
    username: 'Dr.Bubby',
    email_Oauth: 'bubs@blackmesa.gov',
    twitter_Oauth: 'stringhere',
    twitter_user_name: 'beelzebubby',
    first_name: 'Dr.',
    last_name: 'Bubby',
    profile_image_url: 'http://pm1.narvii.com/7756/2bf459ecf1955ebe30273acddac73085eb60ccb6r1-385-385v2_00.jpg',
    age: 60
  };
  /*
  * 0. set basic default profile
  * 1. get favorite genres by user id
  * 2. get favorite movies by user id
  * 3. get favorite actors by user id
  * In the requests, should I be making one chained request, or individual requests for when favorites
  * need to update?
  *
  * 4. Update each category individually when user favorites/unfavorites them.
  *   4.5 - getAllFavorites runs once on load and gets everything. get{whatever}Favorite just gets the one after a change
  *
  * genres.split(', ') to get individual genres
  */
  //default profile obj, to be removed when Login works



  const getAllFavorites = () => {
    const id = currentUser?.id;
    const getActors = axios.get('/api/actors/');
    const getDirectors = axios.get('/api/directors/');
    const getGenres = axios.get('/api/genres/');

    axios.all([getActors, getDirectors, getGenres])
      .then(responseArr => {
        setFavActors(responseArr[0])
        setFavDirectors(responseArr[1]);
        setFavGenres(responseArr[2]);
        console.log(responseArr[0]);
      }).catch((err) => { console.log('Unable to retrieve user favorites', err); });
  };

  //is there a way to set this up so that depending on whatever is clicked, that clicked item will be identified and passed
  //into the axios put request, instead of creating a request for each item type
  const updateFavorite = () => {
    //on target click, remove favorite
  };



  useEffect(() => {
    setCurrentUser(bubby);
    getAllFavorites();
  }, []);


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
                <Avatar alt="Remy Sharp" src={currentUser?.profile_image_url} />
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

export default Profile;
