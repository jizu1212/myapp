import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fsPromises } from "fs";
import pLimit from "p-limit";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files = data.getAll("files");
    const basePath = process.cwd();
    const uploadPromises = [];
    const concurrencyLimit = parseInt(
      process.env.FILE_CONCURRENCY_LIMIT || "5",
      10
    );
    const limit = pLimit(concurrencyLimit);

    for (const file of files) {
      if (file instanceof File) {
        // Additional validation (e.g., file type, size) goes here

        const sanitizedFileName = path.basename(file.name); // Consider more robust sanitization
        const uploadPath = path.join(
          basePath,
          "public/uploads",
          sanitizedFileName
        );

        // Check if file exists to avoid unintentional overwrites
        // This is a simplistic approach; consider more nuanced handling
        if (
          await fsPromises
            .access(uploadPath)
            .then(() => true)
            .catch(() => false)
        ) {
          continue; // Skip existing files or handle as needed
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const writePromise = limit(() =>
          fsPromises.writeFile(uploadPath, buffer)
        );
        uploadPromises.push(writePromise);
      }
    }

    await Promise.all(uploadPromises);
    return NextResponse.json(
      { message: "Files uploaded successfully", count: uploadPromises.length },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: "File upload failed", error: errorMessage },
      { status: 500 }
    );
  }
}
