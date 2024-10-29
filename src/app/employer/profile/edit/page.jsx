import { db } from "@/lib/db";
import React from "react";
import EmployerEditClient from "../../components/employeedit";
import { getSession } from "@/lib/jobseekerauth";

const EmployerEditPage = async () => {
  const session = await getSession()
  const useremail = session.email;
  const data = await db.Employer.findUnique({
    where: { email:useremail},
  });


  return (
    <>
      <EmployerEditClient data={data} />
    </>
  );
};

export default EmployerEditPage;
