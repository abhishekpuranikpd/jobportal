"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, LucideGitGraph, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { title: "Dashboard", path: "/profile", icon: <Home size={20} /> },
    {
      title: "Jobs Data",
      path: "/profile/jobsdata",
      icon: <LucideGitGraph size={20} />,
    },
    {
      title: "Logout",
      path: "#", // Placeholder for logout
      icon: <LogOut size={20} />,
    },
  ];

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle Sidebar"
        className="lg:hidden block  p-4 text-white shadow-2xl bg-[#243460] fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 w-64 text-white bg-[#243460] z-50 min-h-screen shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="mt-4 md:ml-8">
          <Link href="/">
            <span className="flex cursor-pointer items-center rtl:space-x-reverse">
              <span className="self-center text-2xl font-bold text-white mb-4">
              Peperk.in
              </span>
            </span>
          </Link>
          {links.map(({ title, path, icon }) => (
            <Link
              key={title}
              href={path}
              onClick={title === "Logout" ? handleSignOut : () => setIsOpen(false)}
            >
              <span
                className={`flex items-center py-2 px-4 gap-2 rounded transition duration-300 ${
                  pathname === path
                    ? "font-bold bg-blue-500" // Highlight active link
                    : "text-white mb-2"
                } mb-2`}
              >
                {icon && <span className="mr-2">{icon}</span>}
                {title}
                {loading && title === "Logout" && (
                  <span className="ml-auto">Loading...</span> // Loading indicator
                )}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10" // Lower z-index than sidebar
          onClick={toggleSidebar} // Close sidebar on overlay click
        ></div>
      )}
    </>
  );
};

export default Sidebar;
