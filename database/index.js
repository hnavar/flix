const Sequelize = require('sequelize');
require('dotenv').config();

const {
    DATABASE,
    USER_NAME,
    USER_PASSWORD,
    HOST,
    PORT,
} = process.env;

const db = new Sequelize({
    database: DATABASE,
    username: USER_NAME,
    password: USER_PASSWORD,
    host: HOST,
    port: PORT,
    dialect: 'postgres',
    logging: false,
  })

db.authenticate().then(() => {
console.log('connected to database');
}).catch((err) => console.log(err, 'error hitting'));


const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: Sequelize.STRING,
    email_Oauth: Sequelize.STRING,
    twitter_Oauth: Sequelize.STRING,
    twitter_user_name: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    profile_image_url: Sequelize.STRING,
    age: Sequelize.INTEGER
});


const Genre = db.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    genre: Sequelize.STRING,
});

const Movies = db.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    trailer_url: Sequelize.STRING,
     description: Sequelize.STRING,
    cast: Sequelize.STRING,
    release_date: Sequelize.STRING
});

const Actors = db.define('actors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    actor_name: Sequelize.STRING
});

const Directors = db.define('directors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    director_name: Sequelize.STRING
});

// join tables
const Users_Genre = db.define('users_genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

const Users_Movies = db.define('users_movies', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

const Movie_Genre = db.define('movie_genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

const Movie_Actors = db.define('movie_actors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

const Movie_Directors = db.define('movie_directors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

// creates userId & genreId collumns in users_genre table
User.belongsToMany(Genre, { through: 'users_genre' });
Genre.belongsToMany(User, { through: 'users_genre' });

// creates userId & movieId collumns in users_movies table
User.belongsToMany(Movies, { through: 'users_movies' });
Movies.belongsToMany(User, { through: 'users_movies' });

// creates movieId & genreId collumns in movie_genre table
Movies.belongsToMany(Genre, { through: 'movie_genre' });
Genre.belongsToMany(Movies, { through: 'movie_genre' });
// small bug creates table as movie_genres

// creates movieId & actorsId collumns in movie_actors table
Movies.belongsToMany(Actors, { through: 'movie_actors' });
Actors.belongsToMany(Movies, { through: 'movie_actors' });

// creates movieId & directorsID collumns in movie_actors table
Movies.belongsToMany(Directors, { through: 'movie_directors' });
Directors.belongsToMany(Movies, { through: 'movie_directors' });

User.sync();
Genre.sync();
Movies.sync();
Actors.sync();
Directors.sync();
Users_Genre.sync(); 
Users_Movies.sync();
Movie_Genre.sync();
Movie_Actors.sync();
Movie_Directors.sync();