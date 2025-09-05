import { CONFIG } from "@/constants";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: CONFIG.S3.REGION,
  endpoint: CONFIG.S3.ENDPOINT,
  credentials: {
    accessKeyId: CONFIG.S3.ACCESS_KEY_ID,
    secretAccessKey: CONFIG.S3.SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export async function uploadToS3(file: File, folder: string) {
  const currentDate = new Date();
  const filename = file?.name?.replace(/\s+/g, "_");
  const timestamp = currentDate
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);

  const key = `${folder}/${timestamp}-${filename}`;
  const body = Buffer.from(await file?.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: CONFIG.S3.BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: file.type || "application/octet-stream",
  });

  await s3Client.send(command);
  const url = `${CONFIG.S3.ENDPOINT}/${CONFIG.S3.BUCKET_NAME}/${key}`;
  return url;
}

export default s3Client;
