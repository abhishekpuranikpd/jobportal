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
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
  

const Header = ({ id, name, email }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <nav className="container mx-auto fixed start-0 top-0  w-full mb-10  shadow-sm">
    <header className=" bg-white text-[#243460] shadow-md p-4 flex justify-end">
      {/* User Icon with Dropdown */}
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center text-[12px] font-sans font-semibold text-[#243460] w-8 h-8 bg-white border text-center border-[#243460] rounded-full focus:outline-none">
              {name[0]}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 mt-2 bg-white rounded-xl p-2"
          >
            <h1 className="text-[14px] font-bold text-gray-900 mb-1">
              HI {name}
            </h1>
            <p className="text-gray-700 mb-2">{email}</p>
            <hr className="h-2"/>

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="mr-2 text-blue-500" /> {/* Colored icon */}
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="mr-2 text-blue-500" /> {/* Colored icon */}
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <div className="flex justify-end items-center">
                <Button
                  className={`bg-red-500 hover:bg-red-600 rounded-full mt-4 text-white px-4 py-2 flex items-center ${
                    loading ? "bg-blue-300" : ""
                  }`}
                  onClick={()=>signOut()}
                  disabled={loading}
                >
                  <LogOut className="mr-2" /> {/* Colored icon */}
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </header>
    </nav>
  );
};

export default Header;