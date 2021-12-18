import {Router} from 'express';
import type {Request, Response} from 'express';
const {getAllMovies, getAllMoviesByDirector, getAllMoviesByGenre, getAllMoviesWithActor, addMovie} = require('../database/index')

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
  getAllMoviesByGenre(req.params.id)
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/actors/:id', (req: Request, res: Response) => {
  getAllMoviesWithActor(req.params.id)
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.get('/directors/:id', (req: Request, res: Response) => {
  getAllMoviesByDirector(req.params.id)
    .then((data: MovieObj[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

MoviesRouter.post('/insertMovie', (req: Request, res: Response) => {
  type movieData = {imDbID: string; title: string; releaseDate: string; videoDescription: string; linkEmbed: string; genres: string;
    actors: string; directors: string; thumbnailUrl: string};
  const {imDbID, title, releaseDate, videoDescription, linkEmbed, genres, actors, directors, thumbnailUrl}: movieData = req.body;
  const movie = {
    imdDbID: imDbID,
    title: title,
    releaseDate: releaseDate,
    videoDescription : videoDescription,
    linkEmbed: linkEmbed,
    genres: genres,
    actors: actors,
    directors: directors,
    thumbnailUrl: thumbnailUrl
  };
  return addMovie(movie);
});

export default MoviesRouter;
