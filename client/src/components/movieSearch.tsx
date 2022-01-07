import React, {useState, FC, useEffect} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";
import { useParams } from "react-router";




const SearchMovie:FC<any> = ({user}) => {
  interface Movie {imDbId: string; title: string; year: string; videoDescription: string; linkEmbed: string};
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<Movie | null>(null);
  const {query} = useParams();
  // const [searchParams, setSearchParams] = useState<null | string>(query);

  const grabMovieInfo = (movieName: string) : any => {
    axios.post('/api/movies/search', {movieName})
      .then(({data}: any) => {
        setSearchResults(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // axios.post('/api/movies/saveMovie/', fullData)
  const addMovieInfo = () => {
     axios.post(`/api/movies/saveMovie/`, searchResults)
      .then(({data}: any) => {
        console.log("Saved to database");
      }).catch((error: any) => {
        console.log("Error saving to database");
      })
    }
  

  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event :any) => {
    event.preventDefault();
    grabMovieInfo(searchVal);
    setSearchVal('');
  };

  useEffect(() => {
    if (!!query && query !== undefined) {
      grabMovieInfo(query);
    }
  }, []);


  if (!searchResults) {
  return (
    <div>
      <div>
      <br></br>
        <TextField inputProps={{ style: { fontFamily: 'Arial', color: 'blue'}}}
          style={{ flex: 1, margin: '0 20px 0 0', color: 'blue', backgroundColor: 'white'}} value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
        <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Search</Button>
      </div>
    </div>
  );
  } else {
    return (
      <div>
        <div>
        <br></br>
          <TextField inputProps={{ style: { fontFamily: 'Arial', color: 'blue'}}}
          style={{ flex: 1, margin: '0 20px 0 0', color: 'blue', backgroundColor: 'white'}} value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
          <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Search</Button>
        </div>
        <div>
          <div>
            <h1 style={{color: 'white'}}> Title: {searchResults.title}</h1>
            <iframe width="1000" height="600" src={searchResults.linkEmbed} frameBorder="0"></iframe>
            <Button type="submit" onClick={addMovieInfo} variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Add movie to favorites</Button>
            <h2 style={{color: 'white'}}>Plot: {searchResults.videoDescription}</h2>
            <h2 style={{color: 'white'}}>Release: {searchResults.year}</h2>
          </div>
        </div>
      </div>
    );
  }
};


export default SearchMovie;