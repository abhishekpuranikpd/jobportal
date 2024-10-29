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

const DatePostedOptions = {
  ALL: "All Time",
  LAST_24_HOURS: "Last 24 Hours",
  LAST_WEEK: "Last Week",
  LAST_MONTH: "Last Month",
};

const SortOptions = {
  RELEVANT: "Most Relevant",
  RECENT: "Most Recent",
  HIGHEST_SALARY: "Highest Salary",
};

const Mainjobclient = ({ jobs, user }) => {
  const [search, setSearch] = useState({
    jobType: "",
    location: "",
    employerName: "",
  });

  const [sidebarFilters, setSidebarFilters] = useState({
    experience: "ALL",
    category: "ALL",
    type: "ALL",
    employmentType: "ALL",
    datePosted: "ALL", // New filter for Date Posted
  });

  const [sortBy, setSortBy] = useState("RELEVANT"); // New state for sorting
  const [isApplied, setIsApplied] = useState(false);
  const [issaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSidebarChange = (e) => {
    const { name, value } = e.target;
    setSidebarFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter jobs based on the search criteria
  // Filter jobs based on the search criteria
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes(search.jobType.toLowerCase());
    const locationMatch = job.location
      .toLowerCase()
      .includes(search.location.toLowerCase());
    const employerMatch = job.employer.name
      .toLowerCase()
      .includes(search.employerName.toLowerCase());

    const experienceMatch =
      sidebarFilters.experience === "ALL" ||
      job.experienceLevel === sidebarFilters.experience;
    const categoryMatch =
      sidebarFilters.category === "ALL" ||
      job.category === sidebarFilters.category;
    const typeMatch =
      sidebarFilters.type === "ALL" || job.jobType === sidebarFilters.type;
    const employmentTypeMatch =
      sidebarFilters.employmentType === "ALL" ||
      job.employmentType === sidebarFilters.employmentType;

    // Handle Date Posted filtering
    const now = new Date();
    const postedDate = new Date(job.createdAt);
    const datePostedMatch = (() => {
      switch (
        sidebarFilters.datePosted // Corrected from createdAt to datePosted
      ) {
        case "LAST_24_HOURS":
          return now - postedDate <= 24 * 60 * 60 * 1000; // 24 hours
        case "LAST_WEEK":
          return now - postedDate <= 7 * 24 * 60 * 60 * 1000; // 1 week
        case "LAST_MONTH":
          return now - postedDate <= 30 * 24 * 60 * 60 * 1000; // 1 month
        case "ALL":
        default:
          return true;
      }
    })();

    return (
      titleMatch &&
      locationMatch &&
      employerMatch &&
      experienceMatch &&
      categoryMatch &&
      typeMatch &&
      employmentTypeMatch &&
      datePostedMatch // Ensure this is used in the return statement
    );
  });

  // Sorting logic
  const sortedJobs = filteredJobs.sort((a, b) => {
    switch (sortBy) {
      case "RECENT":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "HIGHEST_SALARY":
        return b.salaryMin + b.salaryMax - (a.salaryMin + a.salaryMax);
      case "RELEVANT":
      default:
        return 0; // Default to original order
    }
  });

  const handleApply = async (job) => {
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
  const handleSaveJob = async (job) => {
    if (!user) {
      alert("Please log in to Save this job.");
      return;
    }

    setLoading(true);
    setIsSaved(true);

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
    <>
      <div className="flex justify-center mt-20 container mx-auto">
        <div className="w-11/12 md:w-3/4 lg:w-2/3">
          <div className="flex flex-col md:flex-row items-center p-3 bg-white rounded-2xl shadow-blue-100 shadow-xl md:space-y-0 space-y-2 md:rounded-full">
            <input
              type="text"
              name="jobType"
              placeholder="Job Title"
              value={search.jobType}
              onChange={handleSearchChange}
              className="flex-1 border-b md:border-b-0 md:border-r text-base outline-none py-2 px-3 leading-8 mb-2 md:mb-0"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={search.location}
              onChange={handleSearchChange}
              className="flex-1 text-base outline-none py-2 px-3 leading-8"
            />
            <input
              type="text"
              name="employerName"
              placeholder="Company Name"
              value={search.employerName}
              onChange={handleSearchChange}
              className="flex-1 text-base outline-none py-2 px-3 leading-8"
            />
          </div>
        </div>
      </div>

      <div className="container md:space-x-4 max-w-7xl mx-auto p-4 flex flex-col md:flex-row">
        {/* Sidebar for additional filters (visible on larger screens) */}
        <div className="hidden md:block w-1/4 p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Filters</h2>

          {/* Experience Level Filter */}
          <label className="block mb-2">Experience Level</label>
          <select
            name="experience"
            value={sidebarFilters.experience}
            onChange={handleSidebarChange}
            className="mb-4 w-full border rounded p-2"
          >
            {Object.entries(ExperienceLevels).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* Job Category Filter */}
          <label className="block mb-2">Job Category</label>
          <select
            name="category"
            value={sidebarFilters.category}
            onChange={handleSidebarChange}
            className="mb-4 w-full border rounded p-2"
          >
            <option value="ALL">All Categories</option>
            {Object.entries(JobCategories).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* Job Type Filter */}
          <label className="block mb-2">Job Type</label>
          <select
            name="type"
            value={sidebarFilters.type}
            onChange={handleSidebarChange}
            className="mb-4 w-full border rounded p-2"
          >
            <option value="ALL">All Types</option>
            {Object.entries(JobTypes).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* Employment Type Filter */}
          <label className="block mb-2">Employment Type</label>
          <select
            name="employmentType"
            value={sidebarFilters.employmentType}
            onChange={handleSidebarChange}
            className="mb-4 w-full border rounded p-2"
          >
            <option value="ALL">All Types</option>
            {Object.entries(EmploymentTypes).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* Date Posted Filter */}
          <label className="block mb-2">Date Posted</label>
          <select
            name="datePosted"
            value={sidebarFilters.datePosted}
            onChange={handleSidebarChange}
            className="mb-4 w-full border rounded p-2"
          >
            {Object.entries(DatePostedOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <label className="block mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="mb-4 w-full border rounded p-2"
          >
            {Object.entries(SortOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-4 h-[500px] overflow-auto">
          {sortedJobs.map((job) => (
            <Card
              key={job.id}
              className="border shadow-sm text-black rounded-[15px] p-4 my-2 mx-2 md:my-4 md:mx-4"
              // Set min/max height
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
                      {job.employer.name || "Unknown Company"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center font-bold gap-2">
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

              <CardFooter>
                {" "}
                <div className=" flex justify-center space-x-2 text-sm">
                  <button
                    onClick={() => {
                      if (!user) {
                        alert("Please log in to apply for this job.");
                        router.push("/jobseeker/login");
                      } else {
                        handleApply(job);
                      }
                    }}
                    className="bg-[#243460] text-white py-1 px-4 rounded-full shadow hover:bg-blue-600 transition duration-200"
                  >
                    {loading ? "Please Wait " : " Apply Now"}
                  </button>
                  <button
                    onClick={() => {
                      if (!user) {
                        alert("Please log in to save  this job.");
                        router.push("/jobseeker/login");
                      } else {
                        handleSaveJob(job);
                      }
                    }}
                    className="bg-[#243460] text-white py-2 px-6 rounded-full shadow hover:bg-blue-600 transition duration-200"
                  >
                    {loading ? "Please Wait" : "Save Job"}
                  </button>
                </div>
              </CardFooter>
              <div className="w-full flex justify-start text-xs">
                <p className="">Posted {timeAgo(new Date(job.createdAt))} </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mainjobclient;

const timeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
};
