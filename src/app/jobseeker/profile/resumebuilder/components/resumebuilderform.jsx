"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";

const ResumeBuilder = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    aboutMe: "",
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        year: "",
        percentage: "",
      },
    ],
    workExperience: [
      { company: "", position: "", duration: "", responsibilities: "" },
    ],
    skills: "",
    hobbies: "",
    certifications: [{ name: "", organization: "", year: "" }],
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { institution: "", degree: "", fieldOfStudy: "", year: "" },
      ],
    }));
  };

  const handleAddWorkExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      workExperience: [
        ...prevData.workExperience,
        { company: "", position: "", duration: "", responsibilities: "" },
      ],
    }));
  };

  const generateModernPDF = () => {
    const doc = new jsPDF();

    // Constants
    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - margin * 2;
    const sectionSpacing = 8; // Reduced section spacing
    const lineSpacing = 6; // Reduced line spacing
    let y = margin;

    // Function to draw border and header
    const drawPageHeader = () => {
      doc.setDrawColor(200);
      doc.setLineWidth(0.2);
      doc.rect(
        margin / 2,
        margin / 2,
        pageWidth - margin,
        doc.internal.pageSize.height - margin
      );
    };

    // Function to check if enough space is available on the current page
    const checkForSpace = (requiredSpace) => {
      const spaceLeft = doc.internal.pageSize.height - y - margin;
      if (spaceLeft < requiredSpace) {
        doc.addPage();
        y = margin; // Reset the Y position for the new page
        drawPageHeader(); // Redraw the border on the new page
      }
    };

    // Function to add content with overflow handling
    const addContent = (contentFn) => {
      checkForSpace(30); // Ensure there is enough space for the content
      contentFn();
    };

    // Candidate Name and Contact Information
    const addNameAndContact = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(formData.fullName, pageWidth / 2, y, { align: "center" });
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        `Email: ${formData.email} | Phone: ${formData.phone}`,
        pageWidth / 2,
        y,
        { align: "center" }
      );
      y += sectionSpacing;
    };

    // Address Section
    const addAddress = () => {
      if (
        formData.address.street ||
        formData.address.city ||
        formData.address.state ||
        formData.address.zip
      ) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Address", margin, y); // Left-aligned heading
        y += sectionSpacing;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const address = `${formData.address.street}, ${formData.address.city}, ${formData.address.state}, ${formData.address.zip}`;
        const addressText = doc.splitTextToSize(address, contentWidth);
        doc.text(addressText, margin, y);
        y += addressText.length * lineSpacing + sectionSpacing;
      }
    };

    // About Me Section
    const addAboutMe = () => {
      if (formData.aboutMe) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("About Me", margin, y); // Left-aligned heading
        y += lineSpacing;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const aboutMeText = doc.splitTextToSize(formData.aboutMe, contentWidth);
        doc.text(aboutMeText, margin, y);
        y += aboutMeText.length * lineSpacing + sectionSpacing;
      }
    };

    // Education Section
    const addEducation = () => {
      if (formData.education.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Education", margin, y); // Left-aligned heading
        y += sectionSpacing;

        formData.education.forEach((edu) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(`${edu.degree} in ${edu.fieldOfStudy}`, margin, y);
          y += lineSpacing;

          doc.setFont("helvetica", "normal");
          doc.text(
            `${edu.institution} | ${edu.year} | ${edu.percentage}%`,
            margin,
            y
          );
          y += sectionSpacing;
        });
        y += 10;
      }
    };

    // Work Experience Section
    const addWorkExperience = () => {
      if (formData.workExperience.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Work Experience", margin, y); // Left-aligned heading
        y += sectionSpacing;

        formData.workExperience.forEach((exp) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(`${exp.position} at ${exp.company}`, margin, y);
          y += lineSpacing;

          doc.setFont("helvetica", "normal");
          doc.text(`Duration: ${exp.duration}`, margin, y);
          y += lineSpacing;

          const responsibilities = doc.splitTextToSize(
            `Responsibilities: ${exp.responsibilities}`,
            contentWidth
          );
          doc.text(responsibilities, margin, y);
          y += responsibilities.length * lineSpacing;
        });
        y += 10;
      }
    };

    // Skills Section
    const addSkills = () => {
      if (formData.skills) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Skills", margin, y); // Left-aligned heading
        y += sectionSpacing;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const skills = formData.skills.split(",").map((skill) => skill.trim());
        const skillsText = skills.join(" • "); // Use bullet points for separation
        const splitSkills = doc.splitTextToSize(skillsText, contentWidth); // Wrap skills within page width

        splitSkills.forEach((line) => {
          doc.text(line, margin, y);
          y += lineSpacing;
        });

        y += 10; // Add spacing after the section
      }
    };

    // Hobbies Section
    const addHobbies = () => {
      if (formData.hobbies) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Hobbies", margin, y); // Left-aligned heading
        y += sectionSpacing;

        doc.setFont("helvetica", "normal");
        const hobbiesText = doc.splitTextToSize(formData.hobbies, contentWidth);
        doc.text(hobbiesText, margin, y);
        y += hobbiesText.length * lineSpacing + sectionSpacing;
      }
    };

    // Certifications Section
    const addCertifications = () => {
      if (formData.certifications.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Certifications", margin, y); // Left-aligned heading
        y += sectionSpacing;

        formData.certifications.forEach((cert) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(cert.name, margin, y);
          y += lineSpacing;

          doc.setFont("helvetica", "normal");
          doc.text(`${cert.organization} | ${cert.year}`, margin, y);
          y += sectionSpacing;
        });
      }
    };

    // Add the header border on the first page
    drawPageHeader();

    // Add all sections with overflow handling
    addContent(addNameAndContact);
    addContent(addAddress);
    addContent(addAboutMe);
    addContent(addEducation);
    addContent(addWorkExperience);
    addContent(addSkills);
    addContent(addHobbies);
    addContent(addCertifications);

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Generated using peperk.in",
      pageWidth - margin,
      doc.internal.pageSize.height - margin,
      { align: "right" }
    );

    // Save the document
    doc.save(`${formData.fullName}-resume.pdf`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Generate the PDF and download it
    try {
      generateModernPDF(); // This will trigger the PDF download
  
      // After the PDF is generated, navigate to the absolute path /jobseeker/profile/resume
      router.push('/jobseeker/profile/resume');
    } catch (error) {
      console.error("Error during PDF generation:", error);
      alert('Error generating the resume!');
    }
  };
  
  return (
    <div className="container mt-8 mx-auto p-6 md:pb-8 pb-96 bg-white shadow-lg rounded-lg max-w-2xl">
      <h1 className="text-xl font-bold text-center mb-1">Resume Builder from Peperk.in</h1>
      <h1 className="text-sm font-normal text-center mb-6">(After Generating upload into resume section)</h1>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Personal Details */}
        <div>
          <label className="block text-sm font-medium" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-xl mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-xl mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-xl mt-1"
            required
          />
        </div>

        {/* Address Section */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="Street Address"
          />
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            value={formData.address.zip}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="Zip Code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="aboutMe">
            About Me
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-xl mt-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Education Section */}
        <div>
          <label className="block text-sm font-medium">Education</label>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="space-y-4">
              <input
                type="text"
                name="institution"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].institution = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].degree = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].fieldOfStudy = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="percentage"
                placeholder="Percentage/Grade"
                value={edu.percentage}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].percentage = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />

              <input
                type="text"
                name="year"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].year = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Add Education
          </button>
        </div>

        {/* Work Experience Section */}
        <div>
          <label className="block text-sm font-medium">Work Experience</label>
          {formData.workExperience.map((exp, idx) => (
            <div key={idx} className="space-y-4">
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const updatedExperience = [...formData.workExperience];
                  updatedExperience[idx].company = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => {
                  const updatedExperience = [...formData.workExperience];
                  updatedExperience[idx].position = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => {
                  const updatedExperience = [...formData.workExperience];
                  updatedExperience[idx].duration = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <textarea
                name="responsibilities"
                placeholder="Responsibilities"
                value={exp.responsibilities}
                onChange={(e) => {
                  const updatedExperience = [...formData.workExperience];
                  updatedExperience[idx].responsibilities = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
                rows="3"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWorkExperience}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Add Work Experience
          </button>
        </div>

        {/* Skills Section */}
        <div>
          <label className="block text-sm font-medium" htmlFor="skills">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-xl mt-1 shadow-sm"
            rows="4"
          />
        </div>
        {/* Hobbies Section */}
        <div>
          <label className="block text-sm font-medium" htmlFor="hobbies">
            Hobbies
          </label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-xl mt-1 shadow-sm"
            rows="3"
          />
        </div>
        {/* Certifications Section */}
        <div>
          <label className="block text-sm font-medium">Certifications</label>
          {formData.certifications.map((cert, idx) => (
            <div key={idx} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => {
                  const updatedCertifications = [...formData.certifications];
                  updatedCertifications[idx].name = e.target.value;
                  setFormData({
                    ...formData,
                    certifications: updatedCertifications,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={cert.organization}
                onChange={(e) => {
                  const updatedCertifications = [...formData.certifications];
                  updatedCertifications[idx].organization = e.target.value;
                  setFormData({
                    ...formData,
                    certifications: updatedCertifications,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={cert.year}
                onChange={(e) => {
                  const updatedCertifications = [...formData.certifications];
                  updatedCertifications[idx].year = e.target.value;
                  setFormData({
                    ...formData,
                    certifications: updatedCertifications,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData((prevData) => ({
                ...prevData,
                certifications: [
                  ...prevData.certifications,
                  { name: "", organization: "", year: "" },
                ],
              }));
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Add Certification
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Generate Resume And Save to Your Device
        </button>
      </form>
    </div>
  );
};

export default ResumeBuilder;
