import React from 'react';
import DraftJobs from '../components/draftjobs'; // Ensure this component is set to display draft jobs
import { db } from '@/lib/db'; // DB connection
import { getSession } from '@/lib/jobseekerauth'; // Authentication

const Page = async () => {
  const user = await getSession();
const usermail = user.email
  // If no user is found, redirect to login page
  if (!user) {
    return redirect("/employer/login");
  }

  const employerData = await db.employer.findUnique({
    where: {
      email: usermail
    },
    include: {
      draftSavedjobs: true,  // Correct field name
      jobs: true,  // Include other relations if needed
      applications: true
    }
  });
  

  // If no employer is found or no drafts exist, handle it
  if (!employerData || employerData.draftSavedjobs.length === 0) {
    return <p>No drafts found for this employer.</p>;
  }

  // Render the DraftJobs component with the fetched drafts
  return (
    <>
      <DraftJobs employer={employerData} jobs={employerData.draftSavedjobs} />
    </>
  );
};

export default Page;
