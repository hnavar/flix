import {ImageAnnotatorClient} from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

export const detectText = async (imageUrl: string) => {
  const [result] = await client.textDetection(imageUrl);
  return result.textAnnotations;
};
