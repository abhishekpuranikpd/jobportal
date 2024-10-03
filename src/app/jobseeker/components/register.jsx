"use client";
import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    jobPreference: "FULL_TIME",
    resume: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true); // Set loading to true

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false); // Reset loading
      return;
    }

    if (!formData.resume) {
      setErrorMessage("Please upload your resume");
      setLoading(false); // Reset loading
      return;
    }

    try {
      // Create form data to send the file and fields
      const formDataFile = new FormData();
      formDataFile.append("fullName", formData.fullName);
      formDataFile.append("email", formData.email);
      formDataFile.append("password", formData.password);
      formDataFile.append("phone", formData.phone);
      formDataFile.append("jobPreference", formData.jobPreference);
      formDataFile.append("resume", formData.resume);

      // Send the data to the registration API
      const response = await fetch("/api/jobseeker/register", {
        method: "POST",
        body: formDataFile,
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed");
      } else {
        setSuccessMessage("Registration successful! Please log in.");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          jobPreference: "FULL_TIME",
          resume: null,
        });
        document.getElementById("resume").value = ""; // Clear file input
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false); // Reset loading in any case
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-20 px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[#243460] mb-6">
          Create your account
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
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
                required
                placeholder="Enter your full name"
                className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Email address
            </label>
            <div className="mt-2">
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
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
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
                required
                placeholder="*****"
                className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
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
                required
                placeholder="*****"
                className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Phone Input (Optional) */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
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
                className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Job Preference */}
          <div>
            <label
              htmlFor="jobPreference"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Job Preference
            </label>
            <div className="mt-2">
              <select
                id="jobPreference"
                name="jobPreference"
                value={formData.jobPreference}
                onChange={handleChange}
                className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="REMOTE">Remote</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
          </div>

          {/* Resume Upload - Spans both columns */}
          <div className="md:col-span-2">
            <label
              htmlFor="resume"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Resume Upload
            </label>
            <div className="mt-2">
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.png"
                onChange={handleFileChange}
                required
                className="block w-full rounded-xl border border-gray-300 pl-2 py-2 text-[#243460] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading} // Disable button if loading
              className={`flex w-full mt-6 justify-center rounded-xl ${loading ? "bg-gray-400" : "bg-indigo-600"} px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 transition duration-200`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Display success or error messages */}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-600 text-center">{successMessage}</div>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?
          <a
            href="/auth/login"
            className="font-semibold leading-6 pl-2 text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
