import React from "react";
import { db } from "../../../lib/db";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/jobseekerauth";
import DashboardClient from "./components/dashboardclient";

// Helper function to get today's date
const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight
  return today;
};

const ProfilePage = async () => {
  const user = await getSession();

  if (!user) {
    redirect("/employer/login");
    return null;
  }

  const usermail = user.email;
  const userdata = await db.Employer.findUnique({ where: { email: usermail } });

  // Check if employer data exists
  if (!userdata) {
    return <p>User not found</p>;
  }

  // 1. Count applications received today for the employer
  const applicationCountToday = await db.Application.count({
    where: {
      employerId: userdata.id,
      appliedAt: {
        gte: getToday(), // Applications from midnight today onward
      },
    },
  });

  // 2. Get job-wise application counts
  const jobApplications = await db.Application.groupBy({
    by: ["jobId"],
    _count: { jobId: true },
    where: {
      employerId: userdata.id,
    },
  });

  // 3. Retrieve job titles for each jobId for display
  const jobIds = jobApplications.map((app) => app.jobId);
  const jobs = await db.Job.findMany({
    where: { id: { in: jobIds } },
    select: { id: true, title: true },
  });

  // Map job titles to the job applications count
  const jobApplicationCounts = jobApplications.map((app) => {
    const job = jobs.find((job) => job.id === app.jobId);
    return {
      jobId: app.jobId,
      jobTitle: job?.title || "Untitled Job",
      count: app._count.jobId,
    };
  });

  return (
    // <div className="min-h-screen justify-center items-center bg-gray-100 flex">
    //   {/* Main content */}
    //   <div className="ml-64 flex-grow">
    //     {user ? (
    //       <UserProfile user={user.id} name={user.name} email={user.email} />
    //     ) : (
    //       <p>Loading user data...</p>
    //     )}
    //   </div>

    //   {/* Display total applications received today */}
    //   <p>Applications Received Today: {applicationCountToday}</p>

    //   {/* Display job-wise application counts */}
    //   <div>
    //     <h2>Job-wise Applications:</h2>
    //     <ul>
    //       {jobApplicationCounts.map((jobApp) => (
    //         <li key={jobApp.jobId}>
    //           {jobApp.jobTitle}: {jobApp.count} applications
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <>
      <DashboardClient
        userData={userdata}
        applicationCountToday={applicationCountToday}
        jobApplicationCounts={jobApplicationCounts}
      />
    </>
  );
};

export default ProfilePage;
