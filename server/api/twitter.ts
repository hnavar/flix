import {Router} from 'express';
import axios from 'axios';
const TwitterRouter = Router();

const {
  BEARER_TOKEN
} = process.env;

TwitterRouter.get('/tweets', (req: any, res: any) => {

    const title = req.query.title;

    const options: any = {
    url: 'https://api.twitter.com/2/tweets/search/recent',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`
      },
    params: {
      query: title + ' Movie'
    }
  };
  
  //console.log(req.query)
  axios(options)
    .then(response => {
      // console.log(response);
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    })

});



// TwitterRouter.post('/tweets', (req: any, res: any) => {
//   console.log(req)
//   const title = req.query.title;
//   const user = req.query.user;

//   const options: any = {
//   url: 'https://api.twitter.com/2/tweets/search/recent',
//   method: 'GET',
//   headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${BEARER_TOKEN}`
//     },
//   params: {
//     query: title + ' Movie'
//   }
// };


// axios(options)
//   .then(response => {
//     // console.log(response);
//     res.status(200).json(response.data)
//   })
//   .catch(err => {
//     console.error(err);
//     res.status(400).json(err);
//   })

// // res.sendStatus(200)
// });





export default TwitterRouter;