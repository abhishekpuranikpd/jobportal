import React from "react";
import Link from "next/link"; // Import Next.js Link
import Image from "next/image"; // Import Next.js Image
import {
  Briefcase,
  Calendar,

  Info,
} from "lucide-react";

const AppliedJobs = ({ data }) => {
  return (
    <div className="mx-auto container px-2 pt-8 py-3">
      <h1 className="text-xl font-bold mb-4">Applied Jobs</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
          {data.map((application) => (
            <div
              key={application.id}
              className="bg-white text-black shadow-xl rounded-[15px] p-4"
            >
              {/* Job details */}
              <div className="mb-3 flex items-start">
                {/* Company logo using Next.js Image component */}
                {application.employer?.companyLogo ? (
                  <Image
                    src={application.employer.companyLogo}
                    alt={`${application.employer.name} logo`}
                    width={40} // Set desired width
                    height={40} // Set desired height
                    className="object-cover rounded-full"
                  />
                ) : (
                  <Briefcase className="w-8 h-8 text-gray-700" />
                )}

                <div className="flex-1 ml-3">
                <Link href={`/jobs/${application.job.id}`}>
                  <span className="font-bold text-xl">
                    {application.job?.title || "No title"}
                  </span></Link>
  <Link href={`/companies/${application.employer?.id}`}>
  <p className="text-xs text-gray-600">
                    {application.employer?.name || "Unknown Company"}
                  </p></Link>
                </div>
              </div>

{/* Status and job link */}
<div className="flex space-x-2 p-2 items-center">
  {/* Status */}
  <span className="text-xs px-3 py-2 font-semibold rounded border border-gray-300 flex items-center">
    Status:{" "}
    {application.status === "SHORTLISTED" ? (
      <span className="text-green-600 font-bold ml-1">Shortlisted</span>
    ) : application.status === "PENDING" ? (
      <span className="text-yellow-600 font-bold ml-1">Pending</span>
    ) : (
      <span className="text-red-600 font-bold ml-1">Rejected</span>
    )}
  </span>

  <div className="flex items-center text-xs px-3 py-2 font-semibold rounded border border-gray-300">
    <Calendar className="w-4 h-4 text-gray-500" />
    <p className="ml-2 text-xs text-gray-700">
      Applied Date: {new Date(application.appliedAt).toLocaleDateString()}
    </p>
  </div>
</div>

{/* Button links */}
<div className="flex space-x-2 p-2 items-center">
  <Link href={`/jobs/${application.job.id}`}>
    <span className="flex items-center text-xs px-3 py-2 font-semibold rounded border border-gray-300 hover:bg-gray-100 transition">
      <Info className="w-4 h-4 text-gray-500" />
      <p className="ml-2 text-xs text-gray-700">Job Details</p>
    </span>
  </Link>
  <Link href={`/employer/${application.employer?.id}`}>
    <span className="flex items-center text-xs px-3 py-2 font-semibold rounded border border-gray-300 hover:bg-gray-100 transition">
      <Info className="w-4 h-4 text-gray-500" />
      <p className="ml-2 text-xs text-gray-700">Company Details</p>
    </span>
  </Link>
</div>



            </div>
          ))}
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
