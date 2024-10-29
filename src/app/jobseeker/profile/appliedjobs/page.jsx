import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";
import React from "react";
import AppliedJobs from "../components/appliedclient";

const AppliedJobsPage = async () => {
  const jobseeker = await getSession();

  // Check if jobseeker is null or doesn't have an email
  if (!jobseeker || !jobseeker.email) {
    return <div>No jobseeker found or not logged in</div>;
  }

  // Fetch the current jobseeker from the database using the session email
  const currentuser = await db.jobseeker.findFirst({
    where: { email: jobseeker.email },
  });

  // If no user is found, return early
  if (!currentuser) {
    return <div>No jobseeker found</div>;
  }

  const jobseekerid = currentuser.id;

  // Fetch applied jobs, with optional employer inclusion
  const data = await db.Application.findMany({
    where: { jobseekerId: jobseekerid },
    include: {
      job: true, // Include job details
      employer: true, // Optionally include employer details
    },
  });

  return (
    <>
      <AppliedJobs data={data} />
    </>
  );
};

export default AppliedJobsPage;
