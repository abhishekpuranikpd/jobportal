import React from 'react';
import { db } from '../../../lib/db';

const Employerpage = async ({ params }) => {
  // Confirm params and employer are being passed
  if (!params || !params.employer) {
    return <div>Error: Employer ID is missing.</div>;
  }

  const companyid = params.employer;

  const data = await db.Employer.findFirst({
    where: { id: companyid },
  });

  if (!data) {
    return <div>Employer not found.</div>;
  }

  return (
    <div>
      <h1>Employer: {data.name}</h1>
      <p>Email: {data.email}</p>
      {/* Render additional employer details */}
    </div>
  );
};

export default Employerpage;
