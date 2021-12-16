import React, {FC, useState, useEffect, Props} from "react";
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Typography} from '@mui/material'

interface MovieObj {
  [key: string]: string;
}

type CarouselItemProps = {item: MovieObj}

const CarouselItem:FC<CarouselItemProps> = ({item}: {item: MovieObj}) => {
  const {title, trailer_url, description, release_date} = item;
  return (
    <>
      <Card
        variant='outlined'
        sx={{ maxWidth: 345 }}
      >
        <CardMedia
          component="iframe"
          height="194"
          image={trailer_url}
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
