import React, {useState} from "react";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';

const SearchMovie = (props :any) => {
  const [searchVal, setSearchVal] = useState('');

  const handleChange = (event :any) => {
    const searchVal = event.target.value;
    setSearchVal(searchVal);
  };

  const handleClick = (event :any) => {
    // console.log('click');
    event.preventDefault();
    // const { handleSearch } = props;
    // handleSearch(searchVal);
    setSearchVal('');
  };

  return (
    <div>
      <div>
        <TextField value={searchVal} onChange={handleChange} id="outlined-basic" label="Search Movie" variant="outlined" size="small" />
        <Button onClick={handleClick} variant="contained" id="outlined-basic" color="primary">Search</Button>
      </div>
    </div>
  );
};

export default SearchMovie;