"use client";
import React, { useState } from "react"; // Import useState
import { MapPin, IndianRupeeIcon, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Import shadcn components
import { Building2Icon } from "lucide-react";
import Jobapplicants from "./jobapplicants";

const JobsInfo = ({ job }) => {
  // State to manage the visibility of applicants
  const [showApplicants, setShowApplicants] = useState(false);

  // Function to toggle applicants visibility
  const toggleApplicants = () => {
    setShowApplicants((prev) => !prev);
  };

  return (
    <>
      <div className="mx-auto container px-4 pt-16 py-3 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#243460]">
          Job Details
        </h1>

        <div className="bg-white text-black shadow-xl rounded-lg p-6">
          {/* Job Title and Employer */}
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

          {/* Job Details (Location, Salary, Employment Type) */}
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

          {/* Job Description Card */}
          <Card className="">
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
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="bg-[#243460] text-white py-2 px-6 rounded-full shadow hover:bg-blue-600 transition duration-200"
              onClick={toggleApplicants} // Add click handler to toggle applicants
            >
              {showApplicants ? "Hide Applications" : "View Applications"}
            </button>
          </div>
        </div>
      </div>

      {/* Conditional rendering of Jobapplicants based on state */}
      {showApplicants && <Jobapplicants applicantsData={job.application} />}
    </>
  );
};

export default JobsInfo;
