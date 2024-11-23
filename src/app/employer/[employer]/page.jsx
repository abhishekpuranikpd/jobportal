import React from 'react';
import { db } from '../../../lib/db';
import EmployerView from '../components/employerview';

const Employerpage = async ({ params }) => {
  // Confirm params and employer are being passed
  if (!params || !params.employer) {
    return <div>Error: Employer ID is missing.</div>;
  }

  const companyid = params.employer;

  const data = await db.Employer.findFirst({
    where: { id: companyid }, include: {
      jobs: true,
    },
  });

  if (!data) {
    return <div>Employer not found.</div>;
  }

  return (
    <div>
     <EmployerView data={data}/>
    </div>
  );
};

export default Employerpage;
