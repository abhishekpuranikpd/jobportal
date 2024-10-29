"use client";
import React, { useState, useEffect } from "react";
import { MapPin, IndianRupeeIcon, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import shadcn components
import { Building2Icon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const JobsInfo = ({ job, user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [issaved, setIsSaved] = useState(false);

  const [applicantDetails, setApplicantDetails] = useState({
    name: "",
    email: "",
    resume: null,
  });
  // Check if user exists and if they have applications
  useEffect(() => {
    // Check if user exists
    if (!user) {
      setIsApplied(false); // No user means the application is open
      return; // Exit the effect early
    }

    // Check if any application has a jobId that matches the current job's id
    const hasApplied = user.applications.some(
      (application) => application.jobId === job.id
    );
    setIsApplied(hasApplied); // Set the state based on the result of the check
  }, [user, job]);

  useEffect(() => {
    if (!user) {
      setIsSaved(false); // No user means the application is open
      return; // Exit the effect early
    }
    // Check if any application has a jobId that matches the current job's id
    const hasSaved = user.savedJob.some(
      (savedjob) => savedjob.jobId === job.id
    );
    setIsSaved(hasSaved); // Set the state based on the result of the check
  }, [user, job]);

  // Auto-fill user profile information if logged in
  useEffect(() => {
    if (user) {
      setApplicantDetails((prevDetails) => ({
        ...prevDetails,
        name: user.fullName,
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleFileChange = (e) => {
    setApplicantDetails({ ...applicantDetails, resume: e.target.files[0] });
  };

  const handleApply = async () => {
    if (!user) {
      alert("Please log in to apply for this job.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("jobId", job.id);
    formData.append("jobSeekerId", user.id); // Include job seeker ID
    formData.append("employerId", job.employer.id);

    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formData,
      });

      // Check if the response is OK
      if (response.ok) {
        alert("Application submitted successfully!");
        setIsModalOpen(false);
        setApplicantDetails({ name: "", email: "", resume: null });
      } else {
        // Attempt to extract the error message from the response
        const errorData = await response.json(); // Parse the response as JSON
        alert(
          `Failed to submit application: ${
            errorData.error || "Please try again."
          }`
        );
      }
    } catch (error) {
      // Handle any network or unexpected errors
      alert("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };
  const handleSaveJob = async () => {
    if (!user) {
      alert("Please log in to Save this job.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("jobId", job.id);
    formData.append("jobSeekerId", user.id); // Include job seeker ID

    try {
      const response = await fetch("/api/jobs/savedjobs", {
        method: "POST",
        body: formData,
      });

      // Check if the response is OK
      if (response.ok) {
        alert("Saved Job successfully!");
      } else {
        // Attempt to extract the error message from the response
        const errorData = await response.json(); // Parse the response as JSON
        alert(`Failed to save job: ${errorData.error || "Please try again."}`);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      alert("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="mx-auto container lg:px-40 pt-20 py-3">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#243460]">
        Job Details
      </h1>

      <div className="bg-white text-black shadow-xl rounded-lg p-6">
        <div className="mb-6 flex items-start">
          <span className="mx-2 my-1">
            <Building2Icon className="text-[#243460]" size={30} />
          </span>
          <div className="flex-1">
            <h2 className="font-bold text-2xl hover:text-blue-600 transition duration-200">
              {job.title || "Untitled Job"}
            </h2>
            <p className="text-sm text-gray-600">
              {job.employer?.name || "Unknown Company"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:space-x-4 mb-4">
          <p className="text-xs bg-blue-100 text-[#243460] px-3 py-1 rounded-full flex items-center">
            <MapPin className="mr-1" size={16} />
            {job.location || "Location not available"}
          </p>
          <p className="text-xs bg-blue-100 text-[#243460] px-3 py-1 rounded-full flex items-center">
            <IndianRupeeIcon className="mr-1" size={16} />
            {job.salaryMin?.toLocaleString()} -{" "}
            {job.salaryMax?.toLocaleString()}
            <span className="text-[#243460]"> / year</span>
          </p>
          <span className="text-xs bg-blue-100 text-[#243460] px-3 py-1 rounded-full flex items-center">
            <Clock className="mr-1" size={16} />
            {job.employmentType || "Full Time"}
          </span>
        </div>

        <Card>
          <CardContent>
            <p className="text-base break-words mb-4 mt-3">
              {job.description || "No description provided."}
            </p>
            <div className="flex flex-col space-y-2">
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16 ">
                  Experience Level
                </span>
                <span className="font-normal ml-2">
                  : {job.experienceLevel || "Not specified"}
                </span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16 ">Job Type</span>
                <span className="font-normal ml-2">
                  : {job.jobType || "Not specified"}
                </span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16 ">Skills</span>
                <span className="font-normal ml-2">
                  : {job.skills?.join(", ") || "None specified"}
                </span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16 ">Benefits</span>
                <span className="font-normal ml-2">
                  : {job.benefits || "None listed"}
                </span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16 ">
                  Application Deadline
                </span>
                <span className="font-normal ml-2">
                  :{" "}
                  {job.applicationDeadline
                    ? new Date(job.applicationDeadline).toLocaleDateString()
                    : "No deadline"}
                </span>
              </span>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <div className="mx-auto container p-6 rounded-[15px] mt-1 border border-gray-300  shadow-md bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            About the Company
          </h2>
          <div className="flex items-center mb-4">
            {job.employer.companyLogo ? (
              <Image
                src={job.employer.companyLogo}
                alt="Company Logo"
                className="w-12 h-12 mr-2 rounded-full shadow-lg"
                height={100}
                width={100}
              />
            ) : (
              <div className="w-12 h-12 mr-2 rounded-full bg-gray-300 flex items-center justify-center shadow-lg">
                <span className="text-gray-500"></span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {job.employer.name}
              </h3>
              {job.employer.aboutcompany ? (
                <p className="text-gray-600">{job.employer.aboutcompany}</p>
              ) : (
                <p className="text-gray-600">
                  Company Information Not avilable
                </p>
              )}
            </div>
          </div>

       <Link href={`/employer/${job.employer.id}`}>   <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
            Know More about company
          </button></Link> 
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => {
              if (!user) {
                alert("Please log in to apply for this job.");
                router.push("/jobseeker/login");
              } else {
                setIsModalOpen(true);
              }
            }}
            className="bg-[#243460] text-white py-2 px-6 rounded-full shadow hover:bg-blue-600 transition duration-200"
          >
            {isApplied ? "Applied" : " Apply Now"}
          </button>
          <button
            onClick={() => {
              if (!user) {
                alert("Please log in to save  this job.");
                router.push("/jobseeker/login");
              } else {
                handleSaveJob();
              }
            }}
            className="bg-[#243460] text-white py-2 px-6 rounded-full shadow hover:bg-blue-600 transition duration-200"
          >
            {issaved ? "Saved" : "Save Job"}
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Apply for {job.title}</h2>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={applicantDetails.name}
                onChange={(e) =>
                  setApplicantDetails({
                    ...applicantDetails,
                    name: e.target.value,
                  })
                }
                className="w-full p-2 border mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={applicantDetails.email}
                onChange={(e) =>
                  setApplicantDetails({
                    ...applicantDetails,
                    email: e.target.value,
                  })
                }
                className="w-full p-2 border mb-2"
                required
              />

              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-[#243460] py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="bg-[#243460] text-white py-2 px-4 rounded"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsInfo;
