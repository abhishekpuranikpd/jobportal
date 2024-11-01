import React from 'react'
import EmployerJobTable from '../../components/employersearch'
import { db } from '@/lib/db';

const page = async() => {
      // Fetch employer job data
  const employerJobData = await db.Employer.findMany({
    select: {
      id: true,
      name: true,
      jobs: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          application: {
            select: { status: true },
          },
        },
      },
    },
  });

  // Prepare the employer jobs data with counts
  // Prepare the employer jobs data with counts
  const employerJobsWithCounts = employerJobData.map((employer) => ({
    employerId: employer.id,
    employerName: employer.name,
    jobs: employer.jobs.map((job) => {
      const appliedCount = job.application.length;
      const shortlistedCount = job.application.filter(
        (app) => app.status === "SHORTLISTED"
      ).length;
      const rejectedCount = job.application.filter(
        (app) => app.status === "REJECTED"
      ).length;

      const postedDate = job.createdAt; // Get the posted date

      return {
        jobTitle: job.title,
        appliedCount,
        shortlistedCount,
        rejectedCount,
        postedDate,
      };
    }),
  }));
  return (
    <div><EmployerJobTable employerJobsWithCounts={employerJobsWithCounts}/></div>
  )
}

export default page