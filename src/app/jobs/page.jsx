import { db } from "@/lib/db";
import React from "react";
import Mainjobclient from "./components/mainjobclient";
import { getSession } from "@/lib/jobseekerauth";
import NavBar from "../components/header";

const MainJob = async () => {
  // Fetch the session to get the user's email
  const session = await getSession();
  const sessionmail = session?.email;
  let data = null;

  if (sessionmail) {
    // Check if the logged-in user is a Jobseeker
    const jobseekerData = await db.Jobseeker.findFirst({
      where: { email: sessionmail },
    });

    if (jobseekerData) {
      data = {
        ...jobseekerData,
      };
    } else {
      // If no Jobseeker found, check if the user is an Employer
      const employerData = await db.Employer.findUnique({
        where: { email: sessionmail },
      });

      if (employerData) {
        data = {
          ...employerData,
        };
      }
    }
  }

  // Fetch the jobseeker's details to check the category
  const user = await db.Jobseeker.findFirst({
    where: { email: session?.email },
  });

  let jobs = [];

  // Log the jobseeker and category if available
  if (user) {
    console.log("Jobseeker:", user); // Log jobseeker data
    console.log("Category:", user.category); // Log jobseeker category
  } else {
    console.log("No jobseeker found for the email:", session?.email);
  }

  // If no session found, fetch all jobs
  if (!session) {
    jobs = await db.Job.findMany({
      include: {
        employer: true,
      },
    });
  } else {
    const userEmail = session.email;

    // Fetch the jobseeker's details
    const jobseeker = await db.jobseeker.findUnique({
      where: { email: userEmail },
    });

    // Fetch the employer's details to check their role
    const employer = await db.Employer.findUnique({
      where: { email: userEmail },
    });

    // If an employer is logged in, fetch all jobs
    if (employer) {
      jobs = await db.Job.findMany({
        include: {
          employer: true,
        },
      });
    } else if (!jobseeker || !jobseeker.category) {
      // If jobseeker not found or category is not set
      console.log("Jobseeker is either not found or category is not set");
      return <div>No jobseeker found or category not set.</div>;
    } else {
      console.log("Fetching jobs for category:", jobseeker.category); // Log the category used to fetch jobs

      // Fetch jobs that match the jobseeker's category
      jobs = await db.Job.findMany({
        where: {
          category: jobseeker.category,
        },
        include: {
          employer: true,
        },
      });
    }
  }

  // Log the fetched jobs
  console.log("Fetched Jobs:", jobs); // Log the jobs

  // Check if jobs were found and render accordingly
  if (!jobs || jobs.length === 0) {
    const message = session 
      ? "No jobs available in your category at the moment."
      : "No jobs available at the moment.";
      
    return <div>{message}</div>;
  }

  return (
    <>
      <NavBar data={data} />
      <div className="mt-16">
        <Mainjobclient jobs={jobs} user={user} />
      </div>
    </>
  );
};

export default MainJob;