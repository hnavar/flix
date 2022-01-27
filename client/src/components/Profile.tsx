import React, { useState, FC, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
//MUI
import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardContent,
  Tab,
  Tabs,
  CardMedia,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import useStyles from "../styles/profile.styles";
import UserPreferences from './UserPreferences';
import MovieCards from './MovieCards';

const Profile: FC<any> = ({ user }) => {

  //User favorites {movies, actors, genres, directors}
  const [favoriteActors, setFavoriteActors] = useState<null | Array<object>>(null);
  const [favoriteDirectors, setFavoriteDirectors] = useState<any>();
  const [favoriteGenres, setFavoriteGenres] = useState<any>();
  const [currentTab, setCurrentTab] = useState<string>('Favorite Movies');
  const classes = useStyles();

  const tabInfo = [
    { title: 'Favorite Movies', icon: <FavoriteIcon /> },
    { title: 'Favorite Actors', icon: <SettingsAccessibilityIcon /> },
    { title: 'Favorite Genres', icon: <TheaterComedyIcon /> },
    { title: 'Settings', icon: <SettingsApplicationsIcon /> },
  ];


  const getTabContent = () => {
    if (currentTab === 'Favorite Movies') {
      return <MovieCards userId={user.id} />
    }
    if (currentTab === 'Favorite Actors') {
      return <MovieCards userId={user.id} />
    }
    if (currentTab === 'Favorite Genres') {
      return <MovieCards userId={user.id} />
    }
    if (currentTab === 'Settings') {
      return <MovieCards userId={user.id} />
    }

    setCurrentTab('Favorite Movies');
    return <MovieCards userId={user.id} />
  };

  //Used to get all favorites upon initial load.
  // const getAllFavorites = (userId: number) => {
  //   const getActors = axios.get(`/api/users/actors/${userId}`);
  //   const getDirectors = axios.get(`/api/users/directors/${userId}`);
  //   const getGenres = axios.get(`/api/users/genres/${userId}`);

  //   axios.all([getActors, getDirectors, getGenres])
  //     .then(responseArr => {
  //       setFavoriteActors(responseArr[0].data.actors);
  //       setFavoriteDirectors(responseArr[1].data.directors);
  //       setFavoriteGenres(responseArr[2].data.genres);
  //       console.log('Favorite Actors', responseArr[0].data.actors)
  //       console.log('Favorite directors', responseArr[1].data.directors)
  //       console.log('Favorite genres', responseArr[2].data.genres)

  //     }).catch((err) => { console.log('Unable to retrieve user favorites', err); })
  // };

  // useEffect(() => {
  //   getAllFavorites(user.id);
  // }, []);


  //INDIVIDUAL UPDATE FUNCTIONS
  //used for removing user favorites from the page.
  /*


  const getFavActors = (userId: number) => {
    axios.get(`/api/actors/${userId}`)
      .then(({data}) => {
        setFavoriteActors(data)})
      .catch(() => console.log('Failed to get favorite actors'));
  };
  useEffect(() => {
    getFavActors(user?.id);
  }, [favoriteActors])


  const getFavDirectors = (userId: number) => {
    axios.get(`/api/directors/${userId}`)
    .then(({data}) => {
      setFavoriteDirectors(data)})
    .catch(() => console.log('Failed to get favorite directors'));
  };
  useEffect(() => {
    getFavDirectors(user?.id);
  }, [favoriteDirectors])


  const getFavGenres = (userId: number) => {
    axios.get(`/api/genres/${userId}`)
    .then(({data}) => {
      setFavoriteGenres(data)})
    .catch(() => console.log('Failed to get favorite genres'));
  };
  useEffect(() => {
    getFavGenres(user?.id);
  }, [favoriteGenres])

    //TODO: Movies needs backend routes for user favorites
  const getFavMovies = (userId: number) => {
  axios.get(`/api/movies/${userId}`)
  .then(({data}) => {
    setFavoriteMovies(data[userId])})
  .catch(() => console.log('Failed to get favorite movies'));
  };
  useEffect(() => {
  getFavMovies(user?.id);
  }, [favoriteMovies])

  useEffect(() => {
  //setTimeout b/c will throw 'unmounted' error without it.
  setTimeout(() => {
    setuser(children);
  })
  }, [children]);


  // is there a way to set this up so that depending on whatever is clicked, that clicked item will be identified and passed
  // into the axios put request, instead of creating a request for each item type
  const removeFavorite = (num:any) => {
  console.log('hello');
  console.log('target title', num);
  axios.delete(`/api/users/movies/${user.id}`)
  .then(() => { console.log('Removed favorite')})
  .catch(() => {console.log('Failed to remove')})
  };
  */

  return (

    <div>
      {!user ? null :
        <>
          <Card className={classes.root}>
            <div style={{ height: '50vh' }}>
              <CardMedia className={classes.media} image={user.profile_cover_photo_url} title="Cover" />
            </div>
            <div className={classes.main} style={{ maxHeight: '175px' }}>
              <Avatar sx={{ width: 250, height: 250 }}
                src={user.profile_image_url} className={classes.profileImage} />
            </div>

            <Typography
              align={"center"}
              className={classes.main}
              variant="h4"
            >
              {user.username}
            </Typography>
            {!user.twitter_user_name ? null : <Typography
              align={"center"}
              variant="subtitle2"
            >
              {`@${user.twitter_user_name}`}
            </Typography>}

            <CardContent className={classes.contentContainer}>

              <Tabs
                centered
                className={classes.main}
                value={currentTab}
              >
                {tabInfo.map(({ icon, title }) => (
                  <Tab key={title} value={title} onClick={() => setCurrentTab(title)} icon={icon} label={title} />
                ))}
              </Tabs>

              <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', paddingTop: '1rem' }}>
                {getTabContent()}
              </div>
            </CardContent>
          </Card>

          <div>
            <Typography variant='h6'>
              Your Favorite Actors
            </Typography>
            <Stack direction='row' spacing={2}>
              {!favoriteActors ? null : favoriteActors.map((actor: any, key: number) => {
                return (
                  <Card key={key}>
                    <CardContent>
                      <Typography>
                        {actor.actor_name}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
            <UserPreferences user={user} />
          </div>
        </>
      }
    </div>
  );
};

export default Profile;