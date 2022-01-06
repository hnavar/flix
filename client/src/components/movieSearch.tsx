import React, {useState, FC} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";





const SearchMovie:FC<any> = ({user}) => {
  interface Movie {imDbId: string; title: string; year: string; videoDescription: string; linkEmbed: string};
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<Movie | null>(null);

  const [currentUser, setCurrentUser] = useState<any>();


  const grabMovieInfo = (movieName: string) : any => {
    // return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_0ey76rg5/${movieName}`)
    return axios.get(`https://imdb-api.com/en/API/SearchMovie/${key}/${movieName}`)
     .then((data: any) => {
       return {data}
     }).then((data: any) => {
      const {id} = data.data.data.results[0];
      return id;
    }).then((data: any) => {
      // return axios.get(`https://imdb-api.com/en/API/Trailer/k_0ey76rg5/${data}`)
      return axios.get(`https://imdb-api.com/en/API/Trailer/${key}/${data}`)
    }).then((data: any) => {
    setSearchResults(data.data);
    return data.data
    }).catch((error: any) => {
       console.log(error);
     });
  }

  // movieObj: object param
  const addMovieInfo = () => {
    // return axios.get(`https://imdb-api.com/en/API/Title/k_4pd82hff/${searchResults?.imDbId}`)
    return axios.get(`https://imdb-api.com/en/API/Title/${key}/${searchResults?.imDbId}`)
    .then((data: any) => {
      const newData = {
        genres: data.data.genres,
        actors: data.data.stars,
        directors: data.data.directors,
        thumbnailUrl: data.data.thumbnailUrl,
      }

      const fullData = {...newData, ...searchResults}
      axios.post('/api/movies/saveMovie/', fullData)
    })
  }

  // const saveMovie = () => {
  //    addMovieInfo();
  //   if(user) {
  //     console.log(
  //       {movieId: searchResults?.imDbId,
  //       userId: user.id}
  //       )
  //     axios({
  //       method: 'post',
  //       url: '/api/users/user-movies',
  //       data: {
  //         userId: user.id,
  //         movieId: searchResults?.imDbId
  //       }
  //     });
  //   }
  // }

  const key = 'k_0ey76rg5';


  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event :any) => {
    event.preventDefault();
    grabMovieInfo(searchVal);
    setSearchVal('');
  };


  if (!searchResults) {
  return (
    <div>
      <div>
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