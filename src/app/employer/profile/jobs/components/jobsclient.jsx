"use client";
import React from "react";
import { MapPin, IndianRupeeIcon, Clock } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import shadcn components
import { Building2Icon } from "lucide-react";
import Link from "next/link";

const JobsList = ({ jobs ,employer }) => {
  return (
    <div className="mx-auto container px-2 pt-16 py-3">
      <h1 className="text-xl font-bold mb-4">Jobs</h1>

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
          <Link href={`/employer/profile/jobs/${job.id}`}>
            <span className="font-bold hover:text-blue-500 text-xl">
              {job.title || "Untitled Job"}
            </span>
          </Link>
          <p className="text-xs">
            {employer.name || "Unknown Company"}
          </p>
        </div>
      </div>

<div className="flex flex-wrap md:flex-nowrap  items-center gap-1 md:space-x-2  md:pb-1">
  <p className="text-xs bg-gray-200 px-2 py-1 rounded-[3px] flex items-center">
    <MapPin className="text-[#243460] mr-1" size={16} /> {/* Location icon */}
    {job.location || "Location not available"}
  </p>
  <p className="text-xs bg-gray-200 px-2 py-1 rounded-[3px] flex items-center">
    <IndianRupeeIcon className="text-[#243460] mr-1" size={16} /> {/* Salary icon */}
    {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} 
    <span className="text-[#243460]"> / year</span>
  </p>
  <span className="text-xs bg-gray-200 px-2 py-1 rounded-[3px] flex items-center">
    <Clock className="text-[#243460] mr-1" size={16} /> {/* Employment type icon */}
    {job.employmentType || "Full Time"}
  </span>
</div>

    </div>
  ))}
</div>

    </div>
  );
};

export default JobsList;
