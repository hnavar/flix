import {Router} from 'express';
import type {Request, Response} from 'express';
const {getFavoriteActors, addActor} = require('../database/index');
const ActorsRouter = Router();

ActorsRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteActors(req.params.id)
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

ActorsRouter.post('/', (req: Request, res: Response) => {
  addActor(req.body.actor);
});

export default ActorsRouter;
