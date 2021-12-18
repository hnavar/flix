import {Router} from 'express';
import type {Request, Response} from 'express';
import { getFavoriteGenres, addGenre, getAllGenres } from '../database/index';
const GenresRouter = Router();

GenresRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteGenres(Number(req.params.id))
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

GenresRouter.get('/', (req: Request, res: Response) => {
  getAllGenres()
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

GenresRouter.post('/', (req: Request, res: Response) => {
  addGenre(req.body.genre)
    .then(() => res.sendStatus(201))
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default GenresRouter;
