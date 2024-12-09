"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";

const ResumeBuilderEdit = ({data}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: data?.fullName || "",
    email: data?.email || "",
    phone: data?.phone || "",
    aboutMe: data?.aboutMe || "",
    education: data?.education ? JSON.parse(data.education)  :  [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        year: "",
        percentage: "",
      },
    ],
    workExperience: data?.workExperience ? JSON.parse(data.workExperience) : [
        { company: "", position: "", duration: "", responsibilities: "" },
      ],
    skills: data?.skills || "",
    hobbies: data?.hobbies || "",
    certifications: data?.certifications || [{ name: "", organization: "", year: "" }],
    address: data?.address || { street: "", city: "", state: "", zip: "" },
  });

  // Handle changes for general fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for nested address fields
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

  // Add a new education entry
  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          year: "",
          percentage: "",
        },
      ],
    }));
  };

  // Add a new work experience entry
  const handleAddWorkExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      workExperience: [
        ...prevData.workExperience,
        { company: "", position: "", duration: "", responsibilities: "" },
      ],
    }));
  };

  // Submit the form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/jobseeker/resumebuilderai/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Error saving resume");
      }

      const result = await response.json();
      console.log("Saved data:", result);
      // Call a PDF generation function or success handling
      generateModernPDF(result.formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-8 mx-auto p-6 md:pb-8 pb-96 bg-white shadow-lg rounded-lg max-w-2xl">
      <h1 className="text-xl font-bold text-center mb-1">
        Resume Builder from Peperk.in 
      </h1>
      <h1 className="text-sm font-normal text-center mb-6">
        (After Generating upload into resume section)
      </h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Download Resume
      </button>

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
            value={formData.address.street || data.addressCity}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="Street Address"
          />
          <input
            type="text"
            name="city"
            value={formData.address.city || data.addressCity}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={formData.address.state || data.addressCity}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-xl mt-1"
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            value={formData.address.zip || data.addressZip}
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
          {formData.education?.map((edu, idx) => (
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
                type="date"
                name="year"
                value={edu.year}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].year = e.target.value; // Store the full date (YYYY-MM-DD)
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
          {formData.workExperience?.map((exp, idx) => (
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
          Update Resume And Save to Your Device
        </button>
      </form>
    </div>
  );
};

export default ResumeBuilderEdit;
