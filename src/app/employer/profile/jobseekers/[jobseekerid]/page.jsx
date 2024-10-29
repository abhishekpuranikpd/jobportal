import { db } from '@/lib/db';
import React from 'react';
import Profileclient from '../components/profileclient';

const Employerpage = async ({ params }) => {
  const jobseekerid = params.employer;
  const data = await db.Jobseeker.findFirst({
    where: {
      id: jobseekerid,
    },
  });


  return (
<><Profileclient data={data}/></>
    
  );
};

export default Employerpage;
