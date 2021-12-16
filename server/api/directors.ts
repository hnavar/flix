import {Router} from 'express';
import type {Request, Response} from 'express';
const {getFavoriteDirectors} = require('../database/index')
const DirectorsRouter = Router();

DirectorsRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteDirectors(req.params.id)
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default DirectorsRouter;
