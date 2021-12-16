const path = require ('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
// import type {Request, Response} from 'express';

const port = process.env.PORT || 3000;
const app = express();

const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.static(dist));
app.use(bodyParser.json());
app.use(express.static(dist))

//ben's movie router
// const {MoviesRouter} = require('./api/movies');
// app.use('/api/movies', MoviesRouter);

app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});




// //Api function
// const grabMovieID = (movieName: string) : any => {
//   return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_4pd82hff/${movieName}`)
//    .then((data: any) => {
//      return {data};
//    }).catch((error: any) => {
//      console.log(error);
//    });
// }


// //Get Movie Important Info 
// app.get('/movieObj', (req: any, res: any) => {
// grabMovieID('inception')
// .then((data: any) => {
//   const {id} = data.data.data.results[0];
//   return id;
// }).then((data: any) => {
//   return axios.get(`https://imdb-api.com/en/API/Trailer/k_4pd82hff/${data}`)
// }).then((data: any) => {
// console.log(data.data);
// res.send(data.data);
// }).catch((error: any) => {
//   console.log(error);
//   res.status(500).send(error);
//   })
// });