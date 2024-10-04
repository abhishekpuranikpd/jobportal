import { db } from "@/lib/db"; // Import database connection
import { getSession } from "@/lib/jobseekerauth"; // Import session retrieval function
import { NextResponse } from "next/server"; // Import Next.js response handler

export async function POST(request, { params }) {
  const id = params.draftjob; // Get draft job ID from params
  try {
    // Retrieve session data
    const user = await getSession();

    // Log user to debug
    const employer = await db.Employer.findFirst({
      where: { email: user.email },
    });

    const employerId = employer?.id; // Use optional chaining to safely access id

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const location = formData.get("location");
    const jobType = formData.get("jobType");
    const salaryMin = formData.get("salaryMin");
    const salaryMax = formData.get("salaryMax");
    const salaryNegotiable = formData.get("salaryNegotiable") === "true";
    const category = formData.get("category");
    const experienceLevel = formData.get("experienceLevel");
    const skills = formData.getAll("skills");
    const applyMethod = formData.get("applyMethod");
    const isfinal = formData.get("isfinal");
    const applyUrl = formData.get("applyUrl");
    const applyEmail = formData.get("applyEmail");

    // Validate inputs
    if (!title || !jobType || !employerId) {
      return NextResponse.json(
        { error: "Title, Job Type, and Employer ID are required", success: false },
        { status: 400 }
      );
    }

    // Create a new job entry in the database
    const job = await db.DraftSavedJob.update({
      where: { id }, // Corrected syntax here
      data: {
        title,
        description,
        jobType: jobType.toUpperCase(),
        location,
        salaryMin: salaryMin ? parseFloat(salaryMin) : null,
        salaryMax: salaryMax ? parseFloat(salaryMax) : null,
        salaryNegotiable,
        category,
        experienceLevel,
        skills: {
          set: skills,
        },
        employerId,
        applyMethod,
        applyUrl,
        applyEmail,
        isfinal,
      },
    });

    return NextResponse.json(
      { result: "Job Updated Successfully", success: true, job },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Something went wrong while updating the job", success: false },
      { status: 500 }
    );
  }
}
