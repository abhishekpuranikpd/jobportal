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

const LoginForm = () => {
  return (
<><div className="flex min-h-screen flex-col mt-20 px-6   lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <Image className="mx-auto h-10 w-auto" src="" alt="Your Company"/> */}
    <h2 className=" text-center text-2xl font-bold tracking-tight text-[#243460]">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-2" action="#" method="POST">
      <div>
        <label for="email" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autocomplete="email"
           required className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 pl-4 text-[#243460]">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" 
          required className="block w-full rounded-xl border-0 pl-2 py-1.5 text-[#243460] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full mt-10 justify-center rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 pl-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not having an account?
      <a href="#" className="font-semibold leading-6 pl-4 text-indigo-600 hover:text-indigo-500">Register</a>
    </p>
  </div>
</div></>
  );
};

export default LoginForm;
