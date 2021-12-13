const path = require ('path');
const express = require('express');
const app = express();
const cors = require('cors');
// const dotenv = require('dotenv');

const port = process.env.PORT || 3000;

const dist = path.resolve(__dirname, 'client', 'dist');
app.use(cors({origin: true, credentials: true}));





app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});