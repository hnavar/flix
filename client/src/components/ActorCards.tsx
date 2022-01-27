import { Card, CardContent, Typography } from '@material-ui/core';
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
    axios.delete('/api/users/actors/destroy', {
      data: {
        actorId,
        userId
      }
    });
    getFavoriteActors();
  }

  useEffect(() => {
    getFavoriteActors();
  }, [])

  return (
    !favoriteActors ? null : favoriteActors.map((actor: any, key: number) => (
      <Card key={key}>
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