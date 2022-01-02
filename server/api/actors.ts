import {Router} from 'express';
import type {Request, Response} from 'express';
import {getFavoriteActors, addActor, getAllActors} from '../database/index';
const ActorsRouter = Router();


ActorsRouter.get('/', (req: Request, res: Response) => {
  getAllActors()
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

ActorsRouter.post('/', (req: Request, res: Response) => {
  addActor(req.body.actor)
    .then(() => res.sendStatus(201))
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default ActorsRouter;
