"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  LucideGitGraph,
  LogOut,
  PlusCircle,
  Building,
  UserCheck2,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  // Define all sidebar links
  const allLinks = [
    {
      title: "Dashboard",
      path: "/profile",
      icon: <Home size={20} />,
      permissions: [Permission.VIEW_ANALYTICS],
    },
    {
      title: "Jobs Overview",
      path: "/profile/jobsdata",
      icon: <LucideGitGraph size={20} />,
      permissions: [Permission.VIEW_JOB, Permission.MANAGE_JOB],
    },
    {
      title: "Jobs",
      path: "/profile/jobs",
      icon: <LucideGitGraph size={20} />,
      permissions: [Permission.MANAGE_JOB],
    },
    {
      title: "Admins",
      path: "/adminregister",
      icon: <PlusCircle size={20} />,
      roles: ["SUPERADMIN"],
    },
    {
      title: "Employers Overview",
      path: "/profile/employerslist",
      icon: <Building size={20} />,
      permissions: [Permission.VIEW_EMPLOYER, Permission.MANAGE_EMPLOYER],
    },
    {
      title: "Employers Portal",
      path: "/profile/employerstatusportal",
      icon: <Building size={20} />,
      permissions: [Permission.MANAGE_EMPLOYER, Permission.VIEW_JOB],
    },
    {
      title: "Job Seekers",
      path: "/profile/job-seekers",
      icon: <UserCheck2 size={20} />,
      permissions: [Permission.MANAGE_JOBSEEKER, Permission.VIEW_JOBSEEKER],
    },
    {
      title: "Logout",
      path: "#", // Placeholder for logout
      icon: <LogOut size={20} />,
    },
  ];

  // Filter links based on user role and permissions
  const filteredLinks =
    data.role === "SUPERADMIN"
      ? allLinks // Allow all links for SuperAdmin
      : allLinks.filter((link) => {
          if (link.permissions) {
            return link.permissions.some((perm) =>
              data.permissions.includes(perm)
            );
          }
          if (link.roles) {
            return link.roles.includes(data.role);
          }
          return true;
        });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle Sidebar"
        className="lg:hidden block p-4 text-white shadow-2xl bg-[#243460] fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 w-64 text-white bg-[#243460] z-50 h-full shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="mt-4 ml-4 md:ml-8">
          <Link href="/">
            <span className="flex cursor-pointer items-center rtl:space-x-reverse">
              <span className="self-center text-2xl font-bold text-white mb-4">
                Peperk.in
              </span>
            </span>
          </Link>
          {filteredLinks.map(({ title, path, icon }) => (
            <Link
              key={title}
              href={path}
              onClick={
                title === "Logout" ? handleSignOut : () => setIsOpen(false)
              }
            >
              <span
                className={`flex items-center py-2 px-4 gap-2 rounded transition duration-300 ${
                  pathname === path
                    ? "font-bold bg-blue-500"
                    : "text-white mb-2"
                } mb-2`}
              >
                {icon && <span className="mr-2">{icon}</span>}
                {title}
                {loading && title === "Logout" && (
                  <span className="ml-auto">Loading...</span>
                )}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

const Permission = {
  MANAGE_EMPLOYER: "MANAGE_EMPLOYER",
  MANAGE_JOB: "MANAGE_JOB",
  MANAGE_JOBSEEKER: "MANAGE_JOBSEEKER",
  MANAGE_ADMIN: "MANAGE_ADMIN",
  VIEW_EMPLOYER: "VIEW_EMPLOYER",
  VIEW_JOB: "VIEW_JOB",
  VIEW_JOBSEEKER: "VIEW_JOBSEEKER",
  VIEW_ANALYTICS: "VIEW_ANALYTICS",
};
