import {Router} from 'express';
import type {Request, Response} from 'express';
import { getFavoriteDirectors, addDirector, getAllDirectors } from '../database/index';
const DirectorsRouter = Router();

DirectorsRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteDirectors(Number(req.params.id))
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

DirectorsRouter.get('/', (req: Request, res: Response) => {
  getAllDirectors()
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

DirectorsRouter.post('/', (req: Request, res: Response) => {
  addDirector(req.body.director)
    .then(() => res.sendStatus(201))
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default DirectorsRouter;
