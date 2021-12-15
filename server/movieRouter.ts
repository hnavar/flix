const router = require('express').Router();

const { grabMovieData } = require('./moviesInfo');

router.get('/title', (req: any, res: any) => {
grabMovieData("inception")
.then((data: any) => {
  console.log({data});
  res.send({data});
}).catch((error: any) => {
  console.log(error);
  res.status(500).send(error);
  })
});