import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body to get industries data
    const { industries } = await request.json();

    if (!Array.isArray(industries) || industries.length === 0) {
      return NextResponse.json(
        { error: "No industries provided." },
        { status: 400 }
      );
    }

    // Create industries in the database
    const createdIndustries = await Promise.all(
      industries.map((industry) =>
        db.Industry.create({
          data: {
            title: industry.title,
          },
        })
      )
    );

    // Return success response
    return NextResponse.json(
      { result: "Industries created successfully", data: createdIndustries, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating industries:", error);
    return NextResponse.json(
      { error: "Failed to create industries", details: error.message },
      { status: 500 }
    );
  }
}
