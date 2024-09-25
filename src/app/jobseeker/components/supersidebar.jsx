"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-[#243460] fixed top-0 left-0 z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-[#243460] text-white min-h-screen z-10 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold hidden md:block">Super Admin Panel</h2>
        </div>
        <nav className="mt-8">
          <Link href="/dashboard">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
              Dashboard
            </span>
          </Link>
          <Link href="/jobs">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
              Job Listings
            </span>
          </Link>
          <Link href="/users">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
              Users
            </span>
          </Link>
          <Link href="/reports">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
              Reports
            </span>
          </Link>
          <Link href="/settings">
            <span className="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded">
              Settings
            </span>
          </Link>
        </nav>
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
