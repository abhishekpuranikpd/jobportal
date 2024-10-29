import React from "react";
import Link from "next/link"; // Import Next.js Link
import Image from "next/image"; // Import Next.js Image
import { Briefcase, Calendar, Info } from "lucide-react";

const SavedJobs = ({ data }) => {
  return (
    <div className="mx-auto container px-2 pt-8 py-3">
      <h1 className="text-xl font-bold mb-4">Saved Jobs</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
          {data.map((savedjobs) => (
            <div
              key={savedjobs.id}
              className="bg-white text-black shadow-xl rounded-[15px] p-4"
            >
              {/* Job details */}
              <div className="mb-3 flex items-start">
                {/* Company logo using Next.js Image component */}
                {savedjobs.employer?.companyLogo ? (
                  <Image
                    src={""}
                    alt={`${application.employer.name} logo`}
                    width={40} // Set desired width
                    height={40} // Set desired height
                    className="object-cover rounded-full"
                  />
                ) : (
                  <Briefcase className="w-8 h-8 text-gray-700" />
                )}

                <div className="flex-1 ml-3">
                  <Link href={`/jobs/${savedjobs.job.id}`}>
                    <span className="font-bold text-xl">
                      {savedjobs.job?.title || "No title"}
                    </span>
                  </Link>
               
                </div>
              </div>

              {/* Status and job link */}
       

              {/* Button links */}
              <div className="flex space-x-2 p-2 items-center">
                <Link href={`/jobs/${savedjobs.jobId}`}>
                  <span className="flex items-center text-xs px-3 py-2 font-semibold rounded border border-gray-300 hover:bg-gray-100 transition">
                    <Info className="w-4 h-4 text-gray-500" />
                    <p className="ml-2 text-xs text-gray-700">Job Details</p>
                  </span>
                </Link>
                <Link href={`#`}>
                  <span className="flex items-center text-xs px-3 py-2 font-semibold rounded border border-gray-300 hover:bg-gray-100 transition">
                    <Info className="w-4 h-4 text-gray-500" />
                    <p className="ml-2 text-xs text-gray-700">      Saved Date: {new Date(savedjobs.savedAt).toLocaleDateString()}</p>
                  </span>
                </Link>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No saved jobs found.</p>
      )}
    </div>
  );
};

export default SavedJobs;
