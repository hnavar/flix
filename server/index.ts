const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const { google_clientID, google_clientSecret, passportCallbackURL } = process.env;
import User from './database/index';


import path from 'path';
import express, { response } from 'express';
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
const app = express();
import type { Response, Request } from 'express';
import TwitterRouter from './api/twitter';
import UsersRouter from './api/users';
import { addUser, getUserById } from './database';
import { profile } from 'console';
import { any } from 'sequelize/dist/lib/operators';
// const auth = require('./helpers/auth');
// const authroutes = require('./api/authroutes');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const port = process.env.PORT || 3000;
const dist = path.resolve(__dirname, '..', 'client/dist');
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dist))
app.use(express.json());


app.use(cors({ credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false}));

  app.use(express.static(dist));
  app.use(bodyParser.json());
  //Routers
  app.use('/api/movies', MoviesRouter);
  app.use('/api/actors', ActorsRouter);
  app.use('/api/directors', DirectorsRouter);
  app.use('/api/genres', GenresRouter);
  app.use('/api/twitter', TwitterRouter);
  app.use('/api/users', UsersRouter);


  //Start of Passport
  app.use(cookieParser());
  app.use(formData.parse());

  app.use(session({
    secret: `${process.env.google_clientID}`,
    saveUninitialized: false,
    resave: true
  }));


  app.use(passport.initialize());
  app.use(passport.session());

// this is not getting used, but may be useful later when integrating the twitter strategy

// app.use(auth.passport.initialize());
// app.use(auth.passport.session());
// app.use('/', authroutes);

passport.use(new GoogleStrategy({
  clientID: `${google_clientID}`,
  clientSecret:`${google_clientSecret}`,
  callbackURL: `${passportCallbackURL}`
},
  async function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {

  //Find or Create a user
  //returns [{}, boolean]
  // [0] = user object
  // [1] = true if created, false if found
  const newUser = await User.findOrCreate({where: {email_Oauth: profile.id},
                     defaults: {
                          username: profile.displayName,
                          email_Oauth: profile.id,
                          twitter_Oauth: profile.twitterId,
                          twitter_user_name: profile.twitterUsername,
                          first_name: profile.name.givenName,
                          last_name: profile.name.familyName,
                          profile_image_url: profile.photos[0].value,
                          sessionID: profile.number,
                          age: profile.age
                     }
                    });
                    console.log('newUser',newUser[0]);
                    return done(null, newUser[0]);

  //Keeping for reference until final cleanup, just in case.
  // new User({
  //   username: profile.displayName,
  //   email_Oauth: profile.id,
  //   twitter_Oauth: profile.twitterId,
  //   twitter_user_name: profile.twitterUsername,
  //   first_name: profile.name.givenName,
  //   last_name: profile.name.familyName,
  //   profile_image_url: profile.photos[0].value,
  //   sessionID: profile.number,
  //   age: profile.age
  // }).save().then((newUser: any) => {
  //   console.log('new user object', newUser)
  // })
  // return done(null, profile);

}))

passport.serializeUser((user: any, done: any) => {
  console.log('serialize', user)
  return done(null, user);
})

passport.deserializeUser((user: any, done: any) => {
  console.log('deserialize', user)
  return done(null, user)
})

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'profile' ] }));

//applies cookies to the user object.
//Still need to figure out the session data and how that applies.
app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/' }),
(req: Request, res: Response) => {
  res.cookie('Flix', req.user)
  res.redirect('/');
});
//End of Passport

//get currently logged in user
//NOTE: this is currently not being used, app.get('/verify') is sending user data up front
app.get('/api/users', (req: Request, res: Response) => {
  return getUserById(req.body)
    .then((data: any) => { res.json({data})})
    .catch((err: any) => { console.log('Unable to retrieve user', err) })
})

app.post('/api/users', (req: Request, res: Response) => {

//this may not be necessary anymore, as the passport function is covering this.

})

app.get('/verify', (req, res) => {
  if (req.cookies.Flix) {
    //sends up user to app.tsx, to then be passed down to the children
    res.status(200).send(req.user)
  } else {
    res.json(false);
  }
});

//reset sessionId back to null
app.get('/logout', (req: Request, res: Response) => {
    console.log('logged out hit');
    res.clearCookie('Flix');
    res.redirect('/');
});


app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});

export default app
