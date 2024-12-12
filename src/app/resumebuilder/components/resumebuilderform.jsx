"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";

const ResumeBuilder = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName : "" ,
    email: "",
    phone: "",
    aboutMe: "",
    education: [
      {
        institution: "",
        university: "",
        city: "",
        year: "",
        Gradingsystem: "",
        grade: "",
      },
    ],
 workExperience : [
      {
        company: "",
        position: "",
        fromDate: "",  // Start date (MM/YYYY)
        toDate: "",    // End date (MM/YYYY)
        location: "",  // Location of the job
        department: "", // Department in which the person worked
        teamSize: "",   // Size of the team (optional)
        positionsUnderYou: "", // Positions under the person (if any)
        hadTeam: "",    // Yes/No (whether they managed a team)
        responsibilities: "",  // Job responsibilities
      }
    ],
    
    skills: "",
    hobbies: "",
    certifications: [{ name: "", organization: "", year: "" }],
    address: { street: "", city: "", state: "", zip: "" },
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
        {
          institution: "",
          university: "",
          city: "",
          year: "",
          Gradingsystem: "",
          grade: "",
        },
      ],
    }));
  };

  const handleAddWorkExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      workExperience: [
        ...prevData.workExperience,
        {  company: "",
          position: "",
          fromDate: "",  
          toDate: "",    // End date (MM/YYYY)
          location: "",  // Location of the job
          department: "", // Department in which the person worked
          teamSize: "",   // Size of the team (optional)
          positionsUnderYou: "", // Positions under the person (if any)
          hadTeam: "",    
          responsibilities: "" }
      ],
    }));
  };

  // PDF generation function

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await fetch("/api/jobseeker/resumebuilderai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText); // Log error response
        throw new Error("Error generating resume");
      }

      const result = await response.json();
      console.log("Generated data:", result); // Log the result to check if formData is as expected
      router.push("/jobseeker/profile/resumebuilder/resumeedit");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-16  mx-auto p-6 md:pb-8 pb-96  max-w-4xl">
      <h1 className="text-xl font-bold text-center mb-1">
        Resume Builder from Peperk.in
      </h1>
      <h1 className="text-sm font-normal text-center mb-6">
        (After Generating upload into resume section)
      </h1>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Full Name */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl mt-1"
              required
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium" htmlFor="lastName">
             Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl mt-1"
              required
            />
          </div>

          {/* Email */}
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <label className="block text-sm font-medium" htmlFor="email">
              Email Address
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

          {/* Phone Number */}
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <label className="block text-sm font-medium" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl mt-1"
              required
            />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Street Address */}
            <div className="w-full md:w-1/2">
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-xl mt-1"
                placeholder="Street Address"
              />
            </div>

            {/* City */}
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-xl mt-1"
                placeholder="City"
              />
            </div>

            {/* State */}
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-xl mt-1"
                placeholder="State"
              />
            </div>
          </div>

          <div className="mt-4">
            {/* Zip Code */}
            <div className="w-full md:w-1/4">
              <input
                type="text"
                name="zip"
                value={formData.address.zip}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-xl"
                placeholder="Zip Code"
              />
            </div>
          </div>
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
                name="university"
                placeholder="University"
                value={edu.university}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].university = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={edu.city}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].city = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
              {/* Grading System Dropdown */}
              <select
                name="gradingSystem"
                value={edu.gradingSystem}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].gradingSystem = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              >
                <option value="">Select Grading System</option>
                <option value="UGC_10_points">UGC 10 Points</option>
                <option value="US_grade">US Grade</option>
                <option value="percentage">Percentage</option>
              </select>

              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={edu.grade}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[idx].grade = e.target.value;
                  setFormData({ ...formData, education: updatedEducation });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />

              <input
                type="text"
                name="Passing Year"
                placeholder="Passing Year"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-blue-600 transition"
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
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].company = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
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
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].position = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />

              {/* Duration: From Date */}
              <div className="flex space-x-2">
                <input
                  type="month"
                  name="fromDate"
                  value={exp.fromDate}
                  placeholder="From Date"
                  onChange={(e) => {
                    const updatedWorkExperience = [...formData.workExperience];
                    updatedWorkExperience[idx].fromDate = e.target.value;
                    setFormData({
                      ...formData,
                      workExperience: updatedWorkExperience,
                    });
                  }}
                  className="w-1/2 p-3 border rounded-xl mt-1 shadow-sm appearance-none"
                />
                {/* Duration: To Date */}
                <input
                  type="month"
                  name="toDate"
                  value={exp.toDate}
                  onChange={(e) => {
                    const updatedWorkExperience = [...formData.workExperience];
                    updatedWorkExperience[idx].toDate = e.target.value;
                    setFormData({
                      ...formData,
                      workExperience: updatedWorkExperience,
                    });
                  }}
                  className="w-1/2 p-3 border rounded-xl mt-1 shadow-sm"
                />
              </div>

              {/* Location */}
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={exp.location}
                onChange={(e) => {
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].location = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />

              {/* Department */}
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={exp.department}
                onChange={(e) => {
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].department = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />

              {/* Team Size */}
              <select
                name="teamSize"
                value={exp.teamSize}
                onChange={(e) => {
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].teamSize = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              >
                <option value="">Select Team Size</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11-20">11-20</option>
                <option value="20+">20+</option>
              </select>

              {/* Positions under you */}
              <input
                type="text"
                name="positionsUnderYou"
                placeholder="Positions under you"
                value={exp.positionsUnderYou}
                onChange={(e) => {
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].positionsUnderYou = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />

              {/* Team: Yes/No */}
              <select
                name="hadTeam"
                value={exp.hadTeam}
                onChange={(e) => {
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].hadTeam = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              >
                <option value="">Did you have a team?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {/* Responsibilities */}
              <textarea
                name="responsibilities"
                placeholder="Responsibilities"
                value={exp.responsibilities}
                onChange={(e) => {
                  const updatedWorkExperience = [...formData.workExperience];
                  updatedWorkExperience[idx].responsibilities = e.target.value;
                  setFormData({
                    ...formData,
                    workExperience: updatedWorkExperience,
                  });
                }}
                className="w-full p-3 border rounded-xl mt-1 shadow-sm"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddWorkExperience}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-blue-600 transition"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-blue-600 transition"
          >
            Add Certification
          </button>
        </div>
  {      loading ?     <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-xl"
        >
          Please Wait
        </button> :
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-xl"
        >
          Generate Resume And Save to Your Device
        </button>}
      </form>
    </div>
  );
};

export default ResumeBuilder;
