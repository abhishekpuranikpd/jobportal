import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Sidebar from "./components/supersidebar";
import Header from "./components/navbar";

export const metadata = {
  title: "Super Admin",
  description: "Peperk.in",
};

export default async function SuperAdminLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userData = await db.user.findUnique({
    where: {
      id: user.id,}
 
  });

  const sidebarData = {
    role: userData.role,
    permissions: userData.permissions.map((perm) => perm.name),
  };

  return (
    <>
      <div className="">
        <Header userData={userData} />
      </div>
      <div className="flex">
        <div className="pl-1 pt-40">
          <Sidebar data={sidebarData} />
        </div>
        <div className="lg:ml-[300px] mt-8 flex-1">{children}</div>
      </div>
    </>
  );
}
