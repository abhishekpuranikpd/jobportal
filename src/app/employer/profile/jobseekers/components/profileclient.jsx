"use client";
import { FileText } from "lucide-react";
import Image from "next/image";
import React from "react";

const Profileclient = ({ data }) => {
  const openResumeInNewWindow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full">
        {/* Header */}
        <div className="bg-green-500 text-white text-center py-4">
          <h1 className="text-xl font-bold">{data.fullName}</h1>
        </div>

        {/* Jobseeker details */}
        <div className="p-6">
          {/* Profile Image */}
          {data.profileimg && (
            <div className="flex justify-center mb-4">
              <Image
                src={data.profileimg}
                alt={`${data.fullName}'s Profile`}
                width={100}
                height={100}
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Phone:</span> {data.phone}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Location:</span> {data.location}
          </p>

          {/* Skills */}
          {data.skills && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-lg mb-2">
                Skills
              </h3>
              <ul className="list-disc pl-6 space-y-1">
              
         {data.skills.join(" | ")}
              </ul>
            </div>
          )}

          {/* Education */}
          {data.education && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-lg mb-2">
                Education
              </h3>
              <ul className="space-y-2">
                {data.education?.map((education, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-semibold">
                      {education.degree} in {education.field}
                    </span>{" "}
                    from {education.school} (Graduated:{" "}
                    {education.graduationYear})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Work Experience */}
          {data.workExperience && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-lg mb-2">
                Work Experience
              </h3>
              <ul className="space-y-2">
                {data.workExperience?.map((job, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-semibold">{job.position}</span> at{" "}
                    {job.company} ({job.startDate} - {job.endDate})
                    <p>{job.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resumes */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#243460] text-sm lg:text-lg mb-2 flex items-center">
              <FileText className="inline mr-2" size={16} /> Resumes{" "}
              <span className="text-[10px] ml-2">({data.resumes.length})</span>
            </h3>
            <ul className="space-y-2">
              {data.resumes.map((resume, index) => (
                <li key={resume.id} className="flex items-center space-x-4">
                  <span className="text-sm lg:text-base">
                    {resume.title || `Resume ${index + 1}`}
                  </span>
                  <button
                    className="text-blue-500 underline rounded px-4 py-2"
                    onClick={() => openResumeInNewWindow(resume.url)}
                  >
                    View Resume
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profileclient;
