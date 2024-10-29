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
    const resumeUrl = formData.get("resumeUrl"); // Get the uploaded file

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

    // Handle file (resume) upload

    // Create a new jobseeker entry
    const user = await db.jobseeker.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phone,
        jobPreference,
        category,
        location,
        resume: resumeUrl,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error creating jobseeker:", error);
    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  }
};
