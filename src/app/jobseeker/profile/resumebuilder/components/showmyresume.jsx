"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF

const Showmyresume = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF();

    // Set up font style and size
    doc.setFont("Arial", "normal");
    doc.setFontSize(16);

    // Margin and position variables
    const pageMargin = 10; // Outer page margin
    const borderMargin = 10; // Margin between the content and the border
    const innerMargin = 15; // Margin inside the border (between text and border)
    let currentY = pageMargin + borderMargin; // Initial Y position inside the border

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Draw the border
    doc.rect(
      pageMargin,
      pageMargin,
      pageWidth - 2 * pageMargin,
      pageHeight - 2 * pageMargin
    );

    // Set the padding for content inside the border
    const contentWidth = pageWidth - 2 * (pageMargin + borderMargin); // Adjusted width for content
    const contentStartX = pageMargin + borderMargin; // Starting X position for content

    // Add name and contact info inside the border
    const name = `${data?.firstName} ${data?.lastName}`;
    const contact = `${data?.email} | ${data?.phone}`;
    const address = `${data?.addressStreet}, ${data?.addressCity}, ${data?.addressState} - ${data?.addressZip}`;

    // Name (centered with larger font)
    doc.setFontSize(24);
    const nameWidth = doc.getTextWidth(name);
    doc.text(name, (pageWidth - nameWidth) / 2, currentY); // Center the name
    currentY += 8;

    // Contact info (centered with smaller font)
    doc.setFontSize(12);
    const contactWidth = doc.getTextWidth(contact);
    doc.text(contact, (pageWidth - contactWidth) / 2, currentY); // Center the contact
    currentY += 6;

    // Address (centered with smaller font)
    const addressWidth = doc.getTextWidth(address);
    doc.text(address, (pageWidth - addressWidth) / 2, currentY); // Center the address
    currentY += 12;

    // Horizontal line after header
    doc.setLineWidth(0.5);
    doc.line(
      contentStartX,
      currentY,
      pageWidth - pageMargin - borderMargin,
      currentY
    );
    currentY += 12;

    // Function to add content with headings, subheadings, and justified paragraphs
    const addSection = (title, content, isSubheading = false) => {
      // Add section title (heading or subheading)
      doc.setFontSize(isSubheading ? 13 : 14);
      doc.setFont("Arial", "bold");
      doc.text(title, contentStartX, currentY);
      currentY += 6;

      // Add section content as justified text
      doc.setFontSize(12);
      doc.setFont("Arial", "normal");

      // Split content into lines for justified text
      const lines = doc.splitTextToSize(content, contentWidth);
      lines.forEach((line) => {
        doc.text(line, contentStartX, currentY, { align: "justify" });
        currentY += 5;
      });

      currentY += 10; // Space after content
    };

    // About Me Section
    addSection("About Me", data?.aboutMe || "");

    // Education Section
    doc.setFontSize(14);
    doc.setFont("Arial", "bold");
    doc.text("Education", contentStartX, currentY);
    currentY += 6;
    const education = data?.education ? JSON.parse(data.education) : [];
    education.forEach((edu, index) => {
      doc.setFontSize(12);
      doc.setFont("Arial", "normal");
      doc.text(
        `${edu.institution} - ${edu.degree} (${edu.year})`,
        contentStartX,
        currentY
      );
      currentY += 6;
      const eduDetails = `${edu.university} | ${edu.city} | Grade: ${edu.grade}`;
      doc.text(eduDetails, contentStartX, currentY);
      currentY += 12;
    });

    // Skills Section
    addSection("Skills", data?.skills || "", true); // Subheading

    // Work Experience Section
    doc.setFontSize(14);
    doc.setFont("Arial", "bold");
    doc.text("Work Experience", contentStartX, currentY);
    currentY += 6;
    const workExperience = data?.workExperience
      ? JSON.parse(data.workExperience)
      : [];
    workExperience.forEach((work, index) => {
      doc.setFontSize(12);
      doc.setFont("Arial", "normal");

      // Add position and company details
      const startMonth = work.fromDate
        ? new Date(work.fromDate).toLocaleString("default", { month: "long" })
        : "Unknown";
      const endMonth = work.toDate
        ? new Date(work.toDate).toLocaleString("default", { month: "long" })
        : "Present";
      const duration = `${startMonth} ${new Date(
        work.fromDate
      ).getFullYear()} - ${endMonth} ${new Date(work.toDate).getFullYear()}`;
      doc.text(`${work.company} - ${work.position}`, contentStartX, currentY);
      currentY += 6;
      doc.text(duration, contentStartX, currentY);
      currentY += 10;

      // Add Responsibilities Section (Subheading)
      doc.setFontSize(13);
      doc.setFont("Arial", "bold");
      doc.text("Responsibilities", contentStartX, currentY);
      currentY += 6;

      // Add Responsibilities as Bullet Points with customized bullet style
      if (work.responsibilities) {
        const responsibilities = work.responsibilities.split("\n");
        responsibilities.forEach((responsibility, index) => {
          // Add bullet point with better indentation
          doc.setFontSize(12);
          doc.setFont("Arial", "normal");
          const bulletMargin = 1;
          doc.text(
            "• " + responsibility.trim(),
            contentStartX + bulletMargin,
            currentY
          ); // Ensure trimmed spaces
          currentY += 6;

          // If the bullet point is too close to the bottom of the page, add a page break
          if (currentY > pageHeight - 30) {
            doc.addPage();
            currentY = pageMargin + borderMargin;
            doc.rect(
              pageMargin,
              pageMargin,
              pageWidth - 2 * pageMargin,
              pageHeight - 2 * pageMargin
            ); // Redraw border
            doc.setFontSize(12);
            doc.setFont("Arial", "normal");
            doc.text(
              "• " + responsibility.trim(),
              contentStartX + bulletMargin,
              currentY
            ); // Start from top of new page
            currentY += 6;
          }
        });
        currentY += 10;
      }

      // Check if current position is near the bottom of the page and add a page break if necessary
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = pageMargin + borderMargin;
        doc.rect(
          pageMargin,
          pageMargin,
          pageWidth - 2 * pageMargin,
          pageHeight - 2 * pageMargin
        ); // Redraw border
      }
    });

    // Hobbies Section (added before Certifications)
    addSection("Hobbies", data?.hobbies || "", true); // Subheading

    // Certifications Section
    doc.setFontSize(14);
    doc.setFont("Arial", "bold");
    doc.text("Certifications", contentStartX, currentY);
    currentY += 6;
    const certifications = data?.certifications || [];
    certifications.forEach((cert, index) => {
      doc.setFontSize(12);
      doc.setFont("Arial", "normal");
      doc.text(
        `${cert.name} - ${cert.organization} (${cert.year})`,
        contentStartX,
        currentY
      );
      currentY += 6;
    });

    // Check if current position is near the bottom of the page and add a page break if necessary
    if (currentY > pageHeight - 40) {
      doc.addPage();
      currentY = pageMargin + borderMargin;
      doc.rect(
        pageMargin,
        pageMargin,
        pageWidth - 2 * pageMargin,
        pageHeight - 2 * pageMargin
      ); // Redraw border
    }

    // Save the PDF
    doc.save("resume.pdf");
  };

  if (!isClient) {
    return null; // Prevent SSR issues by not rendering this component on the server side
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f7fa",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={generatePdf}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            fontSize: "18px",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Download Resume as PDF
        </button>
      </div>
    </div>
  );
};

export default Showmyresume;
