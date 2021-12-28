import React, {useState, FC} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";





const MoviesByPerson = () => {
  interface Person {name: string};
  const [searchVal, setSearchVal] = useState('');
  const [searchValObject, setSearchValObject] = useState({name: ''});
  const [searchResults, setSearchResults] = useState<Person | null>(null);



const grabMovies = (actorOrDirector: {name: string}) => {
    return axios.post('/api/movies/getMoviesByPerson/', actorOrDirector)
    .then((data: any) => {
      console.log(data);
      setSearchResults(data);
    }).catch((error: any) => {
      console.log(error);
  });
};




  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
    setSearchValObject({name: searchVal});
  };

  const handleClick = (event :any) => {
    event.preventDefault();
    grabMovies(searchValObject);
    setSearchVal('');
  };

if (!searchResults) {
  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Actor or Director" variant="outlined" size="small" />
        <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
      </div>
    </div>
    );
  }
};

export default MoviesByPerson;