import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Middleware to handle FormData
export const POST = async (req) => {
  try {
    const formData = await req.formData();

    // Get form fields from formData
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('phone');
    const jobPreference = formData.get('jobPreference');
    const resumeFile = formData.get('resume'); // Get the uploaded file

    // Check if required fields are present
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Full name, email, and password are required" }, { status: 400 });
    }

    // Check for existing jobseeker by email
    const existingUser = await db.jobseeker.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file (resume) upload
    let resume = null;
    if (resumeFile) {
      const fileBuffer = Buffer.from(await resumeFile.arrayBuffer()); // Convert to buffer
      resume = fileBuffer.toString("base64"); // Convert file to base64
    }

    // Create a new jobseeker entry
    const user = await db.jobseeker.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phone,
        jobPreference,
        resume, // Store resume in base64 format
      },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error creating jobseeker:", error);
    return NextResponse.json({ error: "Something went wrong during registration" }, { status: 500 });
  }
};
