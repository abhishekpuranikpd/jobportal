"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Mail, Phone, Briefcase, FileText, Tag, MapPin, Globe, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Enum to human-readable mappings for JobPreference
const jobPreferenceMapping = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  REMOTE: "Remote",
  CONTRACT: "Contract",
};

const ProfileCard = ({ userdata }) => {
  // Convert enums to readable text
  const readableJobPreference =
    jobPreferenceMapping[userdata.jobPreference] || "Unknown Job Preference";

  // Key-value pairs for user data with consistent icon usage
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
      value: userdata.skills.join(", ").replace(/,/g, " | "),
      icon: <Tag className="inline mr-2" size={16} />,
    },

    {
      key: "Location",
      value: userdata.location,
      icon: <MapPin className="inline mr-2" size={16} />,
    },
    {
      key: "LinkedIn",
      value: userdata.linkedin,
      icon: <Globe className="inline mr-2" size={16} />,
      isLink: true, // Flag to identify it's a link
    },
    {
      key: "Website",
      value: userdata.website,
      icon: <Globe className="inline mr-2" size={16} />,
      isLink: true, // Flag to identify it's a link
    },
    {
      key: "About Me",
      value: userdata.aboutMe,
      icon: <Info className="inline mr-2" size={16} />,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-md rounded-xl shadow-lg bg-white border border-gray-200 transition-transform duration-200 hover:shadow-2xl">
        <CardHeader className="flex flex-col items-center py-8">
          <Image
            src={userdata.profileimg}
            alt={userdata.fullName}
            width={100} height={100}
            className="w-24 h-24 border-4 rounded-full border-indigo-600 mb-4 shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <CardTitle className="text-center text-3xl font-extrabold text-[#243460]">
            {userdata.fullName}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          {userInfo.map(
            ({ key, value, icon, isLink }, index) =>
              value && (
                <div
                  className="mb-4 flex flex-wrap md:flex-nowrap space-x-2"
                  key={index}
                >
                  <span className="font-semibold text-[#243460] text-sm lg:text-lg inline-flex items-center md:w-40">
                    {icon} {key}
                  </span>
                  {isLink ? (
                    <Link
                      href={value.startsWith("http") ? value : `https://${value}`}
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
        </CardContent>
        <CardFooter className="flex justify-center py-4">
          <Button
            onClick={() => (window.location.href = "/jobseeker/profile/edit")}
            className="w-full bg-[#243460] text-white hover:bg-[#3d5af1] rounded-lg shadow-md transition duration-200"
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileCard;
