import React from "react";
import RegisterComponent from "../components/compo";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Register = () => {
  const user = getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <RegisterComponent />
    </>
  );
};

export default Register;
