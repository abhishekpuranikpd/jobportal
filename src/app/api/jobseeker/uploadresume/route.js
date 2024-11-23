import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";

import { NextResponse } from "next/server";

// Middleware to handle FormData
export const POST = async (req) => {
    const user = await getSession();
    const userdata = await db.Jobseeker.findFirst({
      where: { email: user.email },
    });
  try {
    const formData = await req.formData();

    const resumeFile = formData.get("resumeUrl"); // Get the uploaded resume file
    const resumename = formData.get("resumename"); // Get the uploaded resume file

    // Handle resume file upload and store in the Resume model
    if (resumeFile) {
      await db.resume.create({
        data: {
          url: resumeFile,
          title: resumename, // Optional title for the resume
          jobseekerId: userdata.id, // Link resume to the created jobseeker
        },
      });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error Uploading resume:", error);
    return NextResponse.json(
      { error: "Something went wrong on uploading resume" },
      { status: 500 }
    );
  }
};
