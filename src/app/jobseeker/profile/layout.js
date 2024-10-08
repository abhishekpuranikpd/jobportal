import Header from "../components/header";
import { db } from "@/lib/db";
import Sidebar from "../components/supersidebar";
import { getSession } from "@/lib/jobseekerauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Jobseeker Admin",
  description: "",
};

export default async function SuperAdminLayout({ children }) {
  const user = await getSession();

  // Redirect if user is not authenticated
  if (!user) {
    redirect("/jobseeker/login");
  }

  // Fetch user data from the database
  const userdata = await db.Jobseeker.findFirst({
    where: {
      email: user.email,
    },
  });

  // Ensure userdata exists before accessing its properties
  if (!userdata) {
    redirect("/jobseeker/login");
  }

  return (
    <>
      <Header name={userdata.name} id={userdata.id} email={userdata.email} />
      <div className="pl-1">
        <Sidebar name={userdata.name} />
      </div>
      <div className="ml-[10px]">
        {children}
      </div>
    </>
  );
}
