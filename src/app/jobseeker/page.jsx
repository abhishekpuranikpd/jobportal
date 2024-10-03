// src/app/components/JobSeekersServer.jsx
import { db } from '@/lib/db';
import Alljobseekers from './components/alljobseekers';

const JobSeekersServer = async () => {
  const fetchedJobSeekers = await db.Jobseeker.findMany();
  return (
 <>
 <Alljobseekers fetchedJobSeekers={fetchedJobSeekers}/>
 </>
  );
};

export default JobSeekersServer;
