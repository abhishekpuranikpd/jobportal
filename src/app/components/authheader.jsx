"use client";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { User, Briefcase } from "lucide-react"; // Importing additional icons

const AuthNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container mx-auto fixed start-0 top-0 z-20 w-full mb-10 bg-[#FFFFFF] shadow-sm">
      <div className="mx-auto container flex max-w-screen-xl flex-wrap items-center justify-between py-4">
        <Link href="/">
          <span className="flex cursor-pointer items-center rtl:space-x-reverse">
            <span className="self-center text-2xl font-bold text-[#243460]">
              Job-Portal
            </span>
          </span>
        </Link>
        <div className="hidden md:flex space-x-6 rtl:space-x-reverse md:order-2">
     
      
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="cursor-pointer flex items-center justify-center text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                For Employers <ChevronDown className="h-5 w-4 mt-1" color="#243460" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/employer/login">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
   
                    Login
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/employer/register">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
 
                    Register
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="cursor-pointer flex items-center justify-center text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                For Job Seekers 
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/jobseeker/login">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
      
                    Login
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/jobseeker/register">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
         
                    Register
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse md:order-2 md:hidden md:space-x-0">
          <button onClick={toggleDrawer} className="block p-2 focus:outline-none">
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "left-0" : "-left-full"
          } fixed top-0 h-full transition-all duration-300 w-[60%] ease-in-out md:hidden`}
        >
          <div className="p-4 bg-white h-full w-full relative">
            <button
              onClick={toggleDrawer}
              className="absolute top-4 right-4 p-2 focus:outline-none"
            >
              <svg
                className="h-6 w-6 text-[#243460]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ol className="flex flex-col space-y-4 pt-6">
              <li>
                <Link href="/jobseeker/login">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                    <User className="inline-block mr-1" color="#243460" />
                    Login
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/jobseeker/register">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                    <User className="inline-block mr-1" color="#243460" />
                    Register
                  </span>
                </Link>
              </li>
              {/* Add more links as necessary */}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavBar;
