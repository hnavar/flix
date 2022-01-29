import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const GenreCards = ({ userId }: { userId: number }) => {
  const [favoriteGenres, setFavoriteGenres] = useState<any>();

  const getFavoriteGenres = () => {
    axios.get(`/api/users/genres/${userId}`)
      .then(({ data }) => {
        setFavoriteGenres(data.actors);
      })
  };

  const removeFavorite = (genreId: number) => {
    axios.delete('/api/users/genres/destroy', {
      data: {
        genreId,
        userId
      }
    });
    getFavoriteGenres();
  }

  useEffect(() => {
    getFavoriteGenres();
  }, [])

  return (
    !favoriteGenres ?
    <Typography>Go find some new favorites!</Typography>

    : favoriteGenres.map((genre: any, key: number) => (
      <Card key={key} style={{ width: 300, margin: '0.5rem', boxShadow: '-1px 1px 6px rgba(125, 125, 125, 0.5)' }}>
        <ClearIcon onClick={() => removeFavorite(genre.id)} />
        <CardContent>
          <Typography>
            {genre}
          </Typography>
        </CardContent>
      </Card>
    ))
  )
};

export default GenreCards;
