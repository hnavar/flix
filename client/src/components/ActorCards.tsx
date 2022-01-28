import { Card, CardContent, Typography } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActorCards = ({ userId }: { userId: number }) => {
  const [favoriteActors, setFavoriteActors] = useState<any>();

  const getFavoriteActors = () => {
    axios.get(`/api/users/actors/${userId}`)
      .then(({ data }) => {
        setFavoriteActors(data.actors);
      })
  };

  const removeFavorite = (actorId: number) => {
    console.log('currentUser', userId)
    console.log('remove favorite actors hit', actorId)
    axios.delete('/api/users/actors/destroy', {
      data: {
        userId,
        actorId
      }
    });
    getFavoriteActors();
  }

  useEffect(() => {
    getFavoriteActors();
  }, [])

  return (
    !favoriteActors ? null : favoriteActors.map((actor: any, key: number) => (
      <Card key={key} style={{ width: 300, margin: '0.5rem', boxShadow: '-1px 1px 6px rgba(125, 125, 125, 0.5)' }}>
        <ClearIcon onClick={() => removeFavorite(actor.id)} />
        <CardContent>
          <Typography>
            {actor.actor_name}
          </Typography>
        </CardContent>
      </Card>
    ))
  )
};


export default ActorCards;