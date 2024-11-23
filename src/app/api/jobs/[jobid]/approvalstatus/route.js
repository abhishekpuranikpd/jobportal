import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const user = await getCurrentUser();
  console.log("Session user:", user); // Debugging

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated." },
      { status: 401 }
    );
  }

  const jobId = params.jobid;
  if (!jobId) {
    return NextResponse.json(
      { error: "Job ID is missing." },
      { status: 400 }
    );
  }

  const JobStatus = await db.Job.findUnique({
    where: { id: jobId },
  });

  if (!JobStatus) {
    return NextResponse.json(
      { error: "Job not found." },
      { status: 404 }
    );
  }

  try {
    const { action } = await req.json();

    let approvalStatus;
    if (action === "approve") {
      approvalStatus = "APPROVED";
    } else if (action === "reject") {
      approvalStatus = "REJECTED";
    } else {
      return NextResponse.json(
        { error: 'Invalid action provided. Must be "approve" or "reject".' },
        { status: 400 }
      );
    }

    const updatedJob = await db.Job.update({
      where: { id: jobId },
      data: {
        approvalStatus,
        approvedBy: user.id,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating Job status:", error);
    return NextResponse.json(
      { error: "Failed to update Job." },
      { status: 500 }
    );
  }
}
