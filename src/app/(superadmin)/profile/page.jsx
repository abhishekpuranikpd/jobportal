import React from "react";
import { getCurrentUser } from "../../../lib/session";
import { db } from "../../../lib/db";
import EmployerJobTable from "../components/employersearch";
import MetricsChart from "../components/MetricCharts";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  // Fetch user data and metrics in a single query if possible
  const userData = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      // Include other fields if necessary
    },
  });

  // Set today's date start for filtering today's records
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

  // Fetch metrics for Superadmin view
  const metrics = await db.$transaction([
    db.job.count(), // Total jobs
    db.job.count({
      where: { createdAt: { gte: todayStart } }, // Today's jobs
    }),
    db.job.count({ where: { jobstatus: "APPROVED" } }),
    db.job.count({ where: { jobstatus: "REJECTED" } }),
    db.application.count(), // Total applications
    db.application.count({ where: { status: "REJECTED" } }),
    db.application.count({ where: { status: "SHORTLISTED" } }),
    db.application.count({ where: { appliedAt: { gte: todayStart } } }),
    db.job.count({
      where: { jobstatus: "APPROVED", createdAt: { gte: todayStart } }, // Today's approved jobs
    }),
    db.job.count({
      where: { jobstatus: "REJECTED", createdAt: { gte: todayStart } }, // Today's rejected jobs
    }),
  ]);

  // Destructure metrics for better readability
  const [
    totalJobs,
    todayJobs,
    approvedJobs,
    rejectedJobs,
    totalApplications,
    rejectedApplications,
    shortlistedApplications,
    todayApplications,
    todayApprovedJobs,
    todayRejectedJobs,
  ] = metrics;

  const metricsData = {
    totalJobs,
    todayJobs,
    approvedJobs,
    rejectedJobs,
    totalApplications,
    rejectedApplications,
    shortlistedApplications,
    todayApplications,
    todayApprovedJobs,
    todayRejectedJobs,
  };

  return (
    <>
      {/* Main Content */}
      <div className="grid grid-cols-1 p-6 lg:mt-12 md:p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Metrics Display */}
            {[ 
              { label: "Total Jobs", value: totalJobs, color: "bg-blue-200" },
              { label: "Today's Jobs", value: todayJobs, color: "bg-green-200" },
              { label: "Approved Jobs", value: approvedJobs, color: "bg-yellow-200" },
              { label: "Rejected Jobs", value: rejectedJobs, color: "bg-red-200" },
              { label: "Total Applications", value: totalApplications, color: "bg-indigo-200" },
              { label: "Rejected Applications", value: rejectedApplications, color: "bg-pink-200" },
              { label: "Shortlisted Applications", value: shortlistedApplications, color: "bg-orange-200" },
              { label: "Today's Applications", value: todayApplications, color: "bg-teal-200" },
              { label: "Today's Approved Jobs", value: todayApprovedJobs, color: "bg-purple-200" },
              { label: "Today's Rejected Jobs", value: todayRejectedJobs, color: "bg-gray-300" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`${color} p-5 rounded-lg shadow-md transition-transform transform hover:scale-105`}
              >
                <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Add the chart here */}
          <div className="mt-8 md:w-full flex justify-center w-[300px] overflow-x-auto items-center ">
            <MetricsChart metrics={metricsData}  />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
