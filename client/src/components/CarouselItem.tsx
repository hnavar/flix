import React, {FC, useState, useEffect, Props} from "react";
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Typography} from '@mui/material'

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
type CarouselItemProps = {item: MovieObj}

const CarouselItem:FC<CarouselItemProps> = ({item}: {item: MovieObj}) => {
  const {title, trailer_url, description, release_date, thumbnailUrl} = item;
  return (
    <>
      <Card
        variant='outlined'
        sx={{ maxWidth: 345 }}
      >
        <CardMedia
          component="img"
          height="194"
          src={thumbnailUrl}
          title="movie trailer"
        />
        <CardHeader
          title={title}
          subheader={release_date}
        />
        <CardContent>
          <Typography>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  )

};

export default CarouselItem;
