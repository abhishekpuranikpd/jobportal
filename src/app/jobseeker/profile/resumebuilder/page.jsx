import React from 'react';
import ResumeBuilderForm from './components/resumebuilderform';
import { getSession } from '@/lib/jobseekerauth';
import { db } from '@/lib/db';

const page = async () => {
  let data = null; // Default to null in case no data is found.

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

    data = await db.AIResumeGeneratedData.findFirst({
      where: { jobseekerId: jobseeker.id },
    });

    // If data is null, we allow the fallback rendering.
  } catch (error) {
    console.error("Error loading resume data:", error);
  }

  // Render the form regardless of whether data exists or not.
  return (
    <div>
      <ResumeBuilderForm data={data} />
    </div>
  );
};

export default page;
