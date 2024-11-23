import { db } from "@/lib/db";
import React from "react";
import Profileclient from "../components/profileclient";
import ProfileCard from "@/app/jobseeker/profile/edit/profilecard";

const Employerpage = async ({ params }) => {
  const jobseekerid = params.jobseekerid;

  // Fetch jobseeker data along with resumes
  const data = await db.Jobseeker.findFirst({
    where: {
      id: jobseekerid,
    },
    include: {
      resumes: true, // This includes resumes related to the jobseeker
    },
  });
  const resume = await db.Resume.findMany({
    where :{ jobseekerId : data.id}
  })



  return (
    <>
      <Profileclient data={data} />
   
    </>
  );
};

export default Employerpage;
