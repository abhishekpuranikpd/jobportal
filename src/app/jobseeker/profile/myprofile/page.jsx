import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";
import React from "react";
import ProfileCard from "../edit/profilecard";


const MyProfilePage = async () => {
  const user = await getSession();
  const userdata = await db.Jobseeker.findFirst({
    where: { email: user.email },
  });

  return (
    <>
     <ProfileCard userdata={userdata}/>
    </>
  );
};

export default MyProfilePage;
