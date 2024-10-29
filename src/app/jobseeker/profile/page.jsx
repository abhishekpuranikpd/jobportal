import React from "react";
import { db } from "../../../lib/db";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/jobseekerauth";
import ProfileCard from "./edit/profilecard";

const ProfilePage = async () => {
  const user = await getSession();

  // Ensure user is defined before proceeding
  if (!user || !user.email) {
    redirect("/jobseeker/login");
    return null;
  }

  const userdata = await db.Jobseeker.findFirst({
    where: { email: user.email },
  });

  return (
    <>
      <ProfileCard userdata={userdata} /> 
    </>
  );
};

export default ProfilePage;
