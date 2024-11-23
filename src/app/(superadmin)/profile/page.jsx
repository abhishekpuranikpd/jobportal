import React from "react";
import { getCurrentUser } from "../../../lib/session";
import { db } from "../../../lib/db";
import EmployerJobTable from "../components/employersearch";
import MetricsChart from "../components/MetricCharts";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  const userData = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
    },
  });

  const { role, permissions } = userData;

  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));

  const metrics = await db.$transaction([
    db.job.count(),
    db.job.count({ where: { createdAt: { gte: todayStart } } }),
    db.job.count({ where: { jobstatus: "APPROVED" } }),
    db.job.count({ where: { jobstatus: "REJECTED" } }),
    db.application.count(),
    db.application.count({ where: { status: "REJECTED" } }),
    db.application.count({ where: { status: "SHORTLISTED" } }),
    db.application.count({ where: { appliedAt: { gte: todayStart } } }),
    db.job.count({
      where: { jobstatus: "APPROVED", createdAt: { gte: todayStart } },
    }),
    db.job.count({
      where: { jobstatus: "REJECTED", createdAt: { gte: todayStart } },
    }),
  ]);

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

  const filterMetricsBasedOnPermissions = () => {
    const filteredMetrics = {};

    if (role === "SUPERADMIN") {
      return metricsData;
    }

    if (permissions.includes(Permission.MANAGE_JOB)) {
      filteredMetrics.totalJobs = totalJobs;
      filteredMetrics.todayJobs = todayJobs;
      filteredMetrics.approvedJobs = approvedJobs;
      filteredMetrics.rejectedJobs = rejectedJobs;
    }

    if (permissions.includes(Permission.MANAGE_JOBSEEKER)) {
      filteredMetrics.totalApplications = totalApplications;
      filteredMetrics.rejectedApplications = rejectedApplications;
      filteredMetrics.shortlistedApplications = shortlistedApplications;
      filteredMetrics.todayApplications = todayApplications;
    }

    if (permissions.includes(Permission.VIEW_ANALYTICS)) {
      filteredMetrics.todayApprovedJobs = todayApprovedJobs;
      filteredMetrics.todayRejectedJobs = todayRejectedJobs;
    }

    return filteredMetrics;
  };

  const filteredMetrics = filterMetricsBasedOnPermissions();

  return (
    <div className="grid grid-cols-1 p-6 lg:mt-12 md:p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(filteredMetrics).map(([label, value]) => {
            const colorMap = {
              totalJobs: "bg-blue-200",
              todayJobs: "bg-green-200",
              approvedJobs: "bg-yellow-200",
              rejectedJobs: "bg-red-200",
              totalApplications: "bg-indigo-200",
              rejectedApplications: "bg-pink-200",
              shortlistedApplications: "bg-orange-200",
              todayApplications: "bg-teal-200",
              todayApprovedJobs: "bg-purple-200",
              todayRejectedJobs: "bg-gray-300",
            };

            return (
              <div
                key={label}
                className={`${colorMap[label]} p-5 rounded-lg shadow-md transition-transform transform hover:scale-105`}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {label.replace(/_/g, " ")}
                </h2>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 md:w-full flex justify-center w-[300px] overflow-x-auto items-center">
          <MetricsChart metrics={filteredMetrics} /> 
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


const Permission = {
  MANAGE_EMPLOYER: "MANAGE_EMPLOYER",
  MANAGE_JOB: "MANAGE_JOB",
  MANAGE_JOBSEEKER: "MANAGE_JOBSEEKER",
  MANAGE_ADMIN: "MANAGE_ADMIN",
  VIEW_EMPLOYER: "VIEW_EMPLOYER",
  VIEW_JOB: "VIEW_JOB",
  VIEW_JOBSEEKER: "VIEW_JOBSEEKER",
  VIEW_ANALYTICS: "VIEW_ANALYTICS",
};
