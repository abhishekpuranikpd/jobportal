"use client";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const isEmployer = !!data?.name; // Check if data has employer-specific fields
  const isJobSeeker = !!data?.fullName; // Check if data has job seeker-specific fields

  return (
    <nav className="fixed container mx-auto px-4 md:px-16 top-0 z-20 w-full mb-10 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 ">
        <Link href="/">
          <span className="flex cursor-pointer items-center">
            <span className="self-center text-2xl font-bold text-[#243460]">
          
            Peperk.in
            </span> <span className="self-center text-sm font-bold text-[#243460]">
            (Beta)
            </span>
          </span>
        </Link>

        <div className="hidden md:flex space-x-6">
          {/* Show Jobs link only for job seekers or not logged in */}
          {(!isEmployer || !isJobSeeker) && (
            <Link href="/jobs">
              <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                Jobs
              </span>
            </Link>
          )}
             {(isEmployer) && (
            <Link href="/employer/profile">
              <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
               Dashboard
              </span>
            </Link>
          )}
             {(isJobSeeker) && (
            <Link href="/jobseeker/profile">
              <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
               Dashboard
              </span>
            </Link>
          )}

          {/* Employer Dropdown Menu */}
          {!isJobSeeker && !isEmployer && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="cursor-pointer flex items-center justify-center text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                  For Employers{" "}
                  <ChevronDown
                    className="h-5 w-4 mt-1 hover:underline hover:underline-offset-8"
                    color="#243460"
                  />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
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
          )}

          {/* User Profile or Login button */}
          <div className="flex items-center justify-center text-center gap-2">
            {isJobSeeker ? (
              <>
                <button className="flex items-center justify-center text-[12px] font-sans font-semibold text-[#243460] w-8 h-8 bg-white border text-center border-[#243460] rounded-full focus:outline-none">
                  {data.fullName[0]} {/* Display first letter of full name */}
                </button>
              
              </>
            ) : isEmployer ? (
              <>
                <button className="flex items-center justify-center text-[12px] font-sans font-semibold text-[#243460] w-8 h-8 bg-white border text-center border-[#243460] rounded-full focus:outline-none">
                  {data.name[0]} {/* Display first letter of company name */}
                </button>
             
              </>
            ) : (
              <Link href="/jobseeker/login">
                <button className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden">
          <button
            onClick={toggleDrawer}
            className="block p-2 focus:outline-none"
          >
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

        {/* Mobile Drawer */}
        <div
          className={`${
            isOpen ? "left-0" : "-left-full"
          } fixed top-0 h-full transition-all duration-300 w-[60%] ease-in-out md:hidden bg-white shadow-lg`}
        >
          <div className="p-4 h-full relative">
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
              {/* Mobile Navigation Links */}
              {(!isEmployer || !isJobSeeker) && (
                <li>
                  <Link href="/jobs">
                    <span className="block text-[#243460] hover:underline hover:underline-offset-8">Jobs</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/">
                  <span className="block text-[#243460] hover:underline hover:underline-offset-8">Companies</span>
                </Link>
              </li>
              {!isJobSeeker && (
                <li>
                  <Link href="/employer/login">
                    <span className="block text-[#243460] hover:underline hover:underline-offset-8">Employer Login</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/jobseeker/login">
                  <span className="block text-[#243460] hover:underline hover:underline-offset-8">Job Seeker Login</span>
                </Link>
              </li>
              {/* Mobile Dashboard Links */}
              {isJobSeeker && (
                <li>
                  <Link href="/jobseeker/dashboard">
                    <span className="block text-[#243460] hover:underline hover:underline-offset-8">Job Seeker Dashboard</span>
                  </Link>
                </li>
              )}
              {isEmployer && (
                <li>
                  <Link href="/employer/dashboard">
                    <span className="block text-[#243460] hover:underline hover:underline-offset-8">Employer Dashboard</span>
                  </Link>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
