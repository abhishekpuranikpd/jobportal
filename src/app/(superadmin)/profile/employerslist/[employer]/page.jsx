import React from "react";
import EmployerProfileCard from "@/app/(superadmin)/components/employerview";
import { db } from "@/lib/db";

const Employerpage = async ({ params }) => {
  // Confirm params and employer are being passed
  if (!params || !params.employer) {
    return <div>Error: Employer ID is missing.</div>;
  }

  const companyid = params.employer;

  const data = await db.Employer.findFirst({
    where: { id: companyid },
    include: {
      jobs: true,
    },
  });

  if (!data) {
    return <div>Employer not found.</div>;
  }

  return (
    <div>
      <EmployerProfileCard data={data} />
    </div>
  );
};

export default Employerpage;
