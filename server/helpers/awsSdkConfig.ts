import AWS from 'aws-sdk';
import getImgBuffer from './s3Photos';
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, s3BucketName } = process.env;


AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3bucket = new AWS.S3({ params: { Bucket: s3BucketName }});