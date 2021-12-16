const {Router} = require('express');
import type {Request, Response} from 'express';
const GenresRouter = Router();
const {getFavoriteGenres} = require('../database/index');

GenresRouter.get('/:id', (req: Request, res: Response) => {
  getFavoriteGenres(req.params.id)
    .then((data: object[]) => res.status(200).send(data))
    .catch((err: object) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = {GenresRouter};