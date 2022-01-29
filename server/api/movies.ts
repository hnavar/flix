import {Router} from 'express';
import type {Request, Response} from 'express';
import { getAllMovies, getAllMoviesByDirector, getAllMoviesByGenre, getAllMoviesWithActor, addMovie, grabMovieIdWithRating, grabMoviesByActorsOrDirectors, grabActorOrDirectorID, getMovieById, getFavoriteMovies,  } from '../database/index';
import { REAL } from 'sequelize';
import { grabMovieInfo, addMovieInfo } from '../helpers/imdb';


const MoviesRouter = Router();
interface MovieObj {
  [key: string]: string | number;
}

MoviesRouter.get('/', (req: Request, res: Response) => {
  getAllMovies()
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/genres/:id', (req: Request, res: Response) => {
  const genreId = Number(req.params.id);
  getAllMoviesByGenre(genreId)
  .then((data: any) => {
    const movies = data.dataValues.movies.map((elem: any) => elem.dataValues);
      res.status(200).send(movies);
    })
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/actors/:id', (req: Request, res: Response) => {
  getAllMoviesWithActor(Number(req.params.id))
    .then((data: any) => {
      const movies = data.dataValues.movies.map((elem: any) => elem.dataValues);
      res.status(200).send(movies);
    })
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/directors/:id', (req: Request, res: Response) => {
  getAllMoviesByDirector(Number(req.params.id))
    .then((data: any) => {
      const movies = data.dataValues.movies.map((elem: any) => elem.dataValues);
      res.status(200).send(movies);
    })
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});



//gonna use one of these
MoviesRouter.post('/saveMovie', (req: Request, res: Response) => {
  type movieData = {imDbId: string; title: string; year: string; videoDescription: string; linkEmbed: string; genres: string;
  actors: string; directors: string; thumbnailUrl: string};
  const userId = Number(req.body.userId);
  console.log(userId);
  addMovieInfo(req.body)
    .then((data: any) => {
      console.log(data);
      const {imDbId, title, year, videoDescription, linkEmbed, genres, actors, directors, thumbnailUrl}: movieData = data.searchResults;
      const movie = {
        movie_id: imDbId,
        title: title,
        release_date: year,
        description : videoDescription,
        trailer_url: linkEmbed,
        genres: genres,
        actors: actors,
        directors: directors,
        thumbnailUrl: thumbnailUrl
      };
      console.log("movie", movie);
      addMovie(movie).then((data: any) => {
        res.sendStatus(201);
      }).catch((err: any) => {
        console.error("Couldn't save to database", err);
        res.sendStatus(500);
      })
    }).catch((err: any) => {
      console.log("Error getting movie info", err);
      res.sendStatus(500);
    });
});

//one of these for my save movies
MoviesRouter.post('/', (req: Request, res: Response) => {
  addMovie(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/moviesByRatingPG', (req: Request, res: Response) => {
  grabMovieIdWithRating("PG")
     .then((data: any) => {
       res.send(data);
     }).catch((error: string) => {
       console.error(error);
       res.sendStatus(500);
     });
   });

   MoviesRouter.get('/moviesByRatingPG-13', (req: Request, res: Response) => {
  grabMovieIdWithRating("PG-13")
     .then((data: any) => {
       res.send(data);
     }).catch((error: any) => {
       console.error(error);
       res.sendStatus(500);
     });
   });

   MoviesRouter.get('/moviesByRatingR', (req: Request, res: Response) => {
  grabMovieIdWithRating("R")
     .then((data: any) => {
      res.status(200).send(data);
     }).catch((error: any) => {
       console.error(error);
       res.sendStatus(500);
     });
   });

   MoviesRouter.get('/moviesByRatingNC-17', (req: Request, res: Response) => {
  grabMovieIdWithRating("NC-17")
     .then((data: any) => {
      res.status(200).send(data);
     }).catch((error: any) => {
       console.error(error);
       res.sendStatus(500);
     });
   });

  MoviesRouter.post('/moviesByActorOrDirectors', (req: Request, res: Response) => {
    return grabActorOrDirectorID(req.body.name)
        .then((data: any) => {
          return data;
        })
        .then((data: any) => {
       return grabMoviesByActorsOrDirectors(data);
     }).then((data: any) => {
       res.send(data);
     })
     .catch((error: any) => {
       console.error(error);
       res.sendStatus(500);
     });
   });





MoviesRouter.get('/:id', (req: Request, res: Response) => {
  getMovieById(parseInt(req.params.id))
    .then((data: MovieObj) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/moviesByRatingPG', (req: Request, res: Response) => {
  grabMovieIdWithRating("PG")
     .then((data: any) => {
       res.status(200).send(data);
     }).catch((error: string) => {
       console.error(error);
       res.sendStatus(500);
     });
   });

MoviesRouter.get('/moviesByRatingG', (req: Request, res: Response) => {
    grabMovieIdWithRating("G")
       .then((data: any) => {
        res.status(200).send(data);
       }).catch((error: string) => {
         console.error(error);
         res.sendStatus(500);
       });
     });

MoviesRouter.post('/search', (req: Request, res: Response) => {
  grabMovieInfo(req.body.movieName)
    .then((data: any) => {
      res.status(201).send(data);
    }).catch((error: any) => {
      console.error(error);
      res.sendStatus(500);
    })
})

export default MoviesRouter;
