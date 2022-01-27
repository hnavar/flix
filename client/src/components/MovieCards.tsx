import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';

const MovieCards = ({ userId }: { userId: number }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<any>();

  const getFavoriteMovies = () => {
    axios.get(`/api/users/movies/${userId}`)
      .then(({ data }) => {
        setFavoriteMovies(data.movies);
      })
  };

  const removeFavorite = (movieId: number) => {
    axios.delete('/api/users/movies/destroy', {
      data: {
        movieId,
        userId
      }
    });
   getFavoriteMovies();
  }

  useEffect(() => {
    getFavoriteMovies();
  }, [])

  return (
    !favoriteMovies ? <h1> User has no favorites </h1> : favoriteMovies.map((movie: any, key: number) => (
      <Card key={key} style={{ width: 300, margin: '0.5rem', boxShadow: '-1px 1px 6px rgba(125, 125, 125, 0.5)' }}>
        <ClearIcon onClick={() => removeFavorite(movie.id)} />
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={movie.thumbnailUrl}
            alt="movie image" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
    ));
};


export default MovieCards;