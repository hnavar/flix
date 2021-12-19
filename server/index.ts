import path from 'path';
import express from 'express';
import cors from 'cors';
import MoviesRouter from './api/movies';
import ActorsRouter from './api/actors';
import DirectorsRouter from './api/directors';
import GenresRouter from './api/genres';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import formData from 'express-form-data';
// const dotenv = require('dotenv');
const app = express();
import { Response, Request } from 'express';

const port = process.env.PORT || 3000;
const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dist))
app.use(express.json());

app.use('/api/movies', MoviesRouter);
app.use('/api/actors', ActorsRouter);
app.use('/api/directors', DirectorsRouter);
app.use('/api/genres', GenresRouter);

//passport
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());
// app.use(formData.parse());

// app.use(session({
//   secret: process.env.google_clientSecret,
//   saveUninitialized: false,
//   resave: true,
// }));

// passport.serializeUser((user: any, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user: any, done) => {
//   done(null, user);
// });

// //Google login route
// app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login']}));

// //Redirect on google login
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req: Request, res: Response) {
//     res.cookie('Flix', req.user.displayName);
//     res.redirect('/');
// });

// app.get('/isloggedin', (req: Request, res: Response) => {
//   if (req.cookies) {
//     res.json(true);
//   } else {
//     res.json(false);
//   }
// });

// //Delete cookie on logout
// app.delete('/logout', (req: Request, res: Response) => {
//   res.json(false);
// })




app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});

export default app
