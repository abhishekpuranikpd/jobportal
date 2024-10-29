import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
  const userid = params.employerid;

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");

    const website = formData.get("website");
    const phoneNumber = formData.get("phoneNumber");
    const industry = formData.get("industry");
    const companySize = parseInt(formData.get("companySize"), 10);
    const logo = formData.get("logo"); // Get the logo file
    const aboutcompany = formData.get("aboutcompany");

    // Create a new employer record
    const employer = await db.Employer.update({
      where: { id:userid },
      data: {
        name,
        email,

        companyWebsite: website,
        phoneNumber,
        industry,
        companySize,
        image: logo, // Store the logo URL in the database
        aboutcompany,
      },
    });

    return NextResponse.json(
      { result: " Profile Edited Successfully", success: true, employer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating employer:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while updating the employer",
        success: false,
      },
      { status: 500 }
    );
  }
}
