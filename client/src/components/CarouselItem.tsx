import React, { FC, useState, useEffect, SyntheticEvent } from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

interface MovieObj {
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
type CarouselItemProps = { item: MovieObj };

const CarouselItem: FC<CarouselItemProps> = ({ item }: { item: MovieObj }) => {
  const { id, title, trailer_url, description, release_date, thumbnailUrl } = item;

  const navigate = useNavigate();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/movies/${id}`);
  };

  return (
    <div style={{ paddingBottom: '1rem' }}>
      <Card onClick={handleClick}
        variant='outlined'
        sx={{
          height: '300px',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          margin: '1rem',
          paddingBottom: '1rem'
        }}
      >
        <CardMedia
          style={{ display: 'flex' }}
          component="img"
          height='175px'
          width='100%'
          src={thumbnailUrl}
          title="movie trailer"
        />
        <CardHeader
          title={title}
          subheader={release_date}
        />
      </Card>
    </div>
  );

};

export default CarouselItem;
