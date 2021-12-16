const path = require ('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();


const port = process.env.PORT || 3000;
const app = express();

const dist = path.resolve(__dirname, '..', 'client/dist');

app.use(cors({ credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false}));

app.use(express.static(dist));
app.use(bodyParser.json());



app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});

