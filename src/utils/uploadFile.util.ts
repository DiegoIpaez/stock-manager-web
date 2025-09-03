import fs from "fs";
import path from "path";

export async function uploadFile(file: File, DIR_NAME: string) {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);

  const filename = `${formattedDate}-${file?.name?.replace(/\s+/g, "_")}`;
  const bufferFile = Buffer.from(await file?.arrayBuffer());
  const uploadDir = path.resolve(process.cwd(), "public", 'uploads', DIR_NAME, filename);

  fs.writeFileSync(uploadDir, bufferFile);
  return `/uploads/${DIR_NAME}/${filename}`;
}
