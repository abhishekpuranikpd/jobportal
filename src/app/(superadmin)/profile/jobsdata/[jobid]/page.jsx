import React from "react";
import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";
import JobsInfo from "../components/jobview";

const SingleViewJob = async ({ params }) => {
  const id = params.jobid;

  // Attempt to get the session
  const session = await getSession();

  // Fetch user data only if the session exists
  const user = session
    ? await db.Jobseeker.findFirst({
        where: { email: session.email },
        include: { applications: true, savedJob: true },
      })
    : null; // Set user to null if no session

  // Fetch job data regardless of user session
  const data = await db.Job.findFirst({
    where: { id },
    include: {
      employer: true,
    },
  });

  return (
    <>
     
      <div className="container mx-auto px-4 py-6">
        {/* Job Information Section */}
   <JobsInfo job={data}/>
      </div>
    </>
  );
};

export default SingleViewJob;
