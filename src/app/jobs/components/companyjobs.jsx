"use client";
import { Building2Icon, Clock, IndianRupeeIcon, MapPin } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Define enums as constants for filtering
const ExperienceLevels = {
  ENTRY_LEVEL: "Entry Level",
  MID_LEVEL: "Mid Level",
  SENIOR_LEVEL: "Senior Level",
  ALL: "All Levels",
};

const JobCategories = {
  IT: "IT",
  HEALTHCARE: "Healthcare",
  MARKETING: "Marketing",
  FINANCE: "Finance",
  EDUCATION: "Education",
  OTHER: "Other",
};

const JobTypes = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

const EmploymentTypes = {
  PERMANENT: "Permanent",
  TEMPORARY: "Temporary",
  CONTRACT: "Contract",
};

const Companysimilarjobs = ({ jobs ,CompanyName}) => {
console.log(jobs.map((j)=>(j.id)));

  return (
    <>
      <div className="flex justify-center mt-4 container mx-auto">
       
      <div className="container md:space-x-4 max-w-7xl  mx-auto p-4 flex flex-col md:flex-row">
        {/* Sidebar for additional filters (visible on larger screens) */}
       

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 h-[500px] overflow-auto">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="border shadow-sm text-black rounded-[15px] p-4 my-2 mx-2 md:my-4 md:mx-4"
              style={{
                minHeight: "200px",
                maxHeight: "200px",
                overflow: "hidden",
              }} // Set min/max height
            >
              <CardHeader>
                <div className="flex items-center">
                  <Building2Icon className="mr-2" />
                  <div>
                    <Link href={`/jobs/${job.id}`}>
                      <CardTitle className="text-[14px] md:text-xl font-bold hover:text-blue-500">
                        {job.title || "Untitled Job"}
                      </CardTitle>
                    </Link>
                    <p className="text-xs">
                      { CompanyName}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center  font-bold gap-2">
                <p className="text-xs border-2 px-2 py-1 rounded-full flex items-center">
                  <MapPin className="text-[#243460] mr-1" size={16} />
                  {job.location || "Location not available"}
                </p>
                <p className="text-xs border-2 px-2 py-1 rounded-full flex items-center">
                  <Clock className="text-[#243460] mr-1" size={16} />
                  {job.employmentType || "Full Time"}
                </p>
                <p className="text-xs border-2 px-2 py-1 rounded-full flex items-center">
                  <IndianRupeeIcon className="text-[#243460] mr-1" size={16} />
                  {job.salaryMin?.toLocaleString()} -{" "}
                  {job.salaryMax?.toLocaleString()} / year
                </p>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </div>
      </div>
      </div>

    </>
  );
};

export default Companysimilarjobs;
