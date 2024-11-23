import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";

// Middleware to handle POST requests
export const POST = async (req) => {
  try {
    // Parse incoming JSON request
    const formData = await req.json();

    // Extract form data
    const { fullName, email, aboutMe, education, workExperience, skills } = formData;

    // Validate input
    if (!fullName || !email) {
      return NextResponse.json({ error: "Full Name and Email are required" }, { status: 400 });
    }

    // Create a new PDF document using jsPDF
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Resume", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Full Name: ${fullName}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);

    if (aboutMe) {
      doc.setFont("helvetica", "normal");
      doc.text("About Me:", 10, 50);
      doc.text(doc.splitTextToSize(aboutMe, 190), 10, 55);
    }

    if (education && education.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Education:", 10, 70);
      let y = 75;
      education.forEach((edu, idx) => {
        doc.setFont("helvetica", "normal");
        doc.text(
          `${idx + 1}. ${edu.institution}, ${edu.degree} (${edu.fieldOfStudy}) - ${edu.year}`,
          10,
          y
        );
        y += 10;
      });
    }

    if (workExperience && workExperience.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Work Experience:", 10, 110);
      let y = 115;
      workExperience.forEach((exp, idx) => {
        doc.setFont("helvetica", "normal");
        doc.text(`${idx + 1}. ${exp.company} - ${exp.position}`, 10, y);
        y += 5;
        doc.text(`   Duration: ${exp.duration}`, 10, y);
        y += 5;
        doc.text(`   Responsibilities: ${exp.responsibilities}`, 10, y);
        y += 10;
      });
    }

    if (skills && skills.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Skills:", 10, 150);
      doc.setFont("helvetica", "normal");
      doc.text(skills.join(", "), 10, 155);
    }

    // Convert the PDF to a Blob and send it as a response
    const pdfBlob = doc.output("blob");
    const buffer = Buffer.from(await pdfBlob.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fullName.replace(
          /\s+/g,
          "_"
        )}_Resume.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again later." },
      { status: 500 }
    );
  }
};
