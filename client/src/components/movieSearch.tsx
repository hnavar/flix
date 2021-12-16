import React, {useState} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";
// import {IMDB_KEY} from process.env


const SearchMovie = (props :any) => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState({});


  const grabMovieInfo = (movieName: string) : any => {
    return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_0ey76rg5/${movieName}`)
     .then((data: any) => {
       return {data}
     }).then((data: any) => {
      const {id} = data.data.data.results[0];
      return id;
    }).then((data: any) => {
      return axios.get(`https://imdb-api.com/en/API/Trailer/k_0ey76rg5/${data}`)
    }).then((data: any) => {
    console.log(data.data);
    setSearchResults(data.data);
    return data.data
    }).catch((error: any) => {
       console.log(error);
     });
  }


  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event :any) => {
    // console.log('click');
    event.preventDefault();
    grabMovieInfo(searchVal);
    setSearchVal('');
  };


  if (!searchResults.title) {
  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
        <Button onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
      </div>
    </div>
  );
  } else {
    return (
      <div>
        <div>
          <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
          <Button onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
        </div>
        <div>
          <div>
            <h1>Title: {searchResults.title}</h1>
            <iframe width="1000" height="600" src={searchResults.linkEmbed} frameBorder="0"></iframe>
            <Button variant="contained" id="outlined-basic" color="primary">Add movie</Button>
            <h2>Plot: {searchResults.videoDescription}</h2>
            <h2>Release: {searchResults.year}</h2>
          </div>
        </div>
      </div>
    );
  }
};


export default SearchMovie;