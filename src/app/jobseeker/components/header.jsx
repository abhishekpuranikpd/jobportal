"use client";
import { signOut } from "next-auth/react"
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link";
  

const Header = ({ id, name, email }) => {
  
  return (
    <nav className="container mx-auto fixed start-0 top-0  w-full mb-10  shadow-sm">
    <header className=" bg-[#243460] text-white shadow p-4 flex justify-end">
      {/* User Icon with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center text-[12px] font-sans font-semibold text-[#243460] w-8 h-8 bg-white border text-center border-[#243460] rounded-full focus:outline-none">
       {name}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 mt-2 bg-white rounded-xl p-2">
{/*       
            <h2 className="text-lg font-semibold text-indigo-600 mb-1">User ID: {id}</h2> */}
            <h1 className="text-[14px] font-bold text-gray-900 mb-1">HI {name}</h1>
            <p className="text-gray-700 mb-2">{email}</p>
      
          <DropdownMenuItem asChild>
            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <span onClick={() => signOut()} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
    </nav>
  );
};

export default Header;
