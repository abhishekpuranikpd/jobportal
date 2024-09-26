import Header from "../components/header";
import { db } from "@/lib/db";
import Sidebar from "../components/supersidebar";
import { getSession } from "@/lib/jobseekerauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Employer ",
  description: "",
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
      <div>
        {" "}
        <Header name={userdata.name} id={userdata.id} email={userdata.email} />
      </div>{" "}
      <div className="pl-1">
        {" "}
        <Sidebar name={userdata.name} />
      </div>
      <div className="ml-[10px]">{children}</div>
    </>
  );
}
