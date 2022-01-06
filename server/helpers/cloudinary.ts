import {v2} from 'cloudinary';

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
  // secure: true
});

export const uploadPhoto = (file: any) => {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(file.image.tempFilePath, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
