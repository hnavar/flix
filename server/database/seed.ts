const fs = require('fs');
const axios = require('axios');
import path from 'path';
// const {addMovie} = require('./server/database/index');
import {addMovie} from './index'
interface movieObj {
  [key:string]: string;
}
import movieJson from './sampleData.json'

// (async () => {

// })();
// const moviesJson = fs.readFileSync('./sampleData.json', 'utf-8');

// const movies = JSON.parse(moviesJson);
const movies: movieObj[] = movieJson;


Promise.all(movies.map((elem: movieObj, idx: number) => {
  // return axios.post('localhost:3000/api/movies', elem)
  //   .then(console.log('success!', idx))
  //   .catch(err => {
  //     console.log('fail', idx);
  //     console.error(err);
  //   });
  return addMovie(elem);
}))
  .then(() => console.log('all should be saved?'));

// console.log(movies);

