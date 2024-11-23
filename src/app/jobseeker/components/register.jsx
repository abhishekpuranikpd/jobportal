"use client";
import { UploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    jobPreference: "FULL_TIME",
    location: "",
    category: "",
    resumeUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
const router = useRouter()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
    return isStrong ? "" : "Password must be at least 8 characters long and include an uppercase letter and a number.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    setPasswordError("");

    // Ensure the state has the latest values
    await new Promise((resolve) => setTimeout(resolve, 0)); // Await next tick for state update

    // Basic validation
    const passwordStrengthError = validatePassword(formData.password);
    if (passwordStrengthError) {
      setPasswordError(passwordStrengthError);
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.resumeUrl) {
      setErrorMessage("Please upload your resume");
      setLoading(false);
      return;
    }

    console.log("Form Data before submission:", formData); // Debug log

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("fullName", formData.fullName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("location", formData.location);
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("jobPreference", formData.jobPreference);
      formDataToSubmit.append("resumeUrl", formData.resumeUrl); // Include the resume URL here

      const response = await fetch("/api/jobseeker/register", {
        method: "POST",
        body: formDataToSubmit,
      });

      console.log("API Response:", response); // Log the response

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed");
      } else {
        setSuccessMessage("Registration successful! Please log in.");
        router.push("/jobseeker/login")
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          jobPreference: "FULL_TIME",
          resumeUrl: "",
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-20 px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-xl font-bold text-[#243460] mb-6">
          Create Your Job Seeker Account
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="*****"
              className={`block w-full rounded-xl border ${passwordError ? 'border-red-600' : 'border-gray-300'} pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400`}
            />
            {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="*****"
              className={`block w-full rounded-xl border ${formData.password !== formData.confirmPassword ? 'border-red-600' : 'border-gray-300'} pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400`}
            />
            {formData.password !== formData.confirmPassword && <p className="text-red-600 text-sm">Passwords do not match</p>}
          </div>

          {/* Job Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Job Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, San Francisco, Remote"
              className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
            />
          </div>

          {/* Phone Input (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
            />
          </div>

          {/* Job Preference */}
          <div>
            <label htmlFor="jobPreference" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Job Preference
            </label>
            <select
              id="jobPreference"
              name="jobPreference"
              value={formData.jobPreference}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
            >
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="REMOTE">Remote</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-[#243460]">
              Desired Job Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-gray-300 p-2 text-[#243460] shadow-sm focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Select</option>

              <option value="HEALTHCARE">Healthcare</option>
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
              <option value="FINANCE">Finance</option>
              <option value="EDUCATION">Education</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Resume Upload with UploadButton */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Resume Upload
            </label>
            <UploadButton
              className="bg-blue-600 text-white rounded-full"
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                if (res.length > 0) {
                  setFormData((prevData) => ({
                    ...prevData,
                    resumeUrl: res[0].url, // Update this according to your response structure
                  }));
                  alert("Upload Completed");
                }
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-[#243460] py-2 text-white hover:bg-[#3d5af1]"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Error and Success Messages */}
        {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}
        {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
      </div>
    </div>
  );
};

export default RegisterForm;
