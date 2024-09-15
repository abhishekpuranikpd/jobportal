"use client";
import React from "react";
import {

  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  return (
<>
<div className="flex min-h-screen flex-col md:mt-10 px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full max-w-2xl">
    <h2 className="text-center text-2xl font-bold tracking-tight text-[#243460]">Create your account</h2>
  </div>

  <div className="mt-10 mx-auto sm:w-full  max-w-2xl">
    <form className="space-y-2 w-full " action="#" method="POST">
     <div className=" w-full gap-2 flex flex-wrap md:flex-nowrap ">
      {/* Full Name */}
      <div className="md:w-1/2 w-full">
        <label htmlFor="full-name" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Full Name</label>
        <div className="mt-2">
          <input id="full-name" name="full-name" type="text" placeholder="Enter your full name" required className="block w-full pl-2   rounded-xl border-0 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      {/* Email */}
      <div className="md:w-1/2 w-full">
        <label htmlFor="email" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" placeholder="Enter your email address" required className="block w-full pl-2  rounded-xl border-0 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      </div>
      <div className=" w-full gap-2 flex md:flex-nowrap flex-wrap  ">
      {/* Password */}
      <div className="md:w-1/2 w-full">
        <label htmlFor="password" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Password</label>
        <div className="mt-2">
          <input id="password" name="password" type="password" placeholder="Enter a secure password" required className="block w-full pl-2 rounded-xl border-0 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="md:w-1/2 w-full">
        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Confirm Password</label>
        <div className="mt-2">
          <input id="confirm-password" name="confirm-password" type="password" placeholder="Re-enter your password" required className="block w-full pl-2 rounded-xl border-0 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
</div>
<div className=" w-full gap-2 flex flex-wrap md:flex-nowrap ">
      {/* Phone Number (Optional) */}
      <div className="md:w-1/2 w-full">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Phone Number (Optional)</label>
        <div className="mt-2">
          <input id="phone" name="phone" type="text" placeholder="Enter your phone number" className="block w-full pl-2 rounded-xl border-0 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      {/* Upload Resume */}
      <div className="md:w-1/2 w-full">
        <label htmlFor="resume" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Upload Resume</label>
        <div className="mt-2">
          <input id="resume" name="resume" type="file" accept=".pdf, .doc" className="block w-full pl-2 text-[#243460] file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white file:px-3 file:py-1.5 file:font-semibold file:shadow-sm hover:file:bg-indigo-500 sm:text-sm sm:leading-6"/>
        </div>
      </div>
</div>
      {/* Job Preferences */}
      <div>
        <label htmlFor="job-preferences" className="block text-sm font-medium leading-6 pl-2 text-[#243460]">Job Preferences</label>
        <div className="mt-2">
          <select id="job-preferences" name="job-preferences" className="block w-full pl-2 rounded-xl border-0 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option>Choose desired job type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" className="flex w-full mt-10 justify-center rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account? 
      <a href="#" className="font-semibold leading-6 pl-2 text-indigo-600 hover:text-indigo-500">Sign in</a>
    </p>
  </div>
</div>

</>
  );
};

export default RegisterForm;
