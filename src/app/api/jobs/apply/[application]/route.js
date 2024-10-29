import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const applicantid = params.application; // Ensure params.healthcard gives you the ID
    console.log(applicantid);
    
    if (!applicantid) {
      return NextResponse.json({ error: 'application ID is required.' }, { status: 400 });
    }
  
    try {
      const { action } = await req.json();
  
      let approvalStatus;
      if (action === "approve") {
        approvalStatus = 'SHORTLISTED';
      } else if (action === "reject") {
        approvalStatus = 'REJECTED';
      } else {
        return NextResponse.json(
          { error: 'Invalid action provided. Must be "approve" or "reject".' },
          { status: 400 }
        );
      }
  
      const updatestatus = await db.Application.update({
        where: { id:applicantid  }, // Make sure this is the correct field name
        data: {
        status:  approvalStatus,
        },
      });
  
      return NextResponse.json(updatestatus);
    } catch (error) {
      console.error("Error updating status:", error);
      return NextResponse.json({ error: 'Failed to update .' }, { status: 500 });
    }
  }
  