
import Header from "./components/header";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import Sidebar from "./components/supersidebar";

export const metadata = {
  title: "Super Admin",
  description: "",
};
const user = await getCurrentUser();

if (!user) {
  redirect('/auth/login');
}

const userData = await db.user.findUnique({
  where: {
    id: user.id,
  },
});

const {id, name, email } = userData;

export default function SuperAdminLayout({ children }) {
  return <>
  <div>        <Header name={name} id={id} email={email}  /></div> <div className="pl-1">   <Sidebar /></div>
  <div className="ml-[10px]">{children}</div></>;
}
