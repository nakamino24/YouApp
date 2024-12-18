import { NextResponse } from "next/server";
import formidable, { Files } from "formidable";
import path from "path";
import { IncomingMessage } from "http";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: IncomingMessage) {
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const form = formidable({ uploadDir, keepExtensions: true, maxFileSize: 5 * 1024 * 1024 });

  try {
    const { files } = await new Promise<{ files: Files }>((resolve, reject) =>
      form.parse(req, (err, _, files) => (err ? reject(err) : resolve({ files })))
    );

    const file = files.file?.[0];
    if (!file) return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });

    const fileUrl = `/uploads/${path.basename(file.newFilename)}`;
    return NextResponse.json({ success: true, url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ success: false, message: "File upload failed" }, { status: 500 });
  }
}
