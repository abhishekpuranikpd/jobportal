"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importing usePathname
import { Menu, X, Home, Briefcase, FileText, Plus, File } from "lucide-react"; // Importing icons
import { Pencil2Icon } from "@radix-ui/react-icons";

const Sidebar = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ishover, setIsHover] = useState(false);

  const pathname = usePathname(); // Use usePathname hook to get the current route

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Define the links with title, path, and icon
  const links = [
    { title: "Dashboard", path: "/employer/profile", icon: <Home size={20} /> },
    { title: "Post New Job", path: "/employer/profile/jobs/newjob", icon: <Plus size={20} /> },
    { title: "Job Listings", path: "/employer/profile/jobs", icon: <Briefcase size={20} /> },
    { title: "Draft Jobs", path: "/employer/profile/draftjobs", icon: <FileText size={20} /> },
    { title: "Applications", path: "/employer/profile/applications", icon: <File size={20} /> },
    { title: "Edit Profile", path: "/employer/profile/edit", icon: <Pencil2Icon size={20} /> },



  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-4 text-white shadow-2xl bg-[#243460] fixed top-0 left-0 z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 text-white bg-[#243460] min-h-screen  shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="mt-4  md:ml-8">
        <Link href="/">
          <span
            className="flex cursor-pointer items-center rtl:space-x-reverse"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <span className="self-center text-2xl font-bold  text-white mb-4">
            Peperk.in
            </span>
          </span>
        </Link>
          {links.map(({ title, path, icon }) => (
            <Link key={path} href={path} onClick={() => setIsOpen(false)}>
              <span
                className={`flex items-center py-2 px-4 gap-2  rounded transition duration-300 ${
                  pathname === path
                    ? " font-bold" // Active style for current route
                    : "text-white mb-2"
                } mb-2`} // Add margin-bottom to create a gap
              >
                <span className="mr-2">{icon}</span> {/* Display icon */}
                {title}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20" // Adjust z-index to be lower than sidebar
          onClick={toggleSidebar} // Close sidebar on overlay click
        ></div>
      )}
    </>
  );
};

export default Sidebar;
