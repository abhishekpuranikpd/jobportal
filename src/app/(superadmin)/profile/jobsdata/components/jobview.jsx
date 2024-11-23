"use client";
import React, { useState } from "react";
import { MapPin, IndianRupeeIcon, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; // Import shadcn components
import { Building2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const JobsInfo = ({ job }) => {
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([job]); // Ensure the state is an array to match the job list logic
  const [status, setStatus] = useState(job.approvalStatus || "PENDING"); // Track job approval status
  const router = useRouter();

  // Update job status function
  const handleSubmitStatus = async (jobId, action) => {
    const optimisticStatus =
      action === "approve"
        ? "APPROVED"
        : action === "reject"
        ? "REJECTED"
        : "PENDING";

    // Set loading state to true when an action is being performed
    setLoading(true);

    // Optimistic UI update
    setJobList((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, approvalStatus: optimisticStatus } : job
      )
    );

    try {
      const response = await fetch(`/api/jobs/${jobId}/approvalstatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedJob = await response.json();

      // Update the UI with the backend response
      setJobList((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      setStatus(updatedJob.approvalStatus); // Update the status after success
    } catch (error) {
      console.error("Error updating job status:", error);
      alert("Failed to update job status");
      
      // Revert the optimistic update in case of failure
      setJobList((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? { ...job, approvalStatus: job.approvalStatus } // Revert to the original status
            : job
        )
      );
    } finally {
      // Set loading to false after request completes
      setLoading(false);
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
                <span className="font-semibold md:w-40 w-16">Experience Level</span>
                <span className="font-normal ml-2">: {job.experienceLevel || "Not specified"}</span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16">Job Type</span>
                <span className="font-normal ml-2">: {job.jobType || "Not specified"}</span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16">Skills</span>
                <span className="font-normal ml-2">: {job.skills?.join(", ") || "None specified"}</span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16">Benefits</span>
                <span className="font-normal ml-2">: {job.benefits || "None listed"}</span>
              </span>
              <span className="text-sm flex items-start">
                <span className="font-semibold md:w-40 w-16">Application Deadline</span>
                <span className="font-normal ml-2">
                  : {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : "No deadline"}
                </span>
              </span>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <div className="mx-auto container p-6 rounded-[15px] mt-1 border border-gray-300 shadow-md bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-2">About the Company</h2>
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
              <h3 className="text-lg font-semibold text-gray-700">{job.employer.name}</h3>
              {job.employer.aboutcompany ? (
                <p className="text-gray-600">{job.employer.aboutcompany}</p>
              ) : (
                <p className="text-gray-600">Company Information Not available</p>
              )}
            </div>
          </div>

          <Link href={`/employer/${job.employer.id}`}>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Know More about company
            </button>
          </Link>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleSubmitStatus(job.id, "approve")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Please Wait" : "Approve"}
          </button>
          <button
            onClick={() => handleSubmitStatus(job.id, "reject")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Please Wait" : "Reject"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-lg font-semibold text-[#243460]">
            Status: {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobsInfo;
