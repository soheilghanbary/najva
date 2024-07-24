import { S3 } from "aws-sdk";

export async function uploadImage(file: File) {
  const s3 = new S3({
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
    endpoint: process.env.LIARA_ENDPOINT,
  });
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: file.name,
    Body: file,
  };
  return await s3.upload(params).promise();
}
