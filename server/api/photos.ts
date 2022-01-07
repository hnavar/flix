import {Router} from 'express';
import type {Request, Response} from 'express';
import { detectText } from '../helpers/googleCloudVision';
import { uploadPhoto } from '../helpers/cloudinary';

const PhotosRouter = Router();

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

PhotosRouter.post('/imgUpload', (req: Request, res: Response) => {
  console.log('req.files', req.files);
  uploadPhoto(req.files)
    .then((data: any) => {
      console.log('Image uploaded successfully', data.url)
      res.status(201).send(data.url);
    })
    .catch((err: any) => {
      console.error('Unable to upload photo', err);
      res.sendStatus(500);
    })
})

export default PhotosRouter;
