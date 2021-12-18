import Sequelize from 'sequelize';
require('dotenv').config();
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
const dropDb = async () => {

  const {
    DATABASE,
    USER_NAME,
    USER_PASSWORD,
    HOST,
    DB_PORT,
  } = process.env;

  const db = new Sequelize({
    username: USER_NAME,
    password: USER_PASSWORD,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
  });

  db.
};
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

