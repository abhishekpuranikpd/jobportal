import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const jobId = formData.get("jobId");
    const jobseekerId = formData.get("jobSeekerId");
    const employerId = formData.get("employerId");

    // Validate that jobseekerId is not null
    if (!jobseekerId) {
      return NextResponse.json(
        { error: "Job seeker ID is required", success: false },
        { status: 400 }
      );
    }

    // Check if the job exists
    const job = await db.Job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found", success: false },
        { status: 404 }
      );
    }

    // Check if the job seeker exists
    const jobseeker = await db.Jobseeker.findUnique({
      where: { id: jobseekerId },
    });

    if (!jobseeker) {
      return NextResponse.json(
        { error: "Job seeker not found", success: false },
        { status: 404 }
      );
    }

    // Verify if the job seeker has already applied for this job
    const existingApplication = await db.Application.findUnique({
      where: {
        jobseekerId_jobId: {
          jobseekerId: jobseekerId,
          jobId: jobId,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job", success: false },
        { status: 409 }
      );
    }

    // Create a new application record
    const application = await db.Application.create({
      data: {
        job: {
          connect: { id: jobId }, // Use connect to link the existing job
        },
        jobseeker: {
          connect: { id: jobseekerId }, // Use connect to link the existing job seeker
        },
        employer: {
          connect: { id: employerId }, // If applicable, link to existing employer
        },
        // Optionally set other fields like status
      },
    });

    return NextResponse.json(
      { result: "Applied Successfully", success: true, application },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    // Check if the error has specific properties that indicate a known issue
    if (error) {
      return NextResponse.json(
        { error: "Specific error occurred: " + error.message, success: false },
        { status: 400 } // Use appropriate status code
      );
    }

    // Fallback for unknown errors
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again.", success: false },
      { status: 500 }
    );
  }
}
