import React from "react";
import { db } from "@/lib/db";
import JobsInfo from "../components/singlejobview";
import { getSession } from "@/lib/jobseekerauth";
import NavBar from "@/app/components/header";
import Mainjobclient from "../components/mainjobclient";
import Companysimilarjobs from "../components/companyjobs";

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

  const similardata = await db.Employer.findFirst({
    where :{id : data.employer.id},
    include: {
      jobs: true,
    },
  });

const CompanyName = similardata.name
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        {/* Job Information Section */}
        <JobsInfo job={data} user={user} />

        {/* More Jobs Section */}
        <div className="mt-8">
          <h1 className="text-2xl flex justify-center text-center items-center font-bold mb-4">
            More Jobs From this Employer
          </h1>
          <Companysimilarjobs jobs={similardata.jobs} CompanyName={CompanyName}/>
        </div>
      </div>
    </>
  );
};

export default SingleViewJob;
