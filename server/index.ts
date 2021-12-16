const path = require ('path');
const express = require('express');
const app = express();
const cors = require('cors');
const {MoviesRouter} = require('./api/movies')
// const dotenv = require('dotenv');

const port = process.env.PORT || 3000;

const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.static(dist))

app.use('/api/movies', MoviesRouter);



app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});