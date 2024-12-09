import React from 'react'
import ResumeBuilderForm from './components/resumebuilderform'
import { db } from '@/lib/db';
import { getSession } from '@/lib/jobseekerauth';
import NavBar from '../components/header';
import Footer from '../components/footer';

const page =async () => {
  const jobPosts = await db.Job.findMany({
    include: { employer: true },
  });
  
  const session = await getSession();
  const sessionmail = session?.email;
  let data = null;

  if (sessionmail) {
    // Check if the logged-in user is a Jobseeker
    const jobseekerData = await db.Jobseeker.findFirst({
      where: { email: sessionmail },
    });

    if (jobseekerData) {
      data = { ...jobseekerData };  // Pass jobseeker data to NavBar
    } else {
      // If no Jobseeker found, check if the user is an Employer
      const employerData = await db.Employer.findUnique({
        where: { email: sessionmail },
      });

      if (employerData) {
        data = { ...employerData };  // Pass employer data to NavBar
      }
    }
  }

  return (
      <div>   
        
        
      <NavBar data={data} />  {/* Pass data (user info) to NavBar */}
      <ResumeBuilderForm/> <Footer/></div>
  )
}

export default page