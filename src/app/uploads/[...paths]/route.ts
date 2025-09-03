import fs from "fs";
import path from "path";
import mime from "mime-types";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { paths: string[] } }
) {
  try {
    const rootDir = path.resolve(process.cwd(), "public/uploads");
    const filePath = path.join(rootDir, ...params.paths);

    if (!fs.existsSync(filePath)) throw new Error("File not found");

    const bytes = await readFile(filePath);
    const mimeType = mime.lookup(filePath) || "application/octet-stream";

    return new Response(bytes, {
      headers: {
        "Content-Type": mimeType,
      },
      status: 200,
    });
  } catch (error: unknown) {
    return new Response(
      error instanceof Error ? error?.message : "Error retrieving the file",
      {
        status: 500,
      }
    );
  }
}
