import {Router} from 'express';
import type {Request, Response} from 'express';
import { detectText } from '../helpers/googleCloudVision';
import { uploadPhoto } from '../helpers/cloudinary';
import multer from 'multer';

const PhotosRouter = Router();
// const upload = multer({});

PhotosRouter.post('/detectText', (req: Request, res: Response) => {
  uploadPhoto(req.files)
    .then((data: any) => {
      detectText(data.url)
        .then((data: any) => {
          res.status(201).send(data);
        })
        .catch((err: any) => {
          console.error('error detecting text', err);
          res.sendStatus(500);
        });
    })
    .catch((err: any) => {
      console.error('error uploading to cloudinary', err);
      res.sendStatus(500);
    });
});

export default PhotosRouter;
