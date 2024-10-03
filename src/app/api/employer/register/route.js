import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const website = formData.get("website");
    const phoneNumber = formData.get("phoneNumber");
    const industry = formData.get("industry");
    const companySize = parseInt(formData.get("companySize"), 10);
    const logoRaw = formData.get("logo"); // Get the logo file

    // Validate input fields
    if (!name || !email || !password || !website || !phoneNumber || !industry || !companySize) {
      return NextResponse.json(
        { error: "All fields are required except logo", success: false },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedpassword = await bcrypt.hash(password, 10);


    // Handle logo upload
  
    let logoUrl = null;
    if (logoRaw) {
      const fileBuffer = Buffer.from(await logoRaw.arrayBuffer()); // Convert to buffer
      logoUrl = fileBuffer.toString("base64"); // Convert file to base64
    }
    // Create a new employer record
    const employer = await db.Employer.create({
      data: {
        name,
        email,
        password: hashedpassword,
        companyWebsite:website,
        phoneNumber,
        industry,
        companySize,
        image: logoUrl, // Store the logo URL in the database
      },
    });

    return NextResponse.json(
      { result: "New Employer Created", success: true, employer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating employer:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the employer", success: false },
      { status: 500 }
    );
  }
}
