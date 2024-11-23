import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Middleware to handle FormData
export const POST = async (req) => {
  try {
    const formData = await req.formData();

    // Get form fields from formData
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const location = formData.get("location");
    const category = formData.get("category");
    const jobPreference = formData.get("jobPreference");
    const resumeFile = formData.get("resumeUrl"); // Get the uploaded resume file

    // Check if required fields are present
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check for existing jobseeker by email
    const existingUser = await db.jobseeker.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new jobseeker entry without resume initially
    const user = await db.jobseeker.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phone,
        jobPreference,
        category,
        location,
      },
    });

    // Handle resume file upload and store in the Resume model
    if (resumeFile) {

      await db.resume.create({
        data: {
          url: resumeFile,
          title: `${fullName}'s Resume`, // Optional title for the resume
          jobseekerId: user.id,          // Link resume to the created jobseeker
        },
      });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error creating jobseeker:", error);
    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  }
};
