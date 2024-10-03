"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const JobPostingForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    jobType: "FULL_TIME",
    location: "",
    salaryMin: "",
    salaryMax: "",
    salaryNegotiable: false,
    category: "HEALTHCARE",
    experienceLevel: "",
    skills: [],
    applicationDeadline: "",
    employmentType: "",
    benefits: "",
    applyMethod: "APPLY_VIA_WEBSITE",
    applyUrl: "",
    applyEmail: "",
    isRemote: false, // New field to manage remote status
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox separately for better clarity
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
        // Only set location to "Remote" if checkbox is checked
        location: checked ? "Remote" : prevData.location,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
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
        ? prevData.skills.filter((skill) => skill !== value)
        : [...prevData.skills, value];
      return { ...prevData, skills };
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredSkills = skillsList.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      const res = await fetch("/api/jobs/draftjobs", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to post job");
      }

      const data = await res.json();
      setSuccessMessage("Job Posting Draft saved Successfully! Redirecting...");
      setTimeout(() => {
        router.push("/employer/profile");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    // You can implement a modal or redirect to a preview page
    console.log("Preview Data: ", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  const handleCancel = () => {
    // Reset form or redirect to the previous page
    router.push("/employer/profile"); // Redirecting to profile page
  };

  return (
    <div className="flex min-h-screen pb-20 flex-col mt-20 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#243460]">
          Create Job Posting
        </h2>
        <p className="text-center text-sm font-serif tracking-tight text-[#243460]">
          Fill in the details below
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-span-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="jobType"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Job Type
            </label>
            <select
              name="jobType"
              id="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Location
            </label>
            <div className="mt-2">
              {/* Conditionally render the location input based on isRemote */}
              {!formData.isRemote && (
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                  required
                  className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}
              <input
                id="isRemote"
                name="isRemote"
                type="checkbox"
                checked={formData.isRemote}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
              />
              <label
                htmlFor="isRemote"
                className="ml-2 text-sm font-medium text-[#243460]"
              >
                Remote
              </label>
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="salaryMin"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Salary Min
            </label>
            <input
              id="salaryMin"
              name="salaryMin"
              type="number"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="Enter minimum salary"
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="salaryMax"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Salary Max
            </label>
            <input
              id="salaryMax"
              name="salaryMax"
              type="number"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="Enter maximum salary"
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="salaryNegotiable" className="flex items-center">
              <input
                id="salaryNegotiable"
                name="salaryNegotiable"
                type="checkbox"
                checked={formData.salaryNegotiable}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
              />
              <span className="ml-2 text-sm font-medium text-[#243460]">
                Salary Negotiable
              </span>
            </label>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="HEALTHCARE">Healthcare</option>
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
              <option value="FINANCE">Finance</option>
              <option value="EDUCATION">Education</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Experience Level
            </label>
            <select
              name="experienceLevel"
              id="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select experience level</option>
              <option value="ENTRY_LEVEL">Entry-level</option>
              <option value="MID_LEVEL">Mid-level</option>
              <option value="SENIOR_LEVEL">Senior-level</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="skills"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460] mb-1"
            >
              Skills Required
            </label>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
            />
            <div className="flex flex-col h-20 overflow-auto space-y-2">
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
            <p className="mt-1 text-xs text-gray-500 pl-4">
              Select multiple options by clicking the checkboxes.
            </p>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="applicationDeadline"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Application Deadline
            </label>
            <input
              id="applicationDeadline"
              name="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="employmentType"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Employment Type
            </label>
            <select
              name="employmentType"
              id="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select employment type</option>
              <option value="PERMANENT">Permanent</option>
              <option value="TEMPORARY">Temporary</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="benefits"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Benefits
            </label>
            <input
              id="benefits"
              name="benefits"
              type="text"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="List benefits"
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="applyMethod"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Application Method
            </label>
            <select
              name="applyMethod"
              id="applyMethod"
              value={formData.applyMethod}
              onChange={handleChange}
              className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="APPLY_VIA_WEBSITE">Apply via Website</option>
              <option value="APPLY_VIA_EMAIL">Apply via Email</option>
              <option value="APPLY_VIA_PLATFORM">Apply via Platform</option>
            </select>
          </div>

          {/* Conditionally render application URL field */}
          {formData.applyMethod === "APPLY_VIA_WEBSITE" && (
            <div className="col-span-1">
              <label
                htmlFor="applyUrl"
                className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
              >
                Website URL
              </label>
              <input
                id="applyUrl"
                name="applyUrl"
                type="url"
                value={formData.applyUrl}
                onChange={handleChange}
                placeholder="Enter website URL"
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          )}

          {/* Conditionally render application email field */}
          {formData.applyMethod === "APPLY_VIA_EMAIL" && (
            <div className="col-span-1">
              <label
                htmlFor="applyEmail"
                className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
              >
                Email
              </label>
              <input
                id="applyEmail"
                name="applyEmail"
                type="email"
                value={formData.applyEmail}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          )}

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePreview}
              className="flex justify-center rounded-md bg-[#243460] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1a253c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243460]"
            >
              Preview
            </button>
  
            <button
              type="button"
              onClick={handleCancel}
              className="flex justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center rounded-md bg-[#243460] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1a253c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243460]"
            >
              {isSubmitting ? "Submitting..." : "Post Job"}
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center col-span-2">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center col-span-2">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;
