import Image from "next/image";

import JobSearchBar from "./components/hero";
import NavBar from "./components/header";
import Footer from "./components/footer";
import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";

export default async function Home() {
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


  return (
    <div className="container">
      <NavBar data={data} />
      <JobSearchBar jobPosts={jobPosts} />
      <Footer />
    </div>
  );
}
