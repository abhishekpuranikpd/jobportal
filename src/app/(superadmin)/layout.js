import Header from "./components/header";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import Sidebar from "./components/supersidebar";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Super Admin",
  description: "",
};

export default async function SuperAdminLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const { id, name, email } = userData;
  return (
    <>
      <div>
        {" "}
        <Header name={name} id={id} email={email} />
      </div>{" "}
      <div className="pl-1">
        {" "}
        <Sidebar  name={name}/>
      </div>
      <div className="ml-[10px]">{children}</div>
    </>
  );
}
