import React, {useState, FC} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import axios from "axios";
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@mui/material';





const MoviesByPerson:FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchValObject, setSearchValObject] = useState({name: ''});
  const [searchResults, setSearchResults] = useState<any>([]);
  const [count, setCounter] = useState(0);



  const grabMovies = (actorOrDirector: {name: string}) => {
    return axios.post('/api/movies/moviesByActorOrDirectors/', actorOrDirector)
    .then(({data}: any) => {
     setSearchResults(data);
    }).catch((error: any) => {
      console.log(error);
    });
  };

  // const saveMovie = () => {
  //   if(user) {
  //     axios({
  //       method: 'post',
  //       url: '/api/users/user-movies',
  //       data: {
  //         movieId: searchResults[count].id,
  //         userId: user.id
  //       }
  //     });
  //   }
  // }

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

if (searchResults.length === 0) {
  return (
    <div>
      <div>
        <TextField   inputProps={{ style: { fontFamily: 'Arial', color: 'blue'}}}
          style={{ flex: 1, margin: '0 20px 0 0', color: 'blue', backgroundColor: 'white'}} value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Actor or Director" variant="outlined" size="small" />
        <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Search</Button>
      </div>
    </div>
    );
  } else {
    return (
    <div>
       <TextField inputProps={{ style: { fontFamily: 'Arial', color: 'blue'}}}
          style={{ flex: 1, margin: '0 20px 0 0', color: 'blue', backgroundColor: 'white'}} value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Actor or Director" variant="outlined" size="small" />
       <Button type="submit" onClick={handleClick} variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Search</Button>
        <div>
          {/* {On click will eventually go under} */}
          <Button type="submit" variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Add movie to Favorites</Button>
          <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {setCounter(count + 1)}}>Show Next Movie</Button>
          <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {setCounter(count - 1)}}>Show Previous Movie</Button>
        </div>
    <div>
            <Card
        variant='outlined'
        sx={{ maxWidth: 400 }}
      >
        <CardMedia
          component="img"
          height="400"
          src={searchResults[count].image}
          title="movie trailer"
        />
        <CardHeader
          title={searchResults[count].title}
          subheader={searchResults[count].year}
        />
        <CardContent>
          <Typography>
            Role: {searchResults[count].role}
          </Typography>
        </CardContent>
      </Card>
      {/* <Card
        variant='outlined'
        sx={{ maxWidth: 400 }}
      >
        <CardMedia
          component="img"
          height="400"
          src={searchResults[count + 1].image}
          title="movie trailer"
        />
        <CardHeader
          title={searchResults[count + 1].title}
          subheader={searchResults[count + 1].year}
        />
        <CardContent>
          <Typography>
            Role: {searchResults[count + 1].role}
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  </div>
    );
  }
};

export default MoviesByPerson;