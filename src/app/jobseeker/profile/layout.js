import Header from "../components/header";
import { db } from "@/lib/db";
import Sidebar from "../components/supersidebar";
import { getSession } from "@/lib/jobseekerauth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Super Admin",
  description: "",
};

export default async function SuperAdminLayout({ children }) {
  const user = await getSession();

  if (!user) {
    redirect("/jobseeker/login");
  }
  return (
    <>
      <div>
        {" "}
        <Header name={user.name} id={user.id} email={user.email} />
      </div>{" "}
      <div className="pl-1">
        {" "}
        <Sidebar />
      </div>
      <div className="ml-[10px]">{children}</div>
    </>
  );
}
