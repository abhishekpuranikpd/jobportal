import { db } from "@/lib/db"; // Import database connection
import { getSession } from "@/lib/jobseekerauth"; // Import session retrieval function
import { NextResponse } from "next/server"; // Import Next.js response handler

export async function POST(request) {
  try {
    // Retrieve session data before using it
    const user = await getSession();

    // Log user to debug
    const employer = await db.Employer.findFirst({
      where: { email: user.email },
    });

    const employerId = employer?.id; // Use optional chaining to safely access id

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description"); // Add description from form data
    const location = formData.get("location");
    const jobType = formData.get("jobType"); // Get job type from form data
    const salaryMin = formData.get("salaryMin"); // Optional: Get min salary from form data
    const salaryMax = formData.get("salaryMax"); // Optional: Get max salary from form data
    const salaryNegotiable = formData.get("salaryNegotiable") === "true"; // Handle negotiable checkbox
    const category = formData.get("category"); // Get job category from form data
    const experienceLevel = formData.get("experienceLevel"); // Get experience level from form data
    const skills = formData.getAll("skills"); // Get skills from form data (multi-select)
    const applyMethod = formData.get("applyMethod");
    const  employmentType = formData.get("employmentType");

    const applicationDeadlineRaw = formData.get("applicationDeadline");

    const applyUrl = formData.get("applyUrl");
    const applyEmail = formData.get("applyEmail");
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


    // Validate inputs
    if (!title || !jobType || !employerId) {
      return NextResponse.json(
        { error: "Title, Job Type, and Employer ID are required", success: false },
        { status: 400 }
      );
    }

    // Create a new job entry in the database
    const job = await db.Job.create({
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
        applicationDeadline,
        skills: {
          set: skills, 
        },
        employerId, 
        applyMethod,
        applyUrl,
        applyEmail,
        employmentType
      },
    });

    return NextResponse.json(
      { result: "New Job Created", success: true, job },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the job", success: false },
      { status: 500 }
    );
  }
}
