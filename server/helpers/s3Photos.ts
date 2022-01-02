import axios from 'axios';
const Buffer = require('buffer');

import S3 from 'aws-sdk/clients/s3';

//converts base64 to image buffer
const getImgBuffer = (base64:any) => {
  const base64Str = base64.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Str, 'base64');
};

const imageUpload = (path: any, buffer: any) => {
  const data = {
    Key: path,
    Body: buffer,
    // ContentEncoding: contentEncoding
  }
};

export default getImgBuffer;