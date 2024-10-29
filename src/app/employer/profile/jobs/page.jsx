import React from "react";
import { db } from "@/lib/db";
import JobsList from "./components/jobsclient";
import { getSession } from "@/lib/jobseekerauth";

const page = async () => {
  const user = await getSession();
  const data = await db.Employer.findUnique({
    where: { email: user.email },
    include: {
      jobs: true,
    },
  });
  return (
    <>
      <JobsList jobs={data.jobs} employer={data} />
    </>
  );
};

export default page;
