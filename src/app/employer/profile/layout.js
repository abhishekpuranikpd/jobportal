import Header from "../components/header";
import { db } from "@/lib/db";
import Sidebar from "../components/supersidebar";
import { getSession } from "@/lib/jobseekerauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Employer",
  description: "Peperk.in",
};

export default async function SuperAdminLayout({ children }) {
  const user = await getSession();

  if (!user) {
    redirect("/employer/login");
  }

  const userdata = await db.Employer.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!userdata) {
    redirect("/jobseeker/login");
  }

  return (
    <>
      <div className="">
        <Header name={userdata.name} id={userdata.id} email={userdata.email} />
      </div>
      <div className="flex">
        <div className="pl-1 pt-40">
          <Sidebar name={userdata.name} />
        </div>
        <div className="lg:ml-[300px] mt-8 flex-1">
          {children}
        </div>
      </div>
    </>
  );
}
