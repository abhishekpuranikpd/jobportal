"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Sidebar = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white shadow-2xl bg-[#243460] fixed top-0 left-0 z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white text-[#243460] min-h-screen z-10 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold hidden md:block">Hi {name}<br/><span className="text-sm text-gray-500">How are you?</span></h2>
        </div>
        {/* <nav className="mt-4">
          <Link href="/dashboard">
            <span className="block py-2 px-4 text-[#243460] hover:bg-gray-200 rounded transition duration-300">
              Dashboard
            </span>
          </Link>
          <Link href="/jobs">
            <span className="block py-2 px-4 text-[#243460] hover:bg-gray-200 rounded transition duration-300">
              Job Listings
            </span>
          </Link>
          <Link href="/users">
            <span className="block py-2 px-4 text-[#243460] hover:bg-gray-200 rounded transition duration-300">
              Users
            </span>
          </Link>
          <Link href="/reports">
            <span className="block py-2 px-4 text-[#243460] hover:bg-gray-200 rounded transition duration-300">
              Reports
            </span>
          </Link>
          <Link href="/settings">
            <span className="block py-2 px-4 text-[#243460] hover:bg-gray-200 rounded transition duration-300">
              Settings
            </span>
          </Link>
        </nav> */}
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
