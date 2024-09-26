import { getCurrentUser } from "../../lib/session"
import Link from "next/link"

import { redirect } from "next/navigation"
import AuthNavBar from "../components/authheader"



export default async function AuthLayout({ children }) {
  const user = await getCurrentUser()

  if (user) {
    redirect("/profile")
  }
 
  return (
    <>
      <div><AuthNavBar/></div>
      <div className="mt-[20px]">{children}</div>
    </>
  )
}