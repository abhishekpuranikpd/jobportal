import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedpassword = await bcrypt.hash(password, 10);

    // Create a new job seeker
    const user = await db.Employer.create({
      data: { name, email, password: hashedpassword },
    });

    return NextResponse.json(
      { result: "New User Created", success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the user", success: false },
      { status: 500 }
    );
  }
}
