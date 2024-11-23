import React from "react";
import ResumeuploadClient from "../components/resumeupload";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getSession } from "@/lib/jobseekerauth";
import { db } from "@/lib/db";

const ResumeUploadPage = async () => {
  const user = await getSession();
  const userdata = await db.Jobseeker.findFirst({
    where: { email: user.email },
    include : {resumes :true}
  });
  return (
    <div>
      <ResumeuploadClient userdata={userdata} />{" "}
  
    </div>
  );
};

export default ResumeUploadPage;
