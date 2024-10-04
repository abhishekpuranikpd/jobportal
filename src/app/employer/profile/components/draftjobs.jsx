"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import shadcn components
import { Building2Icon } from "lucide-react";
import Link from "next/link";

const DraftJobs = ({ jobs }) => {
  return (
    <div className="mx-auto container px-2 pt-16 py-3">
      <h1 className="text-xl font-bold mb-4">Draft Saved Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white text-black shadow-xl rounded-[15px] p-4"
          >
            <div className="mb-3 flex items-start">
              <span className="mx-3 my-1">
                <Building2Icon />
              </span>
              <div className="flex-1">
                <span className="font-bold text-xl">
                  {job.title || "Untitled Job"}
                </span>
                <p className="text-xs">
                  {job.employer.name || "Unknown Company"}
                </p>
              </div>
              <div>
                {/* <img src="logo.jpeg" alt="Logo" className="w-10 h-10 mx-10" /> */}
              </div>
            </div>

            <div className="pb-1">
              <p className="mx-3 text-sm">
                <i className="fa-solid fa-location-dot"></i>{" "}
                {job.location || "Location not available"}
              </p>
              <p className="mx-3 text-sm">
                <i className="fa-solid fa-money-bill"></i>{" "}
                {job.salaryMin?.toLocaleString()} -
                {job.salaryMax?.toLocaleString()} per year
              </p>
            </div>

            <div className="flex space-x-2 p-2">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-[3px]">
                {job.employmentType || "Full Time"}
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-[3px]">
                {job.isfinal ? (
                  <span className="text-green-600 font-bold">Finalized</span>
                ) : (
                  <span className="text-red-600 font-bold">Draft</span>
                )}
              </span>
              <Link href={`/employer/profile/draftjobs/${job.id}`}>
                {" "}
                <span className="text-xs bg-blue-500 font-bold text-white px-2 py-1 rounded-[3px]">
                  {"Edit "}
                </span>{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftJobs;
