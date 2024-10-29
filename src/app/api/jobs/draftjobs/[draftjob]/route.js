import { db } from "@/lib/db"; // Import database connection
import { getSession } from "@/lib/jobseekerauth"; // Import session retrieval function
import { NextResponse } from "next/server"; // Import Next.js response handler

export async function PUT(request, { params }) {
  const id = params.draftjob; // Get draft job ID from params

  try {
    // Retrieve session data
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // Find the employer by email
    const employer = await db.Employer.findFirst({
      where: { email: user.email },
    });

    if (!employer) {
      return NextResponse.json(
        { error: "Employer not found", success: false },
        { status: 404 }
      );
    }

    const employerId = employer.id; // Use optional chaining to safely access id
    const formData = await request.formData();

    // Extract form data
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
    const applyUrl = formData.get("applyUrl");
    const applyEmail = formData.get("applyEmail");
    const  employmentType = formData.get("employmentType");

    const isfinal = formData.get("isfinal") === "true"; // Explicitly convert to boolean
    const applicationDeadlineRaw = formData.get("applicationDeadline");
    let applicationDeadline;
    if (typeof applicationDeadlineRaw === 'string' && applicationDeadlineRaw.trim() !== "") {
      const parsedDate = new Date(applicationDeadlineRaw);
      if (!isNaN(parsedDate.getTime())) {
        applicationDeadline = parsedDate.toISOString(); // Get full ISO string
      } else {
        throw new Error("Invalid date format");
      }
    } else {
      throw new Error("Invalid input for application Deadline: must be a non-empty string");
    }
    // Log form data for debugging

    // Validate required fields
    if (!title || !jobType || !employerId) {
      console.error("Validation Error: Missing required fields");
      return NextResponse.json(
        { error: "Title, Job Type, and Employer ID are required", success: false },
        { status: 400 }
      );
    }

    // Update the draft job in the database
    const draftjob = await db.DraftSavedJob.update({
      where: { id },
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
        employmentType,
        applyMethod,
        applyUrl,
        applyEmail,
        isfinal,
        applicationDeadline
      },
    });

    let job = null;

    // If job is marked as final, create a new job entry
    if (isfinal) {
      job = await db.Job.create({
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
          employmentType,
          applicationDeadline
        },
      });
    }

    return NextResponse.json(
      { result: "Job Updated Successfully", success: true, job, draftjob },
      { status: 200 }
    );
  } catch (error) {
    // Log the actual error in the catch block
    console.error("Error updating job:", error);

    return NextResponse.json(
      { error: "Something went wrong while updating the job", details: error.message, success: false },
      { status: 500 }
    );
  }
}
