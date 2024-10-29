import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";
import React from "react";
import ProfileEditForm from "../components/profileedit";
import ProfileCard from "./profilecard";

const MyProfilePage = async () => {
  const user = await getSession();
  const userdata = await db.Jobseeker.findFirst({
    where: { email: user.email },
  });

  return (
    <>
     <ProfileEditForm userdata={userdata}/>
    </>
  );
};

export default MyProfilePage;
