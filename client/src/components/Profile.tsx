import React, {useState, FC, useEffect} from 'react';
import axios from 'axios';

//MUI
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
  Stack,
  Typography,
  Skeleton,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Movie } from '@material-ui/icons';



const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ActorsObj {
  actor_name: string;
}

interface UserObj {
  [key: string] : any;
}


const Profile:FC<any> = ({user}) => {
  //User profile object
  const [currentUser, setCurrentUser] = useState<UserObj>(user);

  //User favorites {movies, actors, genres, directors}
  const [favoriteActors, setFavoriteActors] = useState<null | Array<object>>(null);
  const [favoriteDirectors, setFavoriteDirectors] = useState<any>();
  const [favoriteGenres, setFavoriteGenres] = useState<any>();
  const [favoriteMovies, setFavoriteMovies] = useState<any>();

  //MUI states
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  //Used to get all favorites upon initial load.
  const getAllFavorites = (userId: number) => {
    const getActors = axios.get(`/api/actors/${userId}`);
    const getDirectors = axios.get(`/api/directors/${userId}`);
    const getGenres = axios.get(`/api/genres/${userId}`);
    const getMovies = axios.get(`/api/movies/${userId}`);

    axios.all([getActors, getDirectors, getGenres, getMovies])
      .then(responseArr => {
        setFavoriteActors(responseArr[0].data.actors);
        setFavoriteDirectors(responseArr[1].data.directors);
        setFavoriteGenres(responseArr[2].data.genres);
        setFavoriteMovies(responseArr[3].data)
        console.log('Favorite Actors', responseArr[0].data.actors)
        console.log('Favorite directors', responseArr[1].data.directors)
        console.log('Favorite genres', responseArr[2].data.genres)
        console.log('favorite movies', responseArr[3].data)

      }).catch((err) => { console.log('Unable to retrieve user favorites', err); })
  };

    useEffect(() => {
      setTimeout(() => {
          setCurrentUser(user);
          getAllFavorites(user.id);
      }, 2000)
    }, [user]);

//INDIVIDUAL UPDATE FUNCTIONS
//used for removing user favorites from the page.

  //   const getFavActors = (userId: number) => {
  //     axios.get(`/api/actors/${userId}`)
  //       .then(({data}) => {
  //         setFavoriteActors(data)})
  //       .catch(() => console.log('Failed to get favorite actors'));
  //   };
  //   useEffect(() => {
  //     getFavActors(currentUser?.id);
  //   }, [favoriteActors])


  //   const getFavDirectors = (userId: number) => {
  //     axios.get(`/api/directors/${userId}`)
  //     .then(({data}) => {
  //       setFavoriteDirectors(data)})
  //     .catch(() => console.log('Failed to get favorite directors'));
  //   };
  //   useEffect(() => {
  //     getFavDirectors(currentUser?.id);
  //   }, [favoriteDirectors])


  //   const getFavGenres = (userId: number) => {
  //     axios.get(`/api/genres/${userId}`)
  //     .then(({data}) => {
  //       setFavoriteGenres(data)})
  //     .catch(() => console.log('Failed to get favorite genres'));
  //   };
  //   useEffect(() => {
  //     getFavGenres(currentUser?.id);
  //   }, [favoriteGenres])

  //     //TODO: Movies needs backend routes for user favorites
  // const getFavMovies = (userId: number) => {
  //   axios.get(`/api/movies/${userId}`)
  //   .then(({data}) => {
  //     setFavoriteMovies(data[userId])})
  //   .catch(() => console.log('Failed to get favorite movies'));
  // };
  // useEffect(() => {
  //   getFavMovies(currentUser?.id);
  // }, [favoriteMovies])

  // useEffect(() => {
  //   //setTimeout b/c will throw 'unmounted' error without it.
  //   setTimeout(() => {
  //     setCurrentUser(children);
  //   })
  // }, [children]);


  //is there a way to set this up so that depending on whatever is clicked, that clicked item will be identified and passed
  //into the axios put request, instead of creating a request for each item type
  const updateFavorite = () => {
    //on target click, remove favorite
  };

  const handleClick = (e: any) => {
    e.preventDefault();

  };


  return(
    <>
      Profile
      <Avatar alt="Ben" src={!currentUser ? null : currentUser.profile_image_url}/>
      <div>
        Favorite Actors row
        <Stack direction='row' spacing ={2}>
          {!favoriteActors ? null : favoriteActors.map((actor: any, key: number) => {
            return (
          <Card>
            <CardContent>
              <Typography>
                {actor.actor_name}
              </Typography>
            </CardContent>
          </Card>
            )
          })}
        </Stack>
      </div>
      <div>
        Favorite Movies row
        <Stack direction='row' spacing ={2}>

          <Card>
            <CardContent>
              <Typography>
                test
                {!favoriteMovies ? null : favoriteMovies.title}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </>
  );
};

export default Profile;