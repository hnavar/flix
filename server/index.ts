const path = require ('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.static(dist));
app.use(bodyParser.json());
app.use(express.static(dist))

app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});


const grabMovieData = (movieName: string) : any => {
  return axios.get(`https://imdb-api.com/en/API/SearchMovie/k_4pd82hff/${movieName}`)
   .then((data: any) => {
     return {data};
   }).catch((error: any) => {
     console.log(error);
   });
}


app.get('/title', (req: any, res: any) => {
grabMovieData('inception')
.then((data: any) => {
  console.log(data.data.data);
  res.send(data.data.data);
}).catch((error: any) => {
  console.log(error);
  res.status(500).send(error);
  })
});