"use client";
import React from "react";
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
  Globe,
  Info,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Companysimilarjobs from "@/app/jobs/components/companyjobs";

const EmployerProfileCard = ({ data }) => {
  const CompanyName = data.name
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

  return (
    <>
    <div className="flex justify-center md:mt-16 items-center  p-2 bg-gray-50">
      <Card className="w-full max-w-2xl rounded-xl shadow-lg bg-white border border-gray-200 transition-transform duration-200 hover:shadow-2xl">
        <CardHeader className="flex flex-col items-center py-8">
          <Image
            src={data.companyLogo || "/placeholder-logo.png"}
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
          {/* Employer Info */}
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

          {/* About the Company Section */}
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
      </Card>
    
    </div>
        {/* More Jobs Section */}
        <div className="mt-8">
          <h1 className="text-2xl flex justify-center text-center items-center font-bold mb-4">
            More Jobs From this Employer
          </h1>
          <Companysimilarjobs jobs={data.jobs} CompanyName={CompanyName}/>
        </div>
       </>
  );
};

export default EmployerProfileCard;
