import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';

const DirectorCards = ({ userId }: { userId: number }) => {
  const [favoriteDirectors, setFavoriteDirectors] = useState<any>();

  const getFavoriteDirectors = () => {
    axios.get(`/api/users/directors/${userId}`)
      .then(({ data }) => {
        setFavoriteDirectors(data.directors);
      })
  };

  const removeFavorite = (directorId: number) => {
    axios.delete('/api/users/movies/destroy', {
      data: {
        directorId,
        userId
      }
    });
    getFavoriteDirectors();
  }

  useEffect(() => {
    getFavoriteDirectors();
  }, [])

  return (
    !favoriteDirectors ?
      <Typography>
        It appears you do not have any favorites yet!
      </Typography>

      : favoriteDirectors.map((director: any, key: number) => (
        <Card key={key} style={{ width: 300, margin: '0.5rem', boxShadow: '-1px 1px 6px rgba(125, 125, 125, 0.5)' }}>
          <ClearIcon onClick={() => removeFavorite(director.id)} />
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={director.thumbnailUrl}
              alt="director image" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {director.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )
      ));
};

export default DirectorCards;