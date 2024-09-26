"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterComponent = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button while submitting
    setErrorMessage(""); // Reset the error message before submitting
    setSuccessMessage(""); // Reset success message

    try {
      const res = await fetch("/api/employer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Important for JSON body
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Get detailed error from the backend if available
        throw new Error(errorData.message || "Failed to create an account");
      }

      const data = await res.json();
      setSuccessMessage("Account Created Successfully! Redirecting...");
      setTimeout(() => {
        router.push("/employer/login"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message); // Set error message for UI display
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-20 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#243460]">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" noValidate onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 pl-4 text-[#243460]"
            >
              Name
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
                required
                className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full mt-10 justify-center rounded-xl px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Show error message */}
        {errorMessage && (
          <p className="mt-2 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {/* Show success message */}
        {successMessage && (
          <p className="mt-2 text-center text-sm text-green-600">
            {successMessage}
          </p>
        )}

        {/* Login link */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/jobseeker/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
