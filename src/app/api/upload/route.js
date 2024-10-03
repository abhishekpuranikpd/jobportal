import multer from "multer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Your Prisma client

// Setup multer for handling file uploads (in-memory storage)
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as a Buffer
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// Middleware wrapper for multer
const runMiddleware = (req) => {
  return new Promise((resolve, reject) => {
    upload.single("resume")(req, {}, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(req.file);
    });
  });
};

export async function POST(req) {
  try {
    const file = await runMiddleware(req); // Handle file upload

    if (!file) {
      throw new Error("No file uploaded.");
    }

    // Save the resume to the filesystem
    const fs = require('fs');
    const filePath = `./uploads/${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer); // Save the file buffer to the file system

    // Use Prisma to store metadata in your database
    const savedResume = await db.resume.create({
      data: {
        fileName: file.originalname,
        filePath, // Save the path to the file
        mimeType: file.mimetype,
      },
    });

    return NextResponse.json(
      { success: true, resumeId: savedResume.id, message: "Resume uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload resume" },
      { status: 500 }
    );
  }
}
