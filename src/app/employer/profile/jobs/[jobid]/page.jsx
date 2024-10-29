import React from 'react';
import { db } from '@/lib/db';
import JobsInfo from '../components/singlejobclient';

const SingleViewJob = async ({ params }) => {
  const id = params.jobid;

  let jobData;
  try {
    jobData = await db.Job.findFirst({
      where: { id },
      include: {
        employer: true,           // Include employer details
        application: {            // Include applications related to the job
          include: {
            jobseeker: true,      // Include jobseeker details for each application
          },
        },
      },
    });

    // Check if jobData is found
    if (!jobData) {
      console.error(`Job with ID ${id} not found.`);
      return <p>Job not found.</p>;
    }

    // Check if employerId is null
    if (!jobData.employerId) {
      console.error("Employer ID is null for job:", jobData);
      return <p>This job does not have a valid employer associated.</p>;
    }

  } catch (error) {
    console.error("Error fetching job data:", error);
    return <p>There was an error fetching the job data. Please try again later.</p>;
  }

  return (
    <>
      <JobsInfo job={jobData} />
   
      
    </>
  );
};

export default SingleViewJob;
