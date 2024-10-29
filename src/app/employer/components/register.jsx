"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterComponent = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmation password
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [logo, setLogo] = useState(null); // For company logo file upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error messages

  const validatePassword = (password) => {
    const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
    return isStrong ? "" : "Password must be at least 8 characters long and include an uppercase letter and a number.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    setPasswordError("");

    // Validate passwords
    const passwordStrengthError = validatePassword(password);
    if (passwordStrengthError) {
      setPasswordError(passwordStrengthError);
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("website", website);
      formData.append("phoneNumber", phoneNumber);
      formData.append("industry", industry);
      formData.append("companySize", companySize);
      if (logo) formData.append("logo", logo); // Append the logo if it exists

      const res = await fetch("/api/employer/register", {
        method: "POST",
        body: formData, // Using formData to include file upload
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create an account");
      }

      const data = await res.json();
      setSuccessMessage("Account Created Successfully! Redirecting...");
      setTimeout(() => {
        router.push("/employer/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-20 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-2xl mb-2 font-bold tracking-tight text-[#243460]">
          Create Your Employer Account
        </h2>
        <p className="text-center text-sm font-serif tracking-tight text-[#243460]">Fill The details below</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
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
            <label htmlFor="email" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
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

          {/* Password Input */}
          <div className="col-span-1">
            <label htmlFor="password" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
                required
                className={`block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ${passwordError ? 'ring-red-600' : 'focus:ring-indigo-600'}`}
              />
              {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="col-span-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="*****"
                required
                className={`block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ${password !== confirmPassword ? 'ring-red-600' : 'focus:ring-indigo-600'}`}
              />
              {password !== confirmPassword && <p className="text-red-600 text-sm">Passwords do not match</p>}
            </div>
          </div>

          {/* Website Input */}
          <div className="col-span-1">
            <label htmlFor="website" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
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
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
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
            <label htmlFor="industry" className="block text-sm font-medium leading-6 text-[#243460]">
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
            <label htmlFor="companySize" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
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

          {/* Logo Upload */}
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="logo" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
              Upload Company Logo (Optional)
            </label>
            <div className="mt-2">
              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-300 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </div>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="col-span-1 sm:col-span-2 text-red-600 text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="col-span-1 sm:col-span-2 text-green-600 text-center">{successMessage}</div>
          )}
        </form>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/employer/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterComponent;
