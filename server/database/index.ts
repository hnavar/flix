const Sequelize = require('sequelize');
require('dotenv').config();

const {
  DATABASE,
  USER_NAME,
  USER_PASSWORD,
  HOST,
  DB_PORT,
} = process.env;

const db = new Sequelize({
  database: DATABASE,
  username: USER_NAME,
  password: USER_PASSWORD,
  host: HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});

db.authenticate()
  .then(() => console.log('connected to database'))
  .catch((err: object) => console.log(err, 'error hitting'));


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
  movie_id: {
    type: Sequelize.STRING,
    unique: true
  },
  title: Sequelize.STRING,
  trailer_url: Sequelize.STRING(2048),
  description: Sequelize.STRING(8192),
  release_date: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING(2048)
});

const Actors = db.define('actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  actor_name: {
    type: Sequelize.STRING,
    unique: true
  }
});

const Directors = db.define('directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  director_name: {
    type: Sequelize.STRING,
    unique: true
  }
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

const Users_Directors = db.define('users_directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

const Users_Actors = db.define('users_actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});


// creates userId & genreId columns in users_genre table
User.belongsToMany(Genre, { through: 'users_genre' });
Genre.belongsToMany(User, { through: 'users_genre' });

// creates userId & movieId columns in users_movies table
User.belongsToMany(Movies, { through: 'users_movies' });
Movies.belongsToMany(User, { through: 'users_movies' });

// creates movieId & genreId columns in movie_genre table
Movies.belongsToMany(Genre, { through: 'movie_genre' });
Genre.belongsToMany(Movies, { through: 'movie_genre' });
// small bug creates table as movie_genres

// creates movieId & actorsId columns in movie_actors table
Movies.belongsToMany(Actors, { through: 'movie_actors' });
Actors.belongsToMany(Movies, { through: 'movie_actors' });

// creates movieId & directorsID columns in movie_actors table
Movies.belongsToMany(Directors, { through: 'movie_directors' });
Directors.belongsToMany(Movies, { through: 'movie_directors' });

// creates userId & directorsID columns in movie_actors table
User.belongsToMany(Directors, { through: 'users_directors' });
Directors.belongsToMany(User, { through: 'users_directors' });

// creates userId & directorsID columns in movie_actors table
User.belongsToMany(Directors, { through: 'users_actors' });
Actors.belongsToMany(User, { through: 'users_actors' });

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
Users_Actors.sync();
Users_Directors.sync();

export const getAllMovies = () => {
  return Movies.findAll();
};

export const getAllGenres = () => {
  return Genre.findAll();
};

export const getAllActors = () => {
  return Actors.findAll();
};

export const getAllDirectors = () => {
  return Directors.findAll();
};

export const getAllMoviesByGenre = (genre: number) => {
  return Genre.findAll({
    include: [
      {
        model: Movies,
        through: {where: {genreId: genre}}
      }
    ]
  });
};

export const getAllMoviesByDirector = (director: number) => {
  return Directors.findAll({
    include: [
      {
        model: Movies,
        through: {where: {directorId: director}}
      }
    ]
  });
};

export const getAllMoviesWithActor = (actor: number) => {
  return Actors.findAll({
    include: [
      {
        model: Movies,
        through: {where: {actorId: actor}}
      }
    ]
  });
};

export const getFavoriteActors = (userId: number) => {
  return User.findAll({
    include: [
      {
        model: Actors,
        through: {where: {userId: userId}}
      }
    ]
  });
};

export const getFavoriteDirectors = (userId: number) => {
  return User.findAll({
    include: [
      {
        model: Directors,
        through: {where: {userId: userId}}
      }
    ]
  });
};

export const getFavoriteGenres = (userId: number) => {
  return User.findAll({
    include: [
      {
        model: Genre,
        through: {where: {userId: userId}}
      }
    ]
  });
};
interface movieObj {
  [key:string]: string;
}

export const addMovie = async (movie: movieObj, userId?: number) => {
  try {
    const {movie_id, title, description, release_date, trailer_url, thumbnailUrl} = movie;
    const actors = movie.actors.split(', ');
    const directors = movie.directors.split(', ');
    const genres = movie.genres.split(', ');

    const currentMovie = await Movies.create({
      movie_id: movie_id,
      title: title,
      description: description,
      release_date: release_date,
      trailer_url: trailer_url,
      thumbnailUrl: thumbnailUrl
    });

    !!userId && Users_Movies.create({
      userId: userId,
      movieId: currentMovie.id
    });

    actors.forEach(actor => {
      addActor(actor, currentMovie.id);
    });

    directors.forEach(director => {
      addDirector(director, currentMovie.id);
    });

    genres.forEach(genre => {
      addGenre(genre, currentMovie.id);
    });
  }
  catch (err) {
    console.error('already added');
  }
};

export const addActor = async (actor: string, movieId?: number) => {
  try {
    const currentActor = await Actors.create(
      {actor_name: actor}
    );

    !!movieId && Movie_Actors.create({
      actorId: currentActor.id,
      movieId: movieId
    });
  }
  catch (err) {
    console.error(err);
  }
};

export const addDirector = async (director: string, movieId?: number) => {
  try {
    const currentDirector = await Directors.create(
      {director_name: director}
    );

    !!movieId && Movie_Directors.create({
      actorId: currentDirector.id,
      movieId: movieId
    });
  }
  catch (err) {
    console.error(err);
  }
};

export const addGenre = async (genre: string, movieId?: number) => {
  try {
  const currentGenre = await Genre.create(
      {genre: genre}
    );

    !!movieId && Movie_Genre.create({
      genreId: currentGenre.id,
      movieId: movieId
    });
  }
  catch (err) {
    console.error(err);
  }
};



// module.exports = {
//   getAllMovies,
//   getAllMoviesByDirector,
//   getAllMoviesByGenre,
//   getAllMoviesWithActor,
//   getFavoriteActors,
//   getFavoriteDirectors,
//   getFavoriteGenres,
//   addMovie,
//   addActor,
//   addDirector,
//   addGenre
// };
