const path = require ('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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