import formidable, { Files, Fields } from "formidable";
import path from "path";
import { IncomingMessage } from "http";

export const config = {
  api: { bodyParser: false },
};

type CorsResponseData = Record<string, unknown>;

async function corsResponse(data: CorsResponseData, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, 
  });

  try {
    const parsePromise = (): Promise<{ fields: Fields; files: Files }> =>
      new Promise((resolve, reject) => {
        form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

    const { files } = await parsePromise();

    const file = files.file?.[0];
    if (!file) {
      return corsResponse({ success: false, message: "No file uploaded" }, 400);
    }

    const fileUrl = `/uploads/${path.basename(file.newFilename)}`;
    return corsResponse({ success: true, url: fileUrl }, 200);
  } catch (error) {
    console.error("File upload error:", error);
    return corsResponse({ success: false, message: "File upload failed" }, 500);
  }
}

export async function OPTIONS() {
  return corsResponse({}, 200);
}
