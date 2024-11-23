import React from "react";
import { db } from "@/lib/db";
import JobApprovalStatusClient from "../../components/jobapprovalclient";

const page = async () => {
  const jobsdata = await db.Job.findMany({
    include: { employer: true },
  });

  return (
    <div>
      <JobApprovalStatusClient jobsdata={jobsdata} />
    </div>
  );
};

export default page;
