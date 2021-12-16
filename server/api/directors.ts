const {Router} = require('express');
import type {Request, Response} from 'express';
const DirectorsRouter = Router();
const {getFavoriteDirectors} = require('../database/index')

DirectorsRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteDirectors(req.params.id)
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = {DirectorsRouter};