"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Briefcase,
  FileText,
  Tag,
  MapPin,
  Globe,
  Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mapping enums to human-readable formats
const jobPreferenceMapping = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  REMOTE: "Remote",
  CONTRACT: "Contract",
};

const ProfileCard = ({ userdata }) => {
  const readableJobPreference =
    jobPreferenceMapping[userdata.jobPreference] || "Unknown Job Preference";

  const userInfo = [
    {
      key: "Email",
      value: userdata.email,
      icon: <Mail className="inline mr-2" size={16} />,
    },
    {
      key: "Phone",
      value: userdata.phone,
      icon: <Phone className="inline mr-2" size={16} />,
    },
    {
      key: "Job Preference",
      value: readableJobPreference,
      icon: <Briefcase className="inline mr-2" size={20} />,
    },
    {
      key: "Skills",
      value: userdata.skills.join(" | "),
      icon: <Tag className="inline mr-2" size={16} />,
    },
    {
      key: "Location",
      value: userdata.location,
      icon: <MapPin className="inline mr-2" size={16} />,
    },
    {
      key: "LinkedIn",
      value: userdata.linkedIn,
      icon: <Globe className="inline mr-2" size={16} />,
      isLink: true,
    },
    {
      key: "Website",
      value: userdata.website,
      icon: <Globe className="inline mr-2" size={16} />,
      isLink: true,
    },
    {
      key: "About Me",
      value: userdata.aboutMe,
      icon: <Info className="inline mr-2" size={16} />,
    },
    {
      key: "Availability",
      value: userdata.availability,
      icon: <Info className="inline mr-2" size={16} />,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-2xl rounded-xl shadow-lg bg-white border border-gray-200 transition-transform duration-200 hover:shadow-2xl">
        <CardHeader className="flex flex-col items-center py-8">
          <Image
            src={userdata.profileimg || "/placeholder-avatar.png"}
            alt={userdata.fullName}
            width={120}
            height={120}
            className="w-28 h-28 border-4 rounded-full border-indigo-600 mb-4 shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <CardTitle className="text-center text-3xl font-extrabold text-[#243460]">
            {userdata.fullName}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">{readableJobPreference}</p>
        </CardHeader>

        <CardContent className="space-y-4 ">
          {/* Personal Info */}
          {userInfo.map(
            ({ key, value, icon, isLink }, index) =>
              value && (
                <div
                  className="flex items-start  space-x-2 flex-wrap text-justify"
                  key={index}
                >
                  <span className="font-semibold text-[#243460] text-sm lg:text-base inline-flex items-center md:w-40">
                    {icon} {key}
                  </span>
                  {isLink ? (
                    <Link
                      href={
                        value.startsWith("http") ? value : `https://${value}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {key === "LinkedIn" ? "Visit LinkedIn" : "Visit Website"}
                    </Link>
                  ) : (
                    <span className="text-gray-700 text-sm lg:text-base">
                      : {value}
                    </span>
                  )}
                </div>
              )
          )}

          {/* Education Section */}
          {userdata.education && userdata.education.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-sm lg:text-lg mb-2 flex items-center">
                Education
              </h3>
              <ul className="space-y-2">
                {userdata.education.map((edu, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm lg:text-base"
                  >
                    <strong>{edu.degree}</strong> at {edu.institution} (
                    {edu.startDate} - {edu.endDate})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Work Experience Section */}
          {userdata.workExperience && userdata.workExperience.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-sm lg:text-lg mb-2 flex items-center">
                Work Experience
              </h3>
              <ul className="space-y-2">
                {userdata.workExperience.map((exp, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm lg:text-base"
                  >
                    <strong>{exp.title}</strong> at {exp.company} (
                    {exp.startDate} - {exp.endDate})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resume List */}
          {userdata.resumes && userdata.resumes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-sm lg:text-lg mb-2 flex items-center">
                <FileText className="inline mr-2" size={16} /> Resumes{" "}
                <span className="text-[10px] ml-2">
                  ({userdata.resumes.length})
                </span>
              </h3>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-sm text-[#243460]">
                      Resume Title
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-sm text-[#243460]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.resumes.map((resume, index) => (
                    <tr key={index} className="border">
                      <td className="px-4 py-2 text-sm">
                        {resume.title || `Resume ${index + 1}`}
                      </td>
                      <td className="px-4 py-2 border text-sm">
                        {resume.url ? (
                          <Link
                            href={resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 p-2 border"
                          >
                            View Resume
                          </Link>
                        ) : (
                          <span className="text-gray-500">
                            URL not available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
