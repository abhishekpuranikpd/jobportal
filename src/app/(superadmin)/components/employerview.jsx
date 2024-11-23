"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  Briefcase,
  Globe,
  Info,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EmployerProfileCard = ({ data }) => {
  const [status, setStatus] = useState(data.approvalStatus || "ACTIVE"); // Set default status to ACTIVE
  const [loading, setLoading] = useState(false);

  const companyInfo = [
    {
      key: "Email",
      value: data.email,
      icon: <Mail className="inline mr-2" size={16} />,
    },
    {
      key: "Phone",
      value: data.phoneNumber,
      icon: <Phone className="inline mr-2" size={16} />,
    },
    {
      key: "Industry",
      value: data.industry,
      icon: <Briefcase className="inline mr-2" size={16} />,
    },
    {
      key: "Company Size",
      value: data.companySize,
      icon: <Info className="inline mr-2" size={16} />,
    },
    {
      key: "Location",
      value: data.location,
      icon: <MapPin className="inline mr-2" size={16} />,
    },
    {
      key: "Website",
      value: data.companyWebsite,
      icon: <Globe className="inline mr-2" size={16} />,
      isLink: true,
    },
    {
      key: "About Company",
      value: data.aboutcompany,
      icon: <Info className="inline mr-2" size={16} />,
    },
  ];

  // Handle the status change (approve or reject)
  const handleSubmitStatus = async (action) => {
    const optimisticStatus =
      action === "approve"
        ? "APPROVED"
        : action === "reject"
        ? "REJECTED"
        : "PENDING";

    // Set loading state to true when an action is being performed
    setLoading(true);

    // Optimistic UI update: Update the status without waiting for the backend response
    setStatus(optimisticStatus);

    try {
      const response = await fetch(`/api/employer/${data.id}/approvalstatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedData = await response.json();
      setStatus(updatedData.status); // Update the status based on the response
    } catch (error) {
      console.error("Error updating employer status:", error);
      alert("Failed to update status");

      // Revert to the previous status if there's an error
      setStatus(data.status);
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };

  return (
    <div className="flex justify-center md:mt-16 items-center p-2 bg-gray-50">
      <Card className="w-full max-w-2xl rounded-xl shadow-lg bg-white border border-gray-200 transition-transform duration-200 hover:shadow-2xl">
        <CardHeader className="flex flex-col items-center py-8">
          <Image
            src={data.companyLogo || ""}
            alt={data.name}
            width={120}
            height={120}
            className="w-28 h-28 border-4 rounded-full border-indigo-600 mb-4 shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
          <CardTitle className="text-center text-3xl font-extrabold text-[#243460]">
            {data.name}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            {data.industry || "Industry not provided"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {companyInfo.map(
            ({ key, value, icon, isLink }, index) =>
              value && (
                <div
                  className="flex items-start space-x-2 flex-wrap text-justify"
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
                      {key === "Website" ? "Visit Website" : "More Info"}
                    </Link>
                  ) : (
                    <span className="text-gray-700 text-sm lg:text-base">
                      : {value}
                    </span>
                  )}
                </div>
              )
          )}

          {data.aboutcompany && (
            <div className="mb-4">
              <h3 className="font-semibold text-[#243460] text-sm lg:text-lg mb-2 flex items-center">
                About the Company
              </h3>
              <p className="text-gray-700 text-sm lg:text-base">
                {data.aboutcompany}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 p-4">
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => handleSubmitStatus("approve")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Please Wait" : "Approve"}
            </button>
            <button
              onClick={() => handleSubmitStatus("reject")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={loading}
            >
              {loading ? "Please Wait" : "Reject"}
            </button>
          </div>
        </CardFooter>
        <div className="mt-4 text-center">
          <span className="text-xl font-semibold text-[#243460]">
            Status: {status}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default EmployerProfileCard;
