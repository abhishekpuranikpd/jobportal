"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, UserCheck, Briefcase, User } from "lucide-react"; // Import necessary icons for job applications

const DashboardClient = ({
  userData,
  applicationCountToday,
  jobApplicationCounts,
}) => {
  console.log(applicationCountToday);

  // Reverse the job application counts to show the latest first
  const reversedJobApplicationCounts = [...jobApplicationCounts].reverse();

  // Calculate total applications
  const totalApplications = jobApplicationCounts.reduce(
    (total, job) => total + job.count,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center mt-12 p-4 md:p-8">
      {/* First Row: User Profile, Applications Received Today, Total Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-4">
        {/* User Profile Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow p-2 bg-white flex items-center rounded-[15px]">
          <User className="text-blue-500" size={24} /> {/* Icon */}
          <CardHeader className="flex-1 flex flex-col ml-2">
            <CardTitle className="text-sm font-semibold">
              Welcome, {userData.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-gray-700">
            {/* Any other data you want to display can be added here */}
          </CardContent>
        </Card>

        {/* Applications Received Today Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow p-2 bg-white flex items-center rounded-[15px]">
          <Mail className="text-blue-500" size={24} /> {/* Icon */}
          <CardHeader className="flex-1 flex flex-col ml-2">
            <CardTitle className="text-sm font-semibold">
              Applications Received Today
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-gray-700">
            {applicationCountToday}
          </CardContent>
        </Card>

        {/* Total Applications Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow p-2 bg-white flex items-center rounded-[15px]">
          <Briefcase className="text-purple-500" size={24} /> {/* Icon */}
          <CardHeader className="flex-1 flex flex-col ml-2">
            <CardTitle className="text-sm font-semibold">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-gray-700">
            {totalApplications}
          </CardContent>
        </Card>
      </div>

      {/* Job-wise Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {reversedJobApplicationCounts.map((jobApp, index) => (
          <Card
            key={jobApp.jobId}
            className="shadow-md p-4 hover:shadow-lg transition-shadow  bg-white flex items-center rounded-[15px]"
          >
            <Briefcase className="text-purple-500" size={24} /> {/* Icon */}
            <CardHeader className="flex-1 flex flex-col ml-2">
              <CardTitle className="text-sm font-semibold">{`Job ${
                index + 1
              }: ${jobApp.jobTitle}`}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-gray-700">
              {jobApp.count}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardClient;
