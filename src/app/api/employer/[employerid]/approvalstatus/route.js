import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated." },
      { status: 401 }
    );
  }

  const employerId = params.employerid;
  if (!employerId) {
    return NextResponse.json(
      { error: "Employer is missing." },
      { status: 400 }
    );
  }

  const EmployerStatus = await db.Employer.findUnique({
    where: { id: employerId },
  });

  if (!EmployerStatus) {
    return NextResponse.json({ error: "Employer not found." }, { status: 404 });
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

    const updatedemployer = await db.Employer.update({
      where: { id: employerId },
      data: {
        approvalStatus,
        approvedBy: user.id,
      },
    });

    return NextResponse.json(updatedemployer);
  } catch (error) {
    console.error("Error updating  status:", error);
    return NextResponse.json({ error: "Failed to update " }, { status: 500 });
  }
}
