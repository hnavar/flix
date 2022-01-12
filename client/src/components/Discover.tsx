import React, {FC, useState, useEffect} from "react";
import axios from 'axios';
import SingleTweet from './SingleTweet'

//MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

interface currentMovie {
  id: number;
  movie_id: string;
  title: string;
  release_date: string;
  description: string;
  trailer_url: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
}


const Discover:FC<any> = ({user}) => {
  const [currentUser, setCurrentUser] = useState<any>(user);
  const [tweets, setTweets] = useState([]);

  const [currentMovie, setCurrentMovie] = useState<null | currentMovie >(null);
  const [genresList, setGenresList] = useState([]);
  const [directorsList, setDirectorsList] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  const [movieList, setMovieList] = useState([]);



  const handleNextClick = () => {
    getRandomMovie();
  }

  const handleSaveClick = () => {
    saveMovie();
    getRandomMovie();
  }
  const getGenresList = () => {
    axios('/api/genres/')
    .then(({data}) => {
      const result = data.map((movie: any) => movie.genre);
        setGenresList(result)
      })
    }
    const getDirectorsList = () => {
      axios('/api/directors/')
        .then(({data}) => {
          const result = data.map((movie: any) => movie.director_name);
          setDirectorsList(result)
        })
    }

    const getActorsList = () => {
      axios('/api/actors/')
        .then(({data}) => {
          const result = data.map((movie: any) => movie.actor_name);
          setActorsList(result)
        })
    }

    const getMovieList = () => {
      axios('/api/movies/')
        .then(({data}) => {

          // const result = data.map((movie: any) => movie.actor_name);
          setMovieList(data)
        })
    }

    const getRandomMovie = () => {
      axios('/api/movies/')
          .then((data) => {
            setMovieList(data.data)
            const randomNum = Math.floor(Math.random() * 250);
            setCurrentMovie(data.data[randomNum])
            getTweets();
          })
    }

    const saveMovie = () => {
      if(user) {
        axios({
          method: 'post',
          url: '/api/users/user-movies',
          data: {
            movieId: currentMovie?.id,
            userId: user.id
          }
        })
          .then(() => {
            getRandomMovie();
            getTweets();
          })
      }
    }


    const getTweets = () => {
      const options: any = {
        url: 'http://localhost:3000/api/twitter/tweets',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        params: {
          title: currentMovie?.title
        }
    }
    axios(options)
        .then(({data}) => {
          setTweets(data.data)
        })
    }


      useEffect(() => {
        getRandomMovie();
        setCurrentUser(user);
        getTweets();
      }, [])
      return (
        <div>
          <div>
            <Stack direction='column' spacing={4}>
              <Typography variant='h1' align='center'>
              {!!currentMovie ? currentMovie.title : ''}
              </Typography>
              {/* <div
              style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}
              >
              <iframe width="1000" height="600" src={!!currentMovie ? currentMovie.trailer_url: ''} frameBorder="0"></iframe>
              </div> */}
              <Container>
                <Card>
                    <CardMedia
                      component='iframe'
                      height='600'
                      width='800'
                      src={!!currentMovie ? currentMovie.trailer_url: ''}
                    />
                </Card>
              </Container>

              <Typography variant='h4' align='center'>
              {!!currentMovie ? currentMovie.description : ''}
              </Typography>

              <Typography variant='h2' align='center'>
              Release Date: {!!currentMovie ? currentMovie.release_date : ''}
              </Typography>
            </Stack>
          </div>


        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor: 'purple'}}
          onClick={() => handleNextClick()}
        >
            Get a New Movie
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{backgroundColor: 'purple', float: 'right'}}
          onClick={() => handleSaveClick()}
        >
            Save movie
        </Button>

        <div className="TwitterTweets">
            {tweets.map((tweet: any) => {
                // {console.log(tweet)}
                return <SingleTweet key={tweet.id} text={tweet.text}/>
            })

            }
        </div>

      </div>
    )
  };

  export default Discover;