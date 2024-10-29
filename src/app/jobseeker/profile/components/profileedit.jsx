"use client";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
const ProfileEditForm = ({ userdata }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    skills: [], // Initialize as an empty array
    confirmPassword: "",
    phone: "",
    jobPreference: "FULL_TIME",
    resumeUrl: "",
    aboutMe: "",
    location: "",
    linkedIn: "",
    website: "",
    category: "",
    logo: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const skillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
  ];

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const skills = prevData.skills.includes(value)
        ? prevData.skills.filter((skill) => skill !== value) // Remove skill if already selected
        : [...prevData.skills, value]; // Add skill if not selected
      return { ...prevData, skills };
    });
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSkills = skillsList.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Populate form data with existing user data
  useEffect(() => {
    if (userdata) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: userdata.fullName || "",
        email: userdata.email || "",
        phone: userdata.phone || "",
        jobPreference: userdata.jobPreference || "FULL_TIME",
        resumeUrl: userdata.resumeUrl || "",
        skills: userdata.skills || [], // Ensure skills is an array,
        location: userdata.location || "",
        linkedIn: userdata.linkedIn || "",
        website: userdata.website || "",
        aboutMe: userdata.aboutMe || "",
        category: userdata.category || "",
        logo: userdata.profileimg || "",
      }));
    }
  }, [userdata]);

  // Handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Prepare form data for submission
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("fullName", formData.fullName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("jobPreference", formData.jobPreference);
      formDataToSubmit.append("resumeUrl", formData.resumeUrl);
      formDataToSubmit.append("skills", formData.skills); // Include selected skills as JSON
      formDataToSubmit.append("aboutMe", formData.aboutMe);
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("linkedIn", formData.linkedIn);
      formDataToSubmit.append("website", formData.website);
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("logo", formData.logo);

      // Send the registration data to your registration API
      const response = await fetch(`/api/jobseeker/${userdata.id}`, {
        method: "PUT",
        body: formDataToSubmit,
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Update failed");
      } else {
        setSuccessMessage("Update successful!");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating.");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-10 px-6 lg:px-">
      <div className="mx-auto w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[#243460] mb-6">
          Edit Your Account
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center col-span-1 sm:col-span-2">
            <label
              htmlFor="logo"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460] mb-2"
            >
              Profile Image
            </label>

            <div className="">
              <Image
                src={formData.logo}
                alt="Profile Image"
                width={150}
                height={150}
                className="rounded-full h-16 w-16 border-2 border-blue-700 md:h-28 md:w-28  cursor-pointer"
              />
            </div>

            <UploadButton
              className="bg-blue-600 text-white rounded-2xl px-2 py-1 mt-1"
              endpoint="fileUploader"
              content={{
                button({ ready }) {
                  return (
                    <div>
                      {ready
                        ? uploadComplete
                          ? "Uploaded" // Button text after upload completes
                          : "Upload  Photo"
                        : "Preparing..."}
                    </div>
                  );
                },
                allowedContent({
                  ready,
                  fileTypes,
                  isUploading,
                }) {
                  if (!ready)
                    return "Checking allowed files...";
                  if (isUploading)
                    return "Uploading your files...";
                  return `Allowed file types: ${fileTypes.join(
                    ", "
                  )}`;
                },
              }}
              appearance={{
                button:
                  "w-auto bg-transparent text-[10px] xl:text-[14px] px-4 md:text-[11px] text-white font-bold rounded-full font-normal flex items-center justify-center cursor-pointer",
                container:
                  "rounded-full xl:h-9 md:h-8 h-7 px-6  border w-auto px-1 bg-[#002e6e]",
                allowedContent:
                  "flex h-2 flex-col items-center justify-center px-4 text-[1px] text-white hidden",
              }}

              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  setFormData((prevData) => ({
                    ...prevData,
                    logo: res[0].url,
                  }));
                  alert("Upload Completed");
                } else {
                  alert("Upload failed, no files returned.");
                }
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*****"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="*****"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Phone Input (Optional) */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Phone (Optional)
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Job Preference */}
          <div>
            <label
              htmlFor="jobPreference"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Job Preference
            </label>
            <div className="mt-2">
              <select
                id="jobPreference"
                name="jobPreference"
                value={formData.jobPreference}
                onChange={handleChange}
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600"
              >
                <option value="FULL_TIME">Full-Time</option>
                <option value="PART_TIME">Part-Time</option>
                <option value="REMOTE">Remote</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Location
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label
              htmlFor="linkedIn"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              LinkedIn
            </label>
            <div className="mt-2">
              <input
                id="linkedIn"
                name="linkedIn"
                type="text"
                value={formData.linkedIn}
                onChange={handleChange}
                placeholder="LinkedIn Profile"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Website
            </label>
            <div className="mt-2">
              <input
                id="website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter website URL"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* About Me */}
          <div>
            <label
              htmlFor="aboutMe"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              About Me
            </label>
            <div className="mt-2">
              <textarea
                id="aboutMe"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                placeholder="Enter a short description"
                className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="skills"
              className="block text-sm font-medium leading-6 text-[#243460] mb-1"
            >
              Skills
            </label>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600 mb-2"
            />
            <div className="flex flex-col h-32 overflow-auto space-y-2">
              {filteredSkills.map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleSkillChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-[#243460]">{skill}</span>
                </label>
              ))}
            </div>
            <h3 className="text-sm font-bold mb-4">Your Skills</h3>
            <div className="text-[#243460]">
              {formData.skills.filter((skill) => skill).join("| ")}
            </div>
          </div>

          {/* Category */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-[#243460]"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600"
            >
              <option value="HEALTHCARE">Healthcare</option>
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
              <option value="FINANCE">Finance</option>
              <option value="EDUCATION">Education</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#243460] py-2 text-white hover:bg-[#3d5af1]"
              disabled={loading}
            >
              {loading ? "Updating" : "Update"}
            </button>
          </div>
        </form>

        {/* Error and Success Messages */}
        {errorMessage && (
          <div className="mt-4 text-red-600">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-600">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditForm;
