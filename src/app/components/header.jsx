"use client";
import { useState } from "react";

import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container mx-auto fixed start-0 top-0 z-20 w-full mb-10 bg-[#FFFFFF] shadow-sm">
      <div className="mx-auto container flex max-w-screen-xl flex-wrap items-center justify-between py-4">
        <Link href="/">
          <span
            className="flex cursor-pointer items-center rtl:space-x-reverse"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <span className="self-center text-2xl font-bold  text-[#243460]">
           Job-Portal
            </span>
          </span>
        </Link>
        <div className="hidden md:flex space-x-6 rtl:space-x-reverse md:order-2">
          <Link href="/">
            <span className="cursor-pointer  text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
            Jobs
            </span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer  text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
           Companies
            </span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer  text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
            Login
            </span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer  text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
              Register
            </span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer  text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
            For employers
            </span>
          </Link>
         
         
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse md:order-2 md:hidden md:space-x-0">
          <button
            onClick={toggleDrawer}
            className="block p-2 focus:outline-none"
          >
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
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
              {/* <li>
                <Link href="/">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
                    Blogs
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/ask">
                  <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
                    Ask a question
                  </span>
                </Link>
              </li>
              <li>
              <Link href="/talk">
              <span className="cursor-pointer text-[#243460] hover:underline hover:underline-offset-8 hover:rounded-lg  dark:text-[#243460]">
              Talk to a Lawyer
              </span>
              </Link>
              </li> */}
          
             
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;