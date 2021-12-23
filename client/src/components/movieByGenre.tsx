import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

function displayMoviesByGenre() {
  const [movieData, setMovieData] = useState([]);
  const [rating, setRating] = useState('');
  const onClickPG = () => setRating('PG');
  const onClickPG13 = () => setRating('PG-13');
  const onClickR = () => setRating('R');
  const onClickNC17 = () => setRating('NC-17');

  const getMovieData = () => {
    return axios.get(`api/movies/moviesByRating${rating}`)
    .then(({data}: any) => {
      let filteredArray = data.filter(function(movie: any) {
        return movie.linkEmbed !== null;
      })
      setMovieData(filteredArray);
    })
    .catch(() => console.log('failed to get movies'));
  };

  if (rating === '') {
    return (
  <div>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={onClickPG}>Find PG rated movies</Button>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={onClickPG13}>Find PG-13 rated movies</Button>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={onClickNC17}>Find NC-17 rated movies</Button>
    <Button variant="contained" id="outlined-basic" color="primary" onClick={onClickR}>Find R rated movies</Button>
  </div>
    );
  } else {
    // console.log(rating);
    getMovieData();
    console.log(movieData);
    return (
    <div>
      hi
    </div>
    )
  }
}

export default displayMoviesByGenre;