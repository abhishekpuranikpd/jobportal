import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";
import React from "react";
import SavedJobs from "../components/savedjobsclient";

const SavedJobsPage = async () => {
  const jobseeker = await getSession();

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
  const data = await db.SavedJob.findMany({
    where: { jobseekerId: jobseekerid },
    include: {
      job: true, // Include job details
    },
  });

  return (
    <>
      <SavedJobs  data={data} />
    </>
  );
};

export default SavedJobsPage;
