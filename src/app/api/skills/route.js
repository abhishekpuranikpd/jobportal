import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body to get skills data
    const { skills } = await request.json();

    if (!Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "No skills provided." },
        { status: 400 }
      );
    }

    // Create skills in the database
    const createdSkills = await Promise.all(
      skills.map((skill) =>
        db.Skill.create({
          data: {
            title: skill.title,
          },
        })
      )
    );

    // Return success response
    return NextResponse.json(
      { result: "Skills created successfully", data: createdSkills, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating skills:", error);
    return NextResponse.json(
      { error: "Failed to create skills", details: error.message },
      { status: 500 }
    );
  }
}
