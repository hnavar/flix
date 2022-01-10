#Flixar

Authors: Ben Lyon, Sam Belete, Ben Adams, Hunt Navar
***
Flixar is an exciting app that is designed to connect people of all ages with new and exciting movies. With Flixar you are can search for movies in a variety of ways and movie information in a variety of ways. If a user finds a movie they want to save for later they can add it too their favorites to display on their watch list.

There are several different ways to connect with movies you don't know.
Flixar has the ability to search for movies directly by title which will then pull up the trailer where one can decide if it's worth watching. The user can also find movies by rating if there is a specific age group watching the movie. Users can also search the actor or director and find a series of movies by that specific person.
A text by search feature is also implemented so movie text can be posted via a photo and then a movie can be found that matches it. Additionally the user can find tweets that are related to a specific movie of interest. 

Some of the technologies for this project include the utilization of React, Cloudinary, Google Cloud Vision, IMDB APIs, Postgresql, Oauth, TypeScript, nodemon, and AWS deployment.
***

#Setup

The setup for the `.env` file should look similar to this

```
DATABASE=flick_db
USER_NAME= // postgres username and passwor
USER_PASSWORD=
HOST=localhost
DB_PORT=5432 // default postgres port
google_clientID=
google_clientSecret=
PORT=3000
IMDB_KEY= // from https://imdb-api.com/
BEARER_TOKEN= // Twitter API Bearer Token
passportCallbackURL=http://localhost:3000/auth/google/callback
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
GOOGLE_APPLICATION_CREDENTIALS= // path to the JSON file of a Google Service account's keys, you might need to install google-cloud-sdk and run `gcloud init`
```

This app uses PostgreSQL

Schema
Users table with ID, username
Movies table with IMDB, Title, Description, thumbnail Cover image, trailer link, release date
Join table to populate users and movies to add favorites

In the project's directory, run `npm install`, `npm run build`, and then create the flick_db database with PostgreSQL, before running `npm start`.
To run the application use the commands npm start & npm run build or dev, depending what you are trying to accomplish.

This app utilizes a seed script to populate the database with initial movies so it isn't blank (if desired).

Simply use `npm run seed` to populate the database.
