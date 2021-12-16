import React, {useState} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";

const SearchMovie = (props :any) => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState({});


  const grabMovieInfo = (movieName: string) : any => {
    return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_4pd82hff/${movieName}`)
     .then((data: any) => {
       return {data}
     }).then((data: any) => {
      const {id} = data.data.data.results[0];
      return id;
    }).then((data: any) => {
      return axios.get(`https://imdb-api.com/en/API/Trailer/k_4pd82hff/${data}`)
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
    // const { handleSearch } = props;
    // handleSearch(searchVal);
    let data = grabMovieInfo(searchVal)
    console.log(data);
    console.log(grabMovieInfo(searchVal));
    setSearchVal('');
  };


  if (!searchResults.title) {
  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
        <Button onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
        {/* {searchResults === {} ? null : <div>{searchResults}</div>} */}
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
            {/* <h1>{searchResults.imDbId}</h1> */}
            <h1>Title: {searchResults.title}</h1>
            <h2>Plot: {searchResults.videoDescription}</h2>
            <h3>Release: {searchResults.year}</h3>
            <div> Trailer: </div>
            <video controls>
             <source src={searchResults.link}/>
            </video>
          </div>
        </div>
      </div>
    );
  }
};


export default SearchMovie;