import React, {useState, FC} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";





const MoviesByPerson:FC = (props :any) => {
  interface Movie {imDbId: string; title: string; year: string; videoDescription: string; linkEmbed: string};
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<Movie | null>(null);



const grabMovies = (actorOrDirector: string) => {
    return axios.post('/api/movies/getMoviesByPerson/', {actorOrDirector})
};




  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  // const handleClick = (event :any) => {
  //   event.preventDefault();
  //   grabMovies(searchVal);
  //   setSearchVal('');
  // };


  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Actor or Director" variant="outlined" size="small" />
        <Button type="submit" variant="contained" id="outlined-basic" color="primary">Search</Button>
      </div>
    </div>
  );
};

export default MoviesByPerson;