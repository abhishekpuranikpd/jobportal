import React from 'react'
import ResumeBuilderForm from './components/resumebuilderform'
import { getSession } from '@/lib/jobseekerauth';
import { db } from '@/lib/db';

const page =async () => {
  try {
    const usermail = await getSession();
    if (!usermail || !usermail.email) {
      throw new Error("User not authenticated");
    }

    const jobseeker = await db.Jobseeker.findUnique({
      where: { email: usermail.email },
    });
    if (!jobseeker) {
      throw new Error("Jobseeker not found");
    }

    const data = await db.AIResumeGeneratedData.findFirst({
      where: { jobseekerId: jobseeker.id },
    });
    
    if (!data) {
      throw new Error("Resume data not found");
    }


    return (
  <><ResumeBuilderForm data={data}/></>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading resume data: {error.message}</div>;
  }
}

export default page