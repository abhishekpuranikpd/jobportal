"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";

const EmployerEditClient = ({ data }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [logo, setLogo] = useState(null); // For company logo file upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [aboutcompany, setAboutcompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("website", website);
      formData.append("phoneNumber", phoneNumber);
      formData.append("industry", industry);
      formData.append("companySize", companySize);
      if (logo) formData.append("logo", logo); // Append the logo if it exists
      formData.append("aboutcompany", aboutcompany);

      const res = await fetch(`/api/employer/${data?.id}`, {
        method: "PUT",
        body: formData, // Using formData to include file upload
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response data:", errorData); // Log the error response data
        throw new Error(errorData.message || "Failed to update the account");
      }

      const responseData = await res.json();
      setSuccessMessage("Account Updated Successfully! Redirecting...");
      setTimeout(() => {
        router.push("/employer/login");
      }, 2000);
    } catch (error) {
      console.error("Caught error:", error); // Log the caught error
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setLogo(data.image || "");

      setCompanySize(data.companySize || "");
      setAboutcompany(data.aboutcompany || "");
      setIndustry(data.industry || "");
      setWebsite(data.companyWebsite || "");
      setPhoneNumber(data.phoneNumber || "");
    }
  }, [data]);

  // Conditional rendering if data is not available
  if (!data) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="flex min-h-screen flex-col mt-20 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-2xl mb-2 font-bold tracking-tight text-[#243460]">
          Update Your Employer Account
        </h2>
        <p className="text-center text-sm font-serif tracking-tight text-[#243460]">
          Fill The details below
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          noValidate
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Company Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="col-span-1">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Website Input */}
          <div className="col-span-1">
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Company Website URL
            </label>
            <div className="mt-2">
              <input
                id="website"
                name="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="col-span-1">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Company Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="123-456-7890"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Industry Input */}
          <div className="col-span-1">
            <label
              htmlFor="industry"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Industry
            </label>
            <select
              name="industry"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
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

          {/* Company Size Input */}
          <div className="col-span-1">
            <label
              htmlFor="companySize"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Company Size
            </label>
            <div className="mt-2">
              <input
                id="companySize"
                name="companySize"
                type="number"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                placeholder="Number of employees"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* About Company Input */}
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="aboutcompany"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              About Company
            </label>
            <div className="mt-2">
              <textarea
                id="aboutcompany"
                name="aboutcompany"
                value={aboutcompany}
                onChange={(e) => setAboutcompany(e.target.value)}
                placeholder="Tell us about your company"
                rows={4}
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="logo"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Upload Company Logo (Optional)
            </label>
            <UploadButton
              className="bg-blue-600 text-white rounded-full"
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                if (res.length > 0) {
                  setLogo(res[0].url); // Set the logo URL directly
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

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-300 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Updating..." : "Update Account"}
            </button>
          </div>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="col-span-1 sm:col-span-2 text-red-600 text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="col-span-1 sm:col-span-2 text-green-600 text-center">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployerEditClient;
