const fs = require('fs');
const axios = require('axios');
import path from 'path';
import {addMovie} from './index'
interface movieObj {
  [key:string]: string;
}
import movieJson from './sampleData.json'

const movies: movieObj[] = movieJson;


Promise.all(movies.map((elem: movieObj, idx: number) => {
  return addMovie(elem, 1);
}))
  .then(() => console.log('all should be saved?'));

// console.log(movies);

