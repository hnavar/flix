import axios from "axios";
import React from "react";
import { useState, FC } from "react";
import { Button } from "@material-ui/core";
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@mui/material';
const MovieByRating:FC = () => {

  const [movieData, setMovieData] = useState<any>([]);
  const [count, setCounter] = useState(0);

  const getMovieData =  (rating: string) => {
    return axios.get(`api/movies/moviesByRating${rating}`)
    .then(({data}: any) => {
      let filteredArray = data.filter(function(movie: any) {
        return movie.linkEmbed !== null;
      })
      setMovieData(filteredArray);
    })
    .catch(() => console.log('failed to get movies'));
  };


  if (movieData.length === 0) {
    return (
  <div>
    {/* <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('G')}}>Find G rated movies</Button> */}
    <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('PG')}}>Find PG rated movies</Button>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('PG-13')}}>Find PG-13 rated movies</Button>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('R')}}>Find NC-17 rated movies</Button>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('NC-17')}}>Find R rated movies</Button>
  </div>
    );


  } else {
    return (
      <div>
        {/* <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('G')}}>Find G rated movies</Button> */}
        <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('PG')}}>Find PG rated movies</Button>
        <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('PG-13')}}>Find PG-13 rated movies</Button>
        <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('R')}}>Find NC-17 rated movies</Button>
        <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('NC-17')}}>Find R rated movies</Button>
        <div>
        <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {setCounter(count + 1)}}>Show Next Movie</Button>
        <Button variant="contained" id="outlined-basic" color="secondary" onClick={() => {setCounter(count - 1)}}>Show Previous Movie</Button>
        </div>
    <div>
      <Card
        variant='outlined'
        sx={{ maxWidth: 345 }}
      >
        <CardMedia
          component="img"
          height="194"
          src={count < movieData.length ? movieData[count].thumbnailUrl : setCounter(0) }
          title="movie trailer"
        />
        <CardHeader
          title={movieData[count].title}
          subheader={movieData[count].year}
        />
        <CardContent>
          <Typography>
            {movieData[count].videoDescription}
          </Typography>
        </CardContent>
      </Card>
    </div>
      </div>
    )
  }
}

export default MovieByRating;